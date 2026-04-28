<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('order')->get();
        return response()->json($skills);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'percentage' => 'nullable|integer|min:0|max:100',
            'order' => 'nullable|integer',
        ]);

        $skill = Skill::create($request->all());
        return response()->json($skill, 201);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        
        $skill->update($request->all());
        
        return response()->json(['message' => 'Skill updated!', 'data' => $skill]);
    }

    public function destroy($id)
    {
        Skill::destroy($id);
        return response()->json(['message' => 'Skill deleted!']);
    }
}