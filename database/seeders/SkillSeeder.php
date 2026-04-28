<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'Laravel', 'icon' => '⚡', 'percentage' => 95, 'order' => 1],
            ['name' => 'React', 'icon' => '⚛️', 'percentage' => 90, 'order' => 2],
            ['name' => 'PHP', 'icon' => '🐘', 'percentage' => 95, 'order' => 3],
            ['name' => 'JavaScript', 'icon' => '📜', 'percentage' => 90, 'order' => 4],
            ['name' => 'MySQL', 'icon' => '🗄️', 'percentage' => 85, 'order' => 5],
            ['name' => 'Tailwind CSS', 'icon' => '🎨', 'percentage' => 95, 'order' => 6],
            ['name' => 'Git', 'icon' => '🔀', 'percentage' => 90, 'order' => 7],
            ['name' => 'REST APIs', 'icon' => '🔗', 'percentage' => 92, 'order' => 8],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}