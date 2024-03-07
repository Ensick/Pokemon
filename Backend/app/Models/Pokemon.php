<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Move;
use App\Models\Region;
use App\Models\Type;
use App\Models\Stat;

class Pokemon extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'icon', 'img', 'img_shiny', 'num_pkm', 'description'];
    

    public function types()
    {
        return $this->belongsToMany(Type::class, 'pokemon_types');
    }

    public function moves()
    {
        return $this->belongsToMany(Move::class);
    }

    public function regions()
    {
        return $this->belongsToMany(Region::class,'pokemon_regions');
    }

    public function stats()
    {
        return $this->hasMany(Stat::class);
    }
}
