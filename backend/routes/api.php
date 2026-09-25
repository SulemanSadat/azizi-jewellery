<?php
use App\Http\Controllers\Api\V1\AppointmentController;
use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ContentController;
use App\Http\Controllers\Api\V1\ProfileController;

Route::prefix('v1')->group(function () {

    Route::get('/content/{page}', [
        ContentController::class,
        'page',
    ]);

    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'AZIZI API is running.',
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */



    Route::post('/auth/register', [
        AuthController::class,
        'register',
    ]);

    Route::post('/auth/login', [
        AuthController::class,
        'login',
    ]);

    Route::middleware('auth:sanctum')->group(function () {

    

        Route::get('/auth/me', [
            AuthController::class,
            'me',
        ]);

        Route::post('/auth/logout', [
            AuthController::class,
            'logout',
        ]);
        
                Route::get('/appointments', [
                AppointmentController::class,
                'index',
            ]);

            Route::post('/appointments', [
                AppointmentController::class,
                'store',
            ]);

        Route::put('/profile', [
        ProfileController::class,
        'update',
    ]);

    Route::put('/profile/password', [
        ProfileController::class,
        'password',
    ]);

        
    });

});