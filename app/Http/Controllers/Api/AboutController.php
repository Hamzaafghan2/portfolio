<?php



namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::first();
        if ($about) {
            if ($about->image) {
                $about->image = Storage::url($about->image);
            }
            if ($about->logo) {
                $about->logo = Storage::url($about->logo);
            }
            if ($about->favicon) {
            $about->favicon = Storage::url($about->favicon);
            }
        }
        return response()->json($about);
    }

    public function update(Request $request)
    {
        $request->merge([
            'url' => $request->input('url') ?: null,
        ]);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'years_experience' => 'nullable|integer',
            'projects_done' => 'nullable|integer',
            'happy_clients' => 'nullable|integer',
            'technologies_count' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $about = About::first();
        $data = $request->except(['image', 'logo']);

        // Handle profile image
        if ($request->hasFile('image')) {
            if ($about && $about->image) {
                Storage::disk('public')->delete($about->image);
            }
            $data['image'] = $request->file('image')->store('about', 'public');
        }

        // Handle logo
        if ($request->hasFile('logo')) {
            if ($about && $about->logo) {
                Storage::disk('public')->delete($about->logo);
            }
            $data['logo'] = $request->file('logo')->store('about', 'public');
        }

        if (!$about) {
            $about = About::create($data);
        } else {
            $about->update($data);
                }
        ///favicon
                if ($request->hasFile('favicon')) {
            if ($about && $about->favicon) {
                Storage::disk('public')->delete($about->favicon);
            }
            $data['favicon'] = $request->file('favicon')->store('about', 'public');
}

        // Return with full URLs
        if ($about->image) $about->image = Storage::url($about->image);
        if ($about->logo) $about->logo = Storage::url($about->logo);

        return response()->json(['message' => 'About updated!', 'data' => $about]);
    }
}


// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\About;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class AboutController extends Controller
// {
//     public function index()
//     {
//         $about = About::first();
//         if ($about && $about->image) {
//             $about->image = Storage::url($about->image); // returns full URL
//         }
//         return response()->json($about);
//     }

//     public function update(Request $request)
//     {
//         $request->validate([
//             'title' => 'required|string|max:255',
//             'description' => 'required|string',
//             'years_experience' => 'integer',
//             'projects_done' => 'integer',
//             'happy_clients' => 'integer',
//             'technologies_count' => 'integer',
//             'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
//         ]);

//         $about = About::first();
//         $data = $request->except('image');

//         // Handle image upload
//         if ($request->hasFile('image')) {
//             // Delete old image
//             if ($about && $about->image) {
//                 Storage::disk('public')->delete($about->image);
//             }
//             $path = $request->file('image')->store('about', 'public');
//             $data['image'] = $path;
//         }

//         if (!$about) {
//             $about = About::create($data);
//         } else {
//             $about->update($data);
//         }

//         // Return updated about with full URL
//         if ($about->image) {
//             $about->image = Storage::url($about->image);
//         }

//         return response()->json(['message' => 'About updated!', 'data' => $about]);
//     }
// }
