<?php 

namespace App\Views\Components;

class FiltroConsulta {

    public $campo;
    public $operadores;

    public function __construct($campo, $operadores)
    {
        $this->campo = $campo;
        $this->operadores = $operadores;
    }

}