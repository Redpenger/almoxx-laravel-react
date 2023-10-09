<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variacao extends Model
{
    use HasFactory;

    protected $table = 'variacoes';
    protected $with = ['produtos'];

    public function produtos() {
        return $this->hasMany('App\Models\VariacaoProduto');
    }

}
