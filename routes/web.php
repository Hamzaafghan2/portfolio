<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Portfolio Homepage
Route::get('/', function () {
    return Inertia::render('Portfolio');
});

// Dashboard (after login)
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Admin Dashboard
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth'])->name('admin.dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Language switch - MUST be before fallback
Route::get('/language/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'fa', 'ps'])) {
        session(['locale' => $locale]);
        app()->setLocale($locale);
    }

    return redirect()->back();
})->name('language.switch');
///--------fallback-------------
Route::fallback(function () {
    return Inertia::render('NotFound');
});


require __DIR__.'/auth.php';



// All News Page
Route::get('/news', function () {
    return Inertia::render('AllNews');
});

// Single News Page
Route::get('/news/{slug}', function () {
    return Inertia::render('NewsDetail');
});

Route::get('/projects/{id}', function () {
    return Inertia::render('ProjectDetail');
});

Route::get('/projects', function () {
    return Inertia::render('AllProjects');
});

Route::get('/sitemap.xml', function () {
    return response()->view('sitemap')->header('Content-Type', 'text/xml');
});

// Route::get('/language/{locale}', function ($locale) {
//     if (in_array($locale, ['en', 'fa', 'ps'])) {
//         return redirect('/')->withCookie(cookie('locale', $locale, 60 * 24 * 30));
//     }
//     return redirect('/');
// })->name('language.switch');

