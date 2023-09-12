<?php

namespace App\Views\Manutencao;

use App\Views\Components\Tela;
use Illuminate\View\Component;

class ManutencaoView extends Tela {

    public function __construct()
    {
        $this->criaCampos();
    }

    protected function criaCampos() {}

    protected function addComponent(...$components) {
        foreach($components as $component) {
            array_push($this->components, $component);
        }
    }

    public function loadRegistro($registro) {
        foreach($this->components as $component) {
            if($component->tipo == 'externo') {
                $aCodigo = explode('.', $component->externoCodigo);
                $aNome   = explode('.', $component->externoNome);
                $component->setValorCodigo($registro[$aCodigo[0]][$aCodigo[1]]);
                $component->setValorNome($registro[$aNome[0]][$aNome[1]]);
            } else {
                $component->setValor($registro[$component->nome]);
            }
        }

    }

    public function find($titulo) {
        foreach($this->components as $component) {
            if($component->titulo == $titulo) {
                return $component;
            }
        }
    }

}