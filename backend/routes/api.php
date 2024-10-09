<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);    

    Route::get('/dashboard', [DashboardController::class, 'index']);

    // This single line of route will do the following routes
    Route::resource('survey', SurveyController::class);
    // GET       /survey           -> index
    // GET       /survey/create    -> create
    // POST      /survey           -> store
    // GET       /survey/{id}      -> show
    // GET       /survey/{id}/edit -> edit
    // PUT/PATCH /survey/{id}      -> update
    // DELETE    /survey/{id}      -> destroy

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Route::get('/survey/get-by-slug/{slug}', [SurveyController::class, 'getBySlug']);

Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);

Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);



