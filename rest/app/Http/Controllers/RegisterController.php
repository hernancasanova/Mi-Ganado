<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {   
        /*$validator = validator()->make($request->all(), [
            'username' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
        ]);
        if ($validator->fails()) {
            dd($request);
            //Respuesta de error de la api
        }*/
        $user=User::create([
            'name' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        return response()->json([
            'status_code' =>200,
        ],200);
    }

}
