<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function signup(SignupRequest $request) 
    {
        $data = $request->validated(); 

        // @var \App\Models\User $user
        $user = User::create([
            'name' => $data['name'], 
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->accessToken;

        return response([
            'user' => $user, 
            'token' => $token
        ]);
    }


    public function login(LoginRequest $request) 
    {
        $credentials = $request->validated();

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'Incorrect credentials'
            ], 422); 
        }
        $user = Auth::user(); 
        $token = $user->createToken('main')->accessToken;

        return response([
            'user' => $user, 
            'token' => $token
        ]);
    }

    public function logout(Request $request) 
    {
        // @var User $user 
        //check if user is authenticated
        if(Auth::check()) {
            $user = Auth::user();
            // revoke the token that was used to authenticate the current request...
            $user->currentAccessToken()->delete();
    
            Auth::logout();
    
            return response([
                'success' => true
            ]);
        }
       
    }
}
