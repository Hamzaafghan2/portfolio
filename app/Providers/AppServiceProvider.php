<?php


namespace App\Providers;

use App\Models\About;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Safe check before querying table
        if (Schema::hasTable('about')) {
            $setting = About::first();

            View::share('favicon', $setting?->favicon);
            View::share('aboutData', $setting);
        } else {
            View::share('favicon', null);
        }
    }
}

// namespace App\Providers;

// use App\Models\About;
// use Illuminate\Support\Facades\Vite;
// use Illuminate\Support\ServiceProvider;
// use Illuminate\Support\Facades\View;

// class AppServiceProvider extends ServiceProvider
// {
//     public function register(): void
//     {
//         //
//     }

//     public function boot(): void
//     {
//         Vite::prefetch(concurrency: 3);

//         // 👇 GLOBAL FAVICON SHARE
//         $setting = About::first(); // or your settings table
//         View::share('favicon', $setting?->favicon);
//     }
// }