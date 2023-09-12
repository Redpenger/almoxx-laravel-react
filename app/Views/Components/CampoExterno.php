<?php

namespace App\Views\Components;

class CampoExterno {

    public $tipo;
    public $titulo;
    public $nome;
    public $valorCodigo;
    public $valorNome;
    public $externoCodigo;
    public $externoNome;
    public $rota;
    public $externo;
    public $hidden;
    public $filtro;
    public $disabled;

    public function __construct($tipo, $titulo, $externoCodigo, $externoNome, $rota, $externo, $nome)
    {
        $this->tipo = $tipo;
        $this->titulo = $titulo;
        $this->externoCodigo = $externoCodigo;
        $this->externoNome = $externoNome;
        $this->rota = $rota;
        $this->externo = $externo;
        $this->nome = $nome;
    }

    public function filtro($state) {
        $this->filtro = $state;
    }

    public function disabled($state) {
        $this->disabled = $state;
    }

    public function setValorCodigo($valor) {
        $this->valorCodigo = $valor;
    }

    public function setValorNome($valor) {
        $this->valorNome = $valor;
    }

    public function getValorNome() {
        return $this->valorNome;
    }

    public function getValorCodigo() {
        return $this->valorCodigo;
    }

    public function hidden($state) {
        $this->hidden = $state;
    }

}