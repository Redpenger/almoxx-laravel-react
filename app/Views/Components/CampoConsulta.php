<?php

namespace App\Views\Components;

class CampoConsulta {

    public $tipo;
    public $titulo;
    public $nome;
    public $filtro;

    public function __construct($tipo, $titulo, $nome)
    {
        $this->titulo = $titulo;
        $this->nome = $nome;
        $this->tipo = $tipo;
    }

    public function filtro($state) {
        $this->filtro = $state;
    }

}