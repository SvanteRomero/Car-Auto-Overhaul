<?php

namespace App\Console\Commands;

use App\Models\CartItem;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ReleaseExpiredInventory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inventory:release';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Release inventory from expired cart reservations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Define your reservation expiry time (e.g., 15 minutes)
        $expiryTime = Carbon::now()->subMinutes(15);

        // Find all cart items that have expired
        $expiredItems = CartItem::where('reserved_at', '<=', $expiryTime)->get();

        if ($expiredItems->isEmpty()) {
            $this->info('No expired inventory to release.');
            return;
        }

        $this->info("Found {$expiredItems->count()} expired items to release.");

        foreach ($expiredItems as $item) {
            DB::transaction(function () use ($item) {
                // Increment the product stock back to its original level
                $item->product->increment('stock', $item->quantity);

                // Delete the expired cart item
                $item->delete();
            });
        }

        $this->info('Successfully released expired inventory.');
    }
}