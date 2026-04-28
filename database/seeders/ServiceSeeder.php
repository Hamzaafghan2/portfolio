<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['icon' => '🌐', 'title' => 'Web Development', 'description' => 'Custom websites & web applications with React, Laravel & modern tech stack.', 'order' => 1],
            ['icon' => '📱', 'title' => 'Responsive Design', 'description' => 'Mobile-first, fully responsive designs that work perfectly on all devices.', 'order' => 2],
            ['icon' => '⚡', 'title' => 'API Development', 'description' => 'RESTful APIs, third-party integrations & backend systems with Laravel.', 'order' => 3],
            ['icon' => '🗄️', 'title' => 'Database Design', 'description' => 'Optimized database architecture, MySQL, PostgreSQL & query optimization.', 'order' => 4],
            ['icon' => '🔧', 'title' => 'Maintenance', 'description' => 'Ongoing support, bug fixes & feature updates for existing projects.', 'order' => 5],
            ['icon' => '🚀', 'title' => 'Performance', 'description' => 'Speed optimization, SEO best practices & web performance tuning.', 'order' => 6],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}