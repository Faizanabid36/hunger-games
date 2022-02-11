<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Query extends Model
{
    use HasFactory, Searchable;

    protected $guarded = [];

    // protected $with = 'responses';

    public static function boot()
    {

        parent::boot();

        self::created(function ($model) {
            QueryExtra::create(['query_id' => $model->id, 'status' => 'Open']);
        });
    }

    public function extra()
    {
        return $this->hasOne(QueryExtra::class);
    }

    public function responses()
    {
        return $this->hasMany(QueryResponse::class);
    }

    public function searchableAs()
    {
        return 'queries_index';
    }
}
