<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('order')->get();
        return response()->json($experiences);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'company' => 'required|string',
            'duration' => 'required|string',
            'description' => 'required|string',
        ]);

        $experience = Experience::create($request->all());
        return response()->json($experience, 201);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->all());
        return response()->json($experience);
    }

    public function destroy($id)
    {
        Experience::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}