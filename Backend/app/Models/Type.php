<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pokemon;
use App\Models\Move;

class Type extends Model
{
    use HasFactory;

    public function pokemon()
    {
        return $this->belongsToMany(Pokemon::class);
    }

    public function moves()
    {
        return $this->hasMany(Move::class);
    }
}
