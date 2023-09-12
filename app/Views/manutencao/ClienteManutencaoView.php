<?php

namespace App\Views\Manutencao;

use App\Views\Components\CampoForm;

class ClienteManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $codigo = new CampoForm('number', 'Código', 'id');
        $codigo->hidden(true);
        $nome = new CampoForm('text', 'Nome', 'nome');
        $endereco = new CampoForm('text', 'Endereço', 'endereco');
        $fone = new CampoForm('text', 'Telefone', 'telefone');

        $this->addComponent($codigo, $nome, $endereco, $fone);
    }

}