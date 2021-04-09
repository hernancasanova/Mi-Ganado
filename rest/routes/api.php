<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users','UserController');

Route::resource('vacunos','VacunoController');//->middleware('auth:api');

Route::post('register','RegisterController@register');

Route::post('login', function (Request $request) {
    //if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
	if (auth()->attempt($request->only('email', 'password'))) {
        // Authentication passed...
        $user = auth()->user();//obtiene los datos del user autenticado
        $user->api_token = Str::random(60);
        $user->save();
    	return response([
            'api_token'=>$user->api_token,
            'user'=>$user->email,
            //'password'=>$user->password,
            'user_id'=>$user->id,
            'status_code' => 200,
        ], 200);
    }
    else{
    	return response([
            'status_code' => 401,

        ], 200);
    }
});

Route::middleware('auth:api')->post('logout', function (Request $request) {
    if (auth()->user()) {
        $user = auth()->user();
        $user->api_token = null; // se limpia el api token
        $user->save();
        return response([
            'status_code' => 200,
        ], 200);
    }else{
        return response([
                'status_code' => 401,
            ], 200);
    }
});