<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class QueryResponse extends Model
{
    use HasFactory, Searchable;

    // protected $with = ['parent_query'];

    protected $guarded = [];

    public function parent_query()
    {
        return $this->belongsTo(Query::class, 'query_id', 'id');
    }

    public function searchableAs()
    {
        return 'query_responses_index';
    }
}
