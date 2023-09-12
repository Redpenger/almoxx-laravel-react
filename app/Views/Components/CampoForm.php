<?php

namespace App\Views\Components;

class CampoForm {

    public $tipo;
    public $titulo;
    public $nome;
    public $valor;
    public $hidden;

    public function __construct($tipo, $titulo, $nome)
    {
        $this->tipo = $tipo;
        $this->titulo = $titulo;
        $this->nome = $nome;
    }

    public function hidden($state) {
        $this->hidden = $state;
    }

    public function setValor($valor) {
    if($this->tipo == 'file') {
        return;
    }
        $this->valor = $valor;
    }

    public function getValor() {
        return $this->valor;
    }

}