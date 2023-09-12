<?php

namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class ProdutoSubprodutoConsultaView extends ConsultaView {

    protected function criaCampos()
    {
        $foto = new CampoConsulta('imagem', 'Imagem', 'produto_filho.foto');
        $produto = new CampoConsulta('text', 'Produto', 'produto_filho.nome');
        $quantidade = new CampoConsulta('number', 'Quantidade', 'quantidade');
        $quantidade->filtro(true);

        $this->addComponent( $produto, $quantidade);
    }

    protected function criaAcoes()
    {
        $incluir = new Acao('Incluir', 'create', route('produtosubproduto.manutencao'), 'global');
        $incluir->addParametro('produtoPai', request()->get('chave'));

        $editar  = new Acao('Editar', 'edit', route('produtosubproduto.manutencao'), 'grid');
        $excluir = new Acao('Excluir', 'destroy', route('produtosubproduto.manutencao'), 'grid');
        $this->addAcao($incluir, $editar, $excluir);
    }

}