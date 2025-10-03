<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion'=> Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
});

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

/* ------------------------------ Authenticated User Routes ------------------------------ */
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',[ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile',[ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* ------------------------------ Admin Routes ------------------------------
 * Protect with auth + (optional) your admin middleware/gate.
 * Example middleware: ['auth', 'verified', 'can:access-admin'] or 'role:admin'
 * Replace 'can:access-admin' with whatever you use.
 */
Route::middleware(['auth', 'verified']) // add 'can:access-admin' if you have a policy/gate
    ->prefix('admin')->name('admin.')->group(function () {

    // Admin Home (Dashboard)
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard'); // create this page or switch to an existing controller
    })->name('index');

    /* -------- Customers -------- */
    Route::prefix('customers')->name('customers.')->group(function () {
        Route::get('/',            [CustomerController::class, 'index'])->name('index');
        Route::get('/create',      [CustomerController::class, 'create'])->name('create');
        Route::post('/',           [CustomerController::class, 'store'])->name('store');
        Route::get('/{id}/edit',   [CustomerController::class, 'edit'])->name('edit');
        Route::put('/{id}',        [CustomerController::class, 'update'])->name('update');
        // Optional destroy:
        // Route::delete('/{id}',  [CustomerController::class, 'destroy'])->name('destroy');
    });

    /* -------- Accounts -------- */
    // CSV export BEFORE resource to avoid colliding with {account}
    Route::get('accounts/export', [AccountController::class, 'export'])->name('accounts.export');

    // Resourceful routes: /admin/accounts, /admin/accounts/create, /admin/accounts/{id}/edit, etc.
    Route::resource('accounts', AccountController::class)->names('accounts');
});

require __DIR__.'/auth.php';
