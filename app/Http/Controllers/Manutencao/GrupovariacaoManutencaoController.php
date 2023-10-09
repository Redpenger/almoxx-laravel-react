<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Models\GrupoVariacao;
use App\Models\Variacao;
use App\Models\VariacaoProduto;
use App\Views\Manutencao\GrupoVariacaoManutencaoView;
use Illuminate\Http\Request;

class GrupovariacaoManutencaoController extends ManutencaoController
{
    protected function getView()
    {
        return new GrupoVariacaoManutencaoView();
    }

    public function store(Request $request)
    {
        $GrupoVariacao = new GrupoVariacao();
        $GrupoVariacao->nome = $request->get('atributo');
        $GrupoVariacao->produto_id = $request->produto_id;
        $GrupoVariacao->save();
        foreach($request->variacao as $key => $variacao) {
            if($variacao == '') continue;
            $Variacao = new Variacao();
            $Variacao->nome = $variacao;
            $Variacao->grupo_variacao_id = $GrupoVariacao->id;
            $Variacao->save();

            $produto = "produto_$key";
            foreach($request->get($produto) as $key_produto => $produto_variacao) {
                if($produto_variacao == '') continue;
                $VariacaoProduto = new VariacaoProduto();
                $VariacaoProduto->produto_id = $produto_variacao;
                $VariacaoProduto->variacao_id = $Variacao->id;
                $VariacaoProduto->quantidade = $request->get("$produto" . "_$key_produto" . "_quantidade");
                $VariacaoProduto->save();
            }
        }
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro cadastrado com sucesso'
        ], 200);
    }

    public function show()
    {
        $GrupoVariacao = $this->getRegistro();
        $variacoes = $GrupoVariacao->variacoes;
        return response()->json([
            'registro' => [
                'grupo_variacao' => $GrupoVariacao,
                'variacoes' => $variacoes
            ]
        ]);
    }

}
