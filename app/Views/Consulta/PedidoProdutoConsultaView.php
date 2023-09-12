<?php

namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class PedidoProdutoConsultaView extends ConsultaView {

    protected function criaCampos()
    {
        $produtoFoto = new CampoConsulta('imagem', 'Imagem', 'produto.foto');
        $produto = new CampoConsulta('text', 'Produto', 'produto.nome');
        $produto->filtro(true);
        
        $quantidade = new CampoConsulta('number', 'Quantidade', 'quantidade');
        $quantidade->filtro(true);
        $this->addComponent( $produto, $quantidade);
    }

    protected function criaAcoes()
    {
        $inc = new Acao('Incluir', 'create', route('pedidoproduto.manutencao'), 'global');
        $inc->addParametro('pedidoId', request()->get('chave'));
        $edi = new Acao('Editar', 'edit', route('pedidoproduto.manutencao'), 'grid');
        $vis = new Acao('Visualizar', 'show', route('pedidoproduto.manutencao'), 'grid');
        $exc = new Acao('Excluir', 'destroy', route('pedidoproduto.manutencao'), 'grid');

        $this->addAcao($inc, $edi, $vis, $exc);
    }

}