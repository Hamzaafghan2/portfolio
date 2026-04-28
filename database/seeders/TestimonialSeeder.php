<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            ['name' => 'Ahmad R.', 'role' => 'CEO, TechStartup', 'text' => 'Outstanding work! Delivered our project on time with exceptional quality.', 'rating' => 5, 'order' => 1],
            ['name' => 'Sarah K.', 'role' => 'Founder, EcomMarket', 'text' => 'Professional, responsive, and skilled developer.', 'rating' => 5, 'order' => 2],
            ['name' => 'Mohammed A.', 'role' => 'Director, EduTech', 'text' => 'The school management system exceeded our expectations.', 'rating' => 5, 'order' => 3],
            ['name' => 'Fatima H.', 'role' => 'Project Manager', 'text' => 'Great experience working together. Clean code, modern design.', 'rating' => 5, 'order' => 4],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}