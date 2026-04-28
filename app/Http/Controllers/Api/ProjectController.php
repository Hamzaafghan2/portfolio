<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    // Public: get all projects (ordered by 'order')
    public function index()
    {
        $projects = Project::orderBy('order')->get();

        // Convert image paths to full URLs
        $projects->transform(function ($project) {
            if ($project->image) {
                $project->image = Storage::url($project->image);
            }
            return $project;
        });

        return response()->json($projects);
    }

    // Public: get only featured projects
    public function featured()
    {
        $projects = Project::where('featured', true)
            ->orderBy('order')
            ->get();

        $projects->transform(function ($project) {
            if ($project->image) {
                $project->image = Storage::url($project->image);
            }
            return $project;
        });

        return response()->json($projects);
    }

 public function store(Request $request)
{
    // Convert empty strings to null
    $request->merge([
        'url' => $request->input('url') ?: null,
        'github_url' => $request->input('github_url') ?: null,
    ]);

    $validated = $request->validate([
        'title'         => 'required|string|max:255',
        'description'   => 'required|string',
        'url'           => 'nullable|url',
        'github_url'    => 'nullable|url',
        'technologies'  => 'nullable|string',
        'featured'      => 'nullable',
        'order'         => 'nullable|integer',
        'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    $data = $request->except('image');

    // Convert empty strings to null for URL fields
    $data['url'] = $data['url'] ?: null;
    $data['github_url'] = $data['github_url'] ?: null;

    // Handle technologies: convert comma-separated string to array
    if (isset($data['technologies']) && is_string($data['technologies'])) {
        $data['technologies'] = array_filter(array_map('trim', explode(',', $data['technologies'])));
    } else {
        $data['technologies'] = [];
    }

    $data['featured'] = filter_var($data['featured'] ?? false, FILTER_VALIDATE_BOOLEAN);

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('projects', 'public');
    }

    $project = Project::create($data);

    if ($project->image) {
        $project->image = Storage::url($project->image);
    }
    return response()->json($project, 201);
}

public function update(Request $request, $id)
{
    $project = Project::findOrFail($id);

    // Convert empty strings to null
    $request->merge([
        'url' => $request->input('url') ?: null,
        'github_url' => $request->input('github_url') ?: null,
    ]);

    $validated = $request->validate([
        'title'         => 'required|string|max:255',
        'description'   => 'required|string',
        'url'           => 'nullable|url',
        'github_url'    => 'nullable|url',
        'technologies'  => 'nullable|string',
        'featured'       => 'nullable',
        'order'         => 'nullable|integer',
        'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    $data = $request->except('image');
    $data['url'] = $data['url'] ?: null;
    $data['github_url'] = $data['github_url'] ?: null;

    if (isset($data['technologies']) && is_string($data['technologies'])) {
        $data['technologies'] = array_filter(array_map('trim', explode(',', $data['technologies'])));
    } else {
        $data['technologies'] = [];
    }

    $data['featured'] = filter_var($data['featured'] ?? false, FILTER_VALIDATE_BOOLEAN);

    if ($request->hasFile('image')) {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $data['image'] = $request->file('image')->store('projects', 'public');
    }

    $project->update($data);

    if ($project->image) {
        $project->image = Storage::url($project->image);
    }

    return response()->json($project);
}

    // Admin: delete project
    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        // Delete associated image
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function show($id)
{
    $project = Project::findOrFail($id);
    
    if ($project->image) {
        $project->image = Storage::url($project->image);
    }
    
    return response()->json($project);
}
    public function all()
{
    $projects = Project::orderBy('order')->get();
    $projects->transform(function ($project) {
        if ($project->image) {
            $project->image = Storage::url($project->image);
        }
        return $project;
    });
    return response()->json($projects);
}

}
