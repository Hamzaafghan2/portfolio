<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ALL ROUTES PUBLIC - NO AUTH
Route::get('/about', [AboutController::class, 'index']);
Route::post('/about', [AboutController::class, 'update']);

Route::get('/skills', [SkillController::class, 'index']);
Route::post('/skills', [SkillController::class, 'store']);
Route::put('/skills/{id}', [SkillController::class, 'update']);
Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
// //============Projects ---------

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/featured', [ProjectController::class, 'featured']);
Route::get('/projects/all', [ProjectController::class, 'all']);        // ← BEFORE {id}
Route::get('/projects/{id}', [ProjectController::class, 'show']);       // ← AFTER /all
Route::post('/projects', [ProjectController::class, 'store']);
Route::post('/projects/{id}', [ProjectController::class, 'update']);
Route::put('/projects/{id}', [ProjectController::class, 'update']);
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

// Route::get('/projects', [ProjectController::class, 'index']);
// Route::get('/projects/featured', [ProjectController::class, 'featured']);
// Route::post('/projects', [ProjectController::class, 'store']);
// Route::post('/projects/{id}', [ProjectController::class, 'update']);
// Route::put('/projects/{id}', [ProjectController::class, 'update']);Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);


Route::get('/experiences', [ExperienceController::class, 'index']);
Route::post('/experiences', [ExperienceController::class, 'store']);
Route::put('/experiences/{id}', [ExperienceController::class, 'update']);
Route::delete('/experiences/{id}', [ExperienceController::class, 'destroy']);

Route::get('/contact', [ContactController::class, 'index']);
Route::put('/contact', [ContactController::class, 'update']);

Route::post('/messages', [MessageController::class, 'store']);
Route::get('/messages', [MessageController::class, 'index']);
Route::put('/messages/{id}/read', [MessageController::class, 'markRead']);
Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
Route::post('/messages/{id}/reply', [MessageController::class, 'reply']);



//============ News  Public----------

Route::get('/news', [NewsController::class, 'index']);              // 3 latest for homepage
Route::get('/news/all', [NewsController::class, 'allPublished']);   // all published
Route::get('/news/{slug}', [NewsController::class, 'show']);        // single news
Route::get('/admin/news', [NewsController::class, 'all']);          // admin all
Route::post('/news', [NewsController::class, 'store']);
Route::post('/news/{id}', [NewsController::class, 'update']);       // for FormData
Route::put('/news/{id}', [NewsController::class, 'update']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);




// Services
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

// Testimonials
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::post('/testimonials', [TestimonialController::class, 'store']);
Route::post('/testimonials/{id}', [TestimonialController::class, 'update']);  // ← ADD THIS
Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);


Route::get('/hero', [HomeController::class, 'index']);



// Admin
// Route::get('/admin/dashboard', function () {
//     return Inertia::render('Admin/Dashboard');
// })->middleware(['auth'])->name('admin.dashboard');