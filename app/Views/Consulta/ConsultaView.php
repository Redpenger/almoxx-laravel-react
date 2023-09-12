<?php

namespace App\Views\Consulta;

use App\Views\Components\Tela;

class ConsultaView extends Tela {

    public function __construct()
    {
        $this->criaCampos();
        $this->criaAcoes();
    }

    protected function criaCampos() {}

    protected function criaAcoes() {}

    protected function addComponent(...$components) {
        foreach($components as $component) {
            array_push($this->components, $component);
        }
    }

    protected function addAcao(...$actions) {
        foreach($actions as $action) {
            array_push($this->actions, $action);
        }
    }

}