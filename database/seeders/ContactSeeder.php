<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::create([
            'email' => 'mujeeb@example.com',
            'phone' => '+93 700 000 000',
            'location' => 'Kabul, Afghanistan',
            'github_url' => '#',
            'linkedin_url' => '#',
            'twitter_url' => '#',
        ]);
    }
}