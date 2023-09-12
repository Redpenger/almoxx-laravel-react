<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    use HasFactory;

    protected $fillable = ['produto_id', 'data', 'quantidade', 'origem'];

    protected $columns = ['produto_id', 'data', 'quantidade', 'origem'];

    public function getColumns() {
        return $this->columns;
    }

    public function produto() {
        return $this->belongsTo('App\Models\Produto');
    }
}
