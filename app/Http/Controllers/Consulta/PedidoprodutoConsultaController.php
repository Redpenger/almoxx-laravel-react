<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Views\Consulta\PedidoProdutoConsultaView;
use Illuminate\Http\Request;

class PedidoprodutoConsultaController extends ConsultaController
{
    public function getColumnChave()
    {
        return 'pedido_id';
    }
    
    protected function getView()
    {
        return new PedidoProdutoConsultaView();
    }
    
}
