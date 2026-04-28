<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'School Management System',
                'description' => 'Complete school management platform with student, teacher, attendance, exam, and fee management modules.',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
                'url' => '#',
                'github_url' => '#',
                'featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'E-Commerce API',
                'description' => 'RESTful API for e-commerce platform with product management, cart, orders, and payment integration.',
                'technologies' => ['Laravel', 'MySQL', 'REST API'],
                'url' => '#',
                'github_url' => '#',
                'featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'Personal portfolio website built with Laravel, React, and Tailwind CSS with admin panel.',
                'technologies' => ['Laravel', 'React', 'Tailwind CSS'],
                'url' => '#',
                'github_url' => '#',
                'featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}