<?php

namespace App\Views\Manutencao;

use App\Views\Components\CampoExterno;
use App\Views\Components\CampoForm;

class PedidoProdutoManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $codigo = new CampoForm('number', 'Código', 'id');
        $codigo->hidden(true);

        $pedidoId = new CampoForm('number', 'Pedido', 'pedido_id');
        // $pedidoId->hidden(true);
        $pedidoId->setValor(request()->get('pedidoId'));

        $produto = new CampoExterno('externo', 'Produto', 'produto.id', 'produto.nome', route('produto.consulta'), 'produto', 'produto_id');
        $quantidade = new CampoForm('number', 'Quantidade', 'quantidade');

        $this->addComponent($codigo, $pedidoId, $produto, $quantidade);
    }

}