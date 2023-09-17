<?php
namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class ProdutoConsultaView extends ConsultaView {

    protected function criaCampos()
    {
        $foto       = new CampoConsulta('imagem', 'Imagem'    , 'foto');
        $id         = new CampoConsulta('number', 'Código'    , 'id');
        $id->filtro(true);
        $nome       = new CampoConsulta('text'  , 'Nome'      , 'nome');
        $nome->filtro(true);
        $categoria  = new CampoConsulta('text'  , 'Categoria' , 'categoria.nome');
        $categoria->filtro(true);
        $quantidade = new CampoConsulta('number', 'Quantidade', 'quantidade');
        $quantidade->filtro(true);

        $this->addComponent($id, $nome, $categoria, $quantidade);
    }

    protected function criaAcoes()
    {
        $incluir = new Acao('Incluir', 'create', route('produto.manutencao'), 'global');
        $editar  = new Acao('Editar', 'edit', route('produto.manutencao'), 'grid');
        $visualizar = new Acao('Visualizar', 'show', route('produto.manutencao'), 'grid');
        $excluir = new Acao('Excluir', 'destroy', route('produto.manutencao'), 'grid');
        $subprodutos = new Acao('Subprodutos', 'consulta', route('produtosubproduto.consulta'), 'grid');
        $variacoes = new Acao('Variações', 'consulta', route('grupovariacao.consulta'), 'grid');
        $this->addAcao($incluir, $editar, $visualizar, $excluir, $subprodutos, $variacoes);
    }



}