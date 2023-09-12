<?php

namespace App\Views\Manutencao;

use App\Views\Components\CampoExterno;
use App\Views\Components\CampoForm;

class ProdutoSubprodutoManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $id = new CampoForm('number', 'Id', 'id');
        $id->hidden(true);

        $produtoPai = new CampoExterno('externo', 'Produto Pai', 'produtoPai.id', 'produtoPai.nome', route('produto.consulta'), 'produto', 'produto_pai_id');
        $produtoPai->hidden(true);

        $produtoFilho = new CampoExterno('externo', 'Produto', 'produtoFilho.id', 'produtoFilho.nome', route('produto.consulta'), 'produto', 'produto_filho_id');
        $quantidade = new CampoForm('number', 'Quantidade', 'quantidade');

        $this->addComponent($id, $produtoPai, $produtoFilho, $quantidade);
    }
}