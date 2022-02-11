<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $withCount = 'notes';

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
