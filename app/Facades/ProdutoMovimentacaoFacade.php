<?php 

namespace App\Facades;

use App\Models\Produto;

class ProdutoMovimentacaoFacade {

    public static function addQuantidade(Produto $produto, $quantidade) {
        $produto->quantidade = $produto->quantidade + $quantidade;
        return $produto->update();
    }

    public static function subQuantidade(Produto $produto, $quantidade) {
        $produto->quantidade = $produto->quantidade - $quantidade;
        return $produto->update();
    }


}