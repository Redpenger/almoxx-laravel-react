<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Views\Manutencao\ProdutoSubprodutoManutencaoView;
use Illuminate\Http\Request;

class ProdutosubprodutoManutencaoController extends ManutencaoController
{
    protected function getTamX() {
        return '500px';
    }

    protected function getTamY() {
        return '500px';
    }

    protected function getView()
    {
        return new ProdutoSubprodutoManutencaoView();
    }

    protected function criaTela()
    {
        $view = $this->getView();
        request()->get('acao') != 'create' ? $view->loadRegistro($this->getRegistro()): '';
        $produtoPai = $view->find('Produto Pai');
        request()->get('acao') == 'create' ? $produtoPai->setValorCodigo(request()->get('produtoPai')): '';

        return response()->json([
            'tela' => [
                'id'        => $this->getId(),
                'nome'      => $this->getNome(),
                'chave'     => request()->get('chave'),
                'telaPai'   => request()->get('telaPai'),
                'url'       => $this->getUrl(),
                'width'     => $this->getTamX(),
                'height'    => $this->getTamY(),
                'tipo'      => 'manutencao',
                'campos'    => $view->getCampos(),
                'acaoEnvio' => $this->getAcaoEnvio(),
                'actionForm' => route(strtolower($this->splitCamelCase(get_called_class())[0]) . '.' . 'manutencao'),
            ]
        ]);
    }

}
