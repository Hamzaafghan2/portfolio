<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about', function (Blueprint $table) {
            if (!Schema::hasColumn('about', 'name')) {
                $table->string('name')->nullable()->after('id');
            }
            if (!Schema::hasColumn('about', 'logo')) {
                $table->string('logo')->nullable()->after('image');
            }
        });
    }

    public function down(): void
    {
        Schema::table('about', function (Blueprint $table) {
            $table->dropColumn(['name', 'logo']);
        });
    }
};