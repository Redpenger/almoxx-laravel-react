<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Views\Consulta\PedidoConsultaView;
use Illuminate\Http\Request;

class PedidoConsultaController extends ConsultaController
{
    protected function getView()
    {
        return new PedidoConsultaView();
    }
}
