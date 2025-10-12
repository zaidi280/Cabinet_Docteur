<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeneficeController;
use App\Http\Controllers\DepenseController;
use App\Http\Controllers\MaladieController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\RendezVousController;
use App\Http\Controllers\RevenuController;
use Illuminate\Support\Facades\Route;

// Unauthenticated Routes
Route::group(['middleware' => 'api', 'prefix' => 'users'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refreshToken', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

// Email Verification (optional route outside middleware)
Route::get('users/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');

// Protected Routes (JWT Middleware)


Route::get('/patients/show/{id?}', [PatientController::class, 'show']);
Route::get('/patients/filtered', [PatientController::class, 'getFilteredPatients']);
Route::resource('patients', PatientController::class);
Route::resource('rendezVous', RendezVousController::class);
Route::patch('rendezVous/{id}/markAsDone', [RendezVousController::class, 'markAsDone']);
Route::resource('maladies', MaladieController::class);

Route::get('/depenses/show/{id?}', [DepenseController::class, 'show']);
Route::resource('depenses', DepenseController::class);
Route::get('/revenues/show/{id?}', [RevenuController::class, 'show']);
Route::resource('revenues', RevenuController::class);
Route::get('/dashboard-stats', [RevenuController::class, 'getDashboardStats']);
Route::get('/monthly-data', [RevenuController::class, 'getMonthlyData']);
Route::get('/benefice/latest', [BeneficeController::class, 'getLatestBenefice']);
Route::get('/benefice/monthly', [BeneficeController::class, 'getMonthlyBenefice']);
Route::get('/benefice/total', [BeneficeController::class, 'getTotalBenefice']);


Route::post('/patients/import', [PatientController::class, 'import']);
