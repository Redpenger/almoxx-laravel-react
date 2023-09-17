<?php 

namespace App\Views\Manutencao;

use App\Views\Components\CampoExterno;
use App\Views\Components\GridProdutoVariacao;
use App\Views\Components\CampoForm;
use App\Views\Components\Fieldset;
use App\Views\Components\Grid;

class GrupoVariacaoManutencaoView extends ManutencaoView 
{
    protected function criaCampos()
    {
        $nome = new CampoForm('text', 'Referencia', 'nome');
        
        $fieldset = new Fieldset('fieldset', 'Variação');
        $grid = new Grid('grid_variacao');

        $nomeVariacao = new CampoForm('text', 'Nome', 'variacao');
        $grid->addComponent($fieldset);
        
        $gridProduto = new Grid('grid_produto');
        $produto = new CampoExterno('externo', 'Produto', 'produto.id', 'produto.nome', route('produto.consulta'), 'produto', 'produto_id');
        $quantidade = new CampoForm('number', 'Quantidade', 'quantidade');
        $gridProduto->addComponent($produto, $quantidade);
        
        $fieldset->addComponent($nomeVariacao, $gridProduto);



        $this->addComponent($nome, $grid);
    }
}