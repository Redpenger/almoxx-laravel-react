<?php

namespace App\Http\Controllers\Manutencao;

use App\Facades\ProdutoMovimentacaoFacade;
use App\Http\Controllers\Controller;
use App\Models\Saida;
use App\Views\Manutencao\PedidoProdutoManutencaoView;
use App\Views\Manutencao\ProdutoManutencaoView;
use Illuminate\Http\Request;

class PedidoprodutoManutencaoController extends ManutencaoController
{
    protected function getView()
    {
        return new PedidoProdutoManutencaoView();
    }

    public function store(Request $request)
    {
        $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'produto_id' => 'required|exists:produtos,id',
            'quantidade' => 'required|min:1',
        ],
        [
            'required' => 'O campo :attribute é obrigatório',
            'produto_id.existis' => 'O produto não existe', 
            'pedido_id.existis' => 'O pedido não existe', 
        ]);
        if($pedidoProduto = $this->Model->create($request->all())) {
            $this->geraSaida($pedidoProduto);
        }
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro cadastrado com sucesso'
        ], 200);
    }

    public function destroy(Request $request)
    {
        $this->Model = $this->Model->find($request->chave);
        $this->excluiSaida();
        $this->Model->delete();
        return response()->json([
            'janelaPai' => $request->telaPai,
            'mensagem' => 'Registro excluido com sucesso'
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'pedido_id' => 'required|exists:pedidos,id',
            'produto_id' => 'required|exists:produtos,id',
            'quantidade' => 'required|min:1',
        ],
        [
            'required' => 'O campo :attribute é obrigatório',
        ]);
        $this->Model = $this->Model->find($request->id);
        $this->excluiSaida();
        $this->Model->update($request->all());
        $this->geraSaida($this->Model);
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro alterado com sucesso'
        ]);
    }

    private function excluiSaida() {
        $produto = $this->Model->produto;
        if(count($produto->subprodutos) == 0) {
            ProdutoMovimentacaoFacade::addQuantidade($produto, $this->Model->quantidade);
            $saida = Saida::where('pedido_id', $this->Model->pedido_id)->where('produto_id', $produto->id)->first();
            $saida->delete();
        } else {
            foreach($produto->subprodutos as $subproduto) {
                $saida = Saida::where('pedido_id', $this->Model->pedido_id)->where('produto_id', $subproduto->produto_filho_id)->first();
                ProdutoMovimentacaoFacade::addQuantidade($subproduto->produtoFilho, $subproduto->quantidade * $this->Model->quantidade);
                if($saida) {
                    $saida->delete();
                }
            }
        }
    }

    private function geraSaida($pedidoProduto) {
        $saida = new Saida();
        $produto = $pedidoProduto->produto;
        if(count($produto->subprodutos) == 0) {
            ProdutoMovimentacaoFacade::subQuantidade($produto, $pedidoProduto->quantidade);
            $saida->create([
                'produto_id' => $produto->id,
                'pedido_id' => $pedidoProduto->pedido_id,
                'data' => $pedidoProduto->created_at,
                'quantidade' => $pedidoProduto->quantidade,
                'origem' => "Gerado automaticamente pelo Pedio de id: {$pedidoProduto->pedido->id}"
            ]);
        } else {
            foreach($produto->subprodutos as $subproduto) {
                ProdutoMovimentacaoFacade::subQuantidade($subproduto->produtoFilho, $pedidoProduto->quantidade * $subproduto->quantidade);
                $saida->create([
                    'produto_id' => $subproduto->produto_filho_id,
                    'pedido_id' => $pedidoProduto->pedido_id,
                    'data' => $pedidoProduto->created_at,
                    'quantidade' => $pedidoProduto->quantidade * $subproduto->quantidade,
                    'origem' => "Gerado automaticamente pelo Pedio de id: {$pedidoProduto->pedido->id}"
                ]);
            }
        }
    }
}
