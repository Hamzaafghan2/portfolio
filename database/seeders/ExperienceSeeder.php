<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'title' => 'Full Stack Developer',
                'company' => 'Freelance',
                'duration' => '2023 - Present',
                'description' => 'Building web applications for clients worldwide using Laravel, React, and modern technologies.',
                'order' => 1,
            ],
            [
                'title' => 'Backend Developer',
                'company' => 'Tech Company',
                'duration' => '2022 - 2023',
                'description' => 'Developed REST APIs, database architectures, and server-side applications.',
                'order' => 2,
            ],
            [
                'title' => 'Junior Developer',
                'company' => 'Startup',
                'duration' => '2021 - 2022',
                'description' => 'Started professional journey in web development, learned Laravel and JavaScript.',
                'order' => 3,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }
    }
}