<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class About extends Model
{
    use HasFactory;

    protected $table = 'about';

    protected $fillable = [
        'name',
        'title',
        'description',
        'image',
        'logo', 
        'favicon',
        'years_experience',
        'projects_done',
        'happy_clients',
        'technologies_count',
    ];
}