<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::create([
            'title' => 'New Laravel Project Launched',
            'slug' => 'new-laravel-project-launched',
            'content' => 'Excited to announce the launch of a new school management system built with Laravel and React. This project includes student management, attendance tracking, and more.',
            'excerpt' => 'New school management system built with Laravel and React.',
            'category' => 'Project',
            'published' => true,
            'published_at' => now(),
        ]);

        News::create([
            'title' => 'Learning React with Inertia',
            'slug' => 'learning-react-with-inertia',
            'content' => 'Started learning React with Inertia.js for building modern single-page applications with Laravel backend.',
            'excerpt' => 'Learning React with Inertia.js for modern SPAs.',
            'category' => 'Learning',
            'published' => true,
            'published_at' => now(),
        ]);

        News::create([
            'title' => 'Available for Freelance Work',
            'slug' => 'available-for-freelance-work',
            'content' => 'I am currently available for freelance web development projects. Specializing in Laravel, React, and full-stack development.',
            'excerpt' => 'Available for freelance web development projects.',
            'category' => 'Announcement',
            'published' => true,
            'published_at' => now(),
        ]);
    }
}