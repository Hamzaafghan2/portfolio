<?php

namespace App\Providers;

use App\Models\About;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // 👇 GLOBAL FAVICON SHARE
        $setting = About::first(); // or your settings table
        View::share('favicon', $setting?->favicon);
    }
}