<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = ['cliente_id', 'data', 'prazo_entrega', 'observacao'];
    protected $with = ['cliente'];

    public function cliente() {
        return $this->belongsTo('App\Models\Cliente');
    }

    public function getDataAttribute($valor) {
        return date('Y-m-d', strtotime($valor));
    }
}
