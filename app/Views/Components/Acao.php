<?php

namespace App\Views\Components;

class Acao 
{
    public $nome;
    public $rota;
    public $acao;
    public $tipo;
    public $parametros = [];

    public function __construct($nome, $acao, $rota, $tipo)
    {
        $this->nome = $nome;
        $this->rota = $rota;
        $this->acao = $acao;
        $this->tipo = $tipo;
    }

    public function addParametro($nome, $valor) {
        array_push($this->parametros, ['nome' => $nome, 'valor' => $valor]);
    }

}