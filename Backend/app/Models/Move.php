<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pokemon;
use App\Models\Type;

class Move extends Model
{
    use HasFactory;

    public function pokemon()
    {
        return $this->belongsToMany(Pokemon::class);
    }
    public function types()
    {
        return $this->belongsTo(Type::class);
    }
}
