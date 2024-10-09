<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        // Create the user in the database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        // Generate a token if using API authentication (like Sanctum or Passport)
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return a successful response with user data and token
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $token,
        ], 201); // HTTP status code 201: Created
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
//        $remember = $credentials['remember'] ?? false;
//        unset($credentials['remember']);

        if (!Auth::attempt($credentials)) {
            return response([
                'error' => 'Invalid Email or Password'
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // For API-based authentication (e.g., Sanctum or Passport):
        if ($request->user()) {
            // Revoke the user's current token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'User logged out successfully'
            ]); // HTTP status code 200: OK
        }

        // For session-based authentication:
//        Auth::logout();
//
//        return response()->json([
//            'message' => 'User logged out successfully!',
//        ], 200); // HTTP status code 200: OK
    }

    public function me(Request $request) 
    {
        return $request->user();
    }
}
