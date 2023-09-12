<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoProduto extends Model
{
    use HasFactory;

    protected $fillable = ['pedido_id', 'produto_id', 'quantidade'];
    protected $with = ['produto', 'pedido'];

    public function produto() {
        return $this->belongsTo('App\Models\Produto', 'produto_id');
    }

    public function pedido() {
        return $this->belongsTo('App\Models\Pedido', 'pedido_id');
    }
}
