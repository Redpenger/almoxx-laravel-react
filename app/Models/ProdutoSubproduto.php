<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoSubproduto extends Model
{
    use HasFactory;

    protected $fillable = ['produto_pai_id', 'produto_filho_id', 'quantidade'];
    protected $with = ['produtoFilho', 'produtoPai'];

    public function produtoFilho() {
        return $this->belongsTo('App\Models\Produto', 'produto_filho_id');
    }

    public function produtoPai() {
        return $this->belongsTo('App\Models\Produto', 'produto_pai_id');
    }
}
