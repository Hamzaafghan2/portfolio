<?php

namespace App\View\Composers;

use App\Models\About;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class AppComposer
{
    public function compose(View $view)
    {
        $about = About::first();
        $favicon = null;
        
        if ($about && $about->favicon) {
            $favicon = Storage::url($about->favicon);
        }
        
        $view->with('favicon', $favicon);
    }
}