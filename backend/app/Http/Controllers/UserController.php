<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display the authenticated user's profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        return response()->json(Auth::user());
    }

    /**
     * Update the authenticated user's profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|array',
            'address.street' => 'nullable|string',
            'address.city' => 'nullable|string',
            'address.region' => 'nullable|string',
            'address.postalCode' => 'nullable|string',
            'address.country' => 'nullable|string',
        ]);

        $user->update($request->all());

        return response()->json($user);
    }
    
    /**
     * Admin view to get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminIndex()
    {
        $users = User::all();
        return response()->json($users);
    }
    
    /**
     * Admin view to update a user's details.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminUpdate(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate([
            'role' => ['required', Rule::in(['customer', 'admin'])],
        ]);
        $user->update($request->all());
        return response()->json($user);
    }
}