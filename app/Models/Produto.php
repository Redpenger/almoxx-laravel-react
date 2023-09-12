<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = ['foto', 'nome', 'categoria_id'];
    protected $with = ['categoria'];

    public function categoria() {
        return $this->belongsTo('App\Models\Categoria');
    }

    public function subprodutos() {
        return $this->hasMany('App\Models\ProdutoSubproduto', 'produto_pai_id');
    }

    public function getFotoAttribute($value) {
        return "<img src='/storage/$value' alt='img' style='width: 40px; height: 40px; border-radius: 5px; padding: 0'/>";
    }

    public function getFotoRaw() {
        return $this->getRawOriginal('foto');
    }

}
