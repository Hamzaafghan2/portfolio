<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'email', 'phone', 'location',
        'github_url', 'linkedin_url', 'twitter_url'
    ];
}