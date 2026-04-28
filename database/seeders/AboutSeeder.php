<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        About::create([
            'title' => 'Passionate Developer from Afghanistan',
            'description' => "I'm a Full Stack Developer with expertise in Laravel, React, and modern web technologies. I love creating elegant solutions to complex problems and building applications that make a difference.",
            'image' => null,
            'years_experience' => 2,
            'projects_done' => 30,
            'happy_clients' => 20,
            'technologies_count' => 10,
        ]);
    }
}