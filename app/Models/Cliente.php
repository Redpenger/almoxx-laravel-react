<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'endereco', 'telefone'];

    protected $columns = ['nome', 'endereco', 'telefone'];

    public function getColumns() {
        return $this->columns;
    }

}
