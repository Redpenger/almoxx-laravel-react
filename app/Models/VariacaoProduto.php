<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariacaoProduto extends Model
{
    use HasFactory;

    protected $with = ['produto'];

    public function produto() {
        return $this->belongsTo('App\Models\Produto');
    }

}
