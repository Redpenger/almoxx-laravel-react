<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Views\Manutencao\PedidoManutencaoView;
use Illuminate\Http\Request;

class PedidoManutencaoController extends ManutencaoController
{

    protected function criaTela()
    {
        $view = $this->getView();
        $this->loadRegistro($view);
        if(request()->get('acao') == 'edit') {
            $campoCliente = $view->find('Cliente');
            $campoCliente->disabled(true);
        }
        return $this->getResponse($view);
    }

    protected function getView()
    {
        return new PedidoManutencaoView();
    }

    protected function getTamX() {
        return '600px';
    }

    protected function getTamY() {
        return '70%';
    }

    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'data' => 'date|required',
            'prazo_entrega' => 'required',
        ],
        [
            'required' => 'O campo :attribute é obrigatório',
            'date' => 'O campo :attribute não contem uma data válida'
        ]);
        return parent::store($request);
    }

}
