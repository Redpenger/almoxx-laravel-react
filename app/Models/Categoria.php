<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['nome'];

    protected $columns = ['id', 'nome'];

    protected $filtros = [
        'id',
        'nome',
    ];

    public function getFiltros() {
        return $this->filtros;
    }

    public function getColumns() {
        return $this->columns;
    }

    public function produtos() {
        return $this->belongsTo('App\Models\Produto');
    }
    
}
