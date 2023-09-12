<?php

namespace App\Views\Manutencao;

use App\Views\Components\CampoForm;

class CategoriaManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $codigo = new CampoForm('number', 'Código', 'id');
        $codigo->hidden(true);
        $nome = new CampoForm('text', 'Nome', 'nome');

        $this->addComponent($codigo, $nome);
    }

}