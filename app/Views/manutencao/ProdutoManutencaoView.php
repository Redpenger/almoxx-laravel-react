<?php

namespace App\Views\Manutencao;

use App\Views\Components\CampoExterno;
use App\Views\Components\CampoForm;

class ProdutoManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $codigo = new CampoForm('number', 'Código', 'id');
        $codigo->hidden(true);
        $nome   = new CampoForm('text', 'Nome', 'nome');
        $foto   = new CampoForm('file', 'Imagem', 'foto');
        $categoria = new CampoExterno('externo', 'Categoria', 'categoria.id', 'categoria.nome', route('categoria.consulta'), 'categoria', 'categoria_id');
        $this->addComponent($codigo, $nome, $categoria, $foto);
    }

}