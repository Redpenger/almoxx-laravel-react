<?php

namespace App\Http\Controllers\Manutencao;

use App\Facades\ProdutoMovimentacaoFacade;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EntradaManutencaoController extends ManutencaoController
{
    public function store(Request $request)
    {
        $dados = $request->all();
        $dados['data'] = date('Y-m-d');
        $dados['origem'] = 'manual';
        $entrada = $this->Model->create($dados);
        ProdutoMovimentacaoFacade::addQuantidade($entrada->produto, $entrada->quantidade);
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro cadastrado com sucesso'
        ], 200);
    }

    public function destroy(Request $request)
    {
        $this->Model = $this->Model->find($request->chave);
        $this->Model->delete();
        ProdutoMovimentacaoFacade::subQuantidade($this->Model->produto, $this->Model->quantidade);
        return response()->json([
            'janelaPai' => $request->telaPai,
            'mensagem' => 'Registro excluido com sucesso'
        ]);
    }
}
