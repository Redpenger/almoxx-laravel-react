<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saida extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'pedido_id',
        'data',
        'quantidade',
        'origem',
    ];

    protected $colums = [
        'produto_id',
        'pedido_id',
        'data',
        'quantidade',
        'origem',
    ];

    public function getColumns() {
        return $this->colums;
    }

    public function produto() {
        return $this->belongsTo('App\Models\Produto');
    }
}
