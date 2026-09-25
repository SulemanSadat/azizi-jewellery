<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SubscriberController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/content', [ContentController::class, 'index'])
            ->name('content.index');

        Route::get('/content/{content}/edit', [ContentController::class, 'edit'])
            ->name('content.edit');

        Route::put('/content/{content}', [ContentController::class, 'update'])
            ->name('content.update');

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('appointments', AppointmentController::class)
            ->except(['create', 'store']);

        Route::patch('/appointments/{appointment}/confirm', [
            AppointmentController::class,
            'confirm',
        ])->name('appointments.confirm');

        Route::patch('/appointments/{appointment}/cancel', [
            AppointmentController::class,
            'cancel',
        ])->name('appointments.cancel');

        Route::patch('/appointments/{appointment}/complete', [
            AppointmentController::class,
            'complete',
        ])->name('appointments.complete');

        Route::get('/subscribers', [
            SubscriberController::class,
            'index',
        ])->name('subscribers.index');

        Route::get('/customers', [
            CustomerController::class,
            'index',
        ])->name('customers.index');

        Route::get('/contacts', [
            ContactController::class,
            'index',
        ])->name('contacts.index');

        Route::get('/settings', [
            SettingsController::class,
            'index',
        ])->name('settings.index');
    });


require __DIR__.'/auth.php';
