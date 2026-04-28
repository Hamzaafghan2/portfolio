<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;

class HomeController extends Controller
{
     public function index()
    {
        $about = About::first(); // IMPORTANT

        return response()->json([
            'name' => 'Mujeeburahman Hamza', // optional static OR add column later
            'title' => $about->title,
            'description' => $about->description,

            'image' => $about->image,

            'projects_completed' => $about->projects_done,
            'clients' => $about->happy_clients,
            'experience_years' => $about->years_experience,
            'technologies' => $about->technologies_count,

            'status' => 'Available for Freelance',
        ]);
    }
}
