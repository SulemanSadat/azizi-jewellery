<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $subscriber = Subscriber::firstOrCreate([
            'email' => strtolower(trim($validated['email'])),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing.',
            'data' => $subscriber,
        ], 201);
    }
}