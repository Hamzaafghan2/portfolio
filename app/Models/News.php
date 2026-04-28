<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'category',
        'published',
        'published_at',
    ];

    protected $casts = [
        'published' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Auto generate slug
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($news) {
            if (!$news->slug) {
                $news->slug = \Str::slug($news->title);
            }
        });
    }
}