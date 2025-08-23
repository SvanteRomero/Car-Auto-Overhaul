<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserEvent;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Log a user event for analytics.
     */
    public function logEvent(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_type' => 'required|string|max:255',
            'metadata' => 'nullable|array',
            'session_id' => 'nullable|string|max:255',
        ]);

        $event = UserEvent::create([
            'user_id' => $request->user()?->id,
            'event_type' => $validated['event_type'],
            'metadata' => $validated['metadata'] ?? [],
            'session_id' => $validated['session_id'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'message' => 'Event logged successfully',
            'event_id' => $event->id
        ], 201);
    }

    /**
     * Get analytics dashboard data (Admin only).
     */
    public function getDashboardData(Request $request): JsonResponse
    {
        try {
            // Check if user is admin
            if (!$request->user() || !$request->user()->isAdmin()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $dateRange = $request->get('date_range', 30); // Default to last 30 days
            $startDate = now()->subDays($dateRange);

            // Get event counts by type
            $eventCounts = UserEvent::where('created_at', '>=', $startDate)
                ->select('event_type', DB::raw('count(*) as count'))
                ->groupBy('event_type')
                ->get();

            // Get daily event counts
            $dailyEvents = UserEvent::where('created_at', '>=', $startDate)
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy('date')
                ->get();

            // Get top products by views
            $topProductViews = UserEvent::where('event_type', 'product_view')
                ->where('created_at', '>=', $startDate)
                ->select(DB::raw('JSON_EXTRACT(metadata, "$.product_id") as product_id'), DB::raw('count(*) as views'))
                ->groupBy(DB::raw('JSON_EXTRACT(metadata, "$.product_id")'))
                ->orderBy('views', 'desc')
                ->limit(10)
                ->get();

            // Get user engagement metrics
            $totalUsers = UserEvent::where('created_at', '>=', $startDate)
                ->distinct('user_id')
                ->count('user_id');

            $totalSessions = UserEvent::where('created_at', '>=', $startDate)
                ->distinct('session_id')
                ->count('session_id');

            return response()->json([
                'event_counts' => $eventCounts,
                'daily_events' => $dailyEvents,
                'top_product_views' => $topProductViews,
                'total_users' => $totalUsers,
                'total_sessions' => $totalSessions,
                'date_range' => $dateRange
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching analytics data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user behavior patterns (Admin only).
     */
    public function getUserBehaviorPatterns(Request $request): JsonResponse
    {
        try {
            // Check if user is admin
            if (!$request->user() || !$request->user()->isAdmin()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $dateRange = $request->get('date_range', 30);
            $startDate = now()->subDays($dateRange);

            // Get conversion funnel data
            $pageViews = UserEvent::ofType('page_view')
                ->where('created_at', '>=', $startDate)
                ->count();

            $productViews = UserEvent::ofType('product_view')
                ->where('created_at', '>=', $startDate)
                ->count();

            $addToCarts = UserEvent::ofType('add_to_cart')
                ->where('created_at', '>=', $startDate)
                ->count();

            $checkoutStarts = UserEvent::ofType('checkout_start')
                ->where('created_at', '>=', $startDate)
                ->count();

            $orderCompletions = UserEvent::ofType('order_complete')
                ->where('created_at', '>=', $startDate)
                ->count();

            // Get most popular pages
            $popularPages = UserEvent::ofType('page_view')
                ->where('created_at', '>=', $startDate)
                ->select(DB::raw('JSON_EXTRACT(metadata, "$.page") as page'), DB::raw('count(*) as views'))
                ->groupBy(DB::raw('JSON_EXTRACT(metadata, "$.page")'))
                ->orderBy('views', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'conversion_funnel' => [
                    'page_views' => $pageViews,
                    'product_views' => $productViews,
                    'add_to_carts' => $addToCarts,
                    'checkout_starts' => $checkoutStarts,
                    'order_completions' => $orderCompletions,
                ],
                'popular_pages' => $popularPages,
                'conversion_rates' => [
                    'product_view_rate' => $pageViews > 0 ? round(($productViews / $pageViews) * 100, 2) : 0,
                    'add_to_cart_rate' => $productViews > 0 ? round(($addToCarts / $productViews) * 100, 2) : 0,
                    'checkout_rate' => $addToCarts > 0 ? round(($checkoutStarts / $addToCarts) * 100, 2) : 0,
                    'completion_rate' => $checkoutStarts > 0 ? round(($orderCompletions / $checkoutStarts) * 100, 2) : 0,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching behavior patterns',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
