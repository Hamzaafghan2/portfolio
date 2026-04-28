<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // Public - get latest 3 published news for homepage
    public function index()
    {
        $news = News::where('published', true)
                    ->orderBy('created_at', 'desc')
                    ->take(3)
                    ->get()
                    ->transform(function ($item) {
                        if ($item->image) {
                            $item->image = Storage::url($item->image);
                        }
                        return $item;
                    });
        return response()->json($news);
    }

    // Public - get all published news
    public function allPublished()
    {
        $news = News::where('published', true)
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->transform(function ($item) {
                        if ($item->image) {
                            $item->image = Storage::url($item->image);
                        }
                        return $item;
                    });
        return response()->json($news);
    }

    // Public - single news by slug
    public function show($slug)
    {
        $news = News::where('slug', $slug)->where('published', true)->firstOrFail();
        if ($news->image) {
            $news->image = Storage::url($news->image);
        }
        return response()->json($news);
    }

    // Admin - all news (including drafts)
    public function all()
    {
        $news = News::orderBy('created_at', 'desc')
                    ->get()
                    ->transform(function ($item) {
                        if ($item->image) {
                            $item->image = Storage::url($item->image);
                        }
                        return $item;
                    });
        return response()->json($news);
    }

    // Admin - create
    public function store(Request $request)
    {
        $request->merge([
            'slug' => $request->slug ?: \Str::slug($request->title),
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'unique:news,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category' => 'nullable|string',
            'published' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('news', 'public');
        }

        $data['published_at'] = $data['published'] ? now() : null;

        $news = News::create($data);
        if ($news->image) {
            $news->image = Storage::url($news->image);
        }
        return response()->json($news, 201);
    }

    // Admin - update
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category' => 'nullable|string',
            'published' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $data['image'] = $request->file('image')->store('news', 'public');
        }

        $news->update($data);
        if ($news->image) {
            $news->image = Storage::url($news->image);
        }
        return response()->json($news);
    }

    // Admin - delete
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }
        $news->delete();
        return response()->json(['message' => 'Deleted']);
    }
}