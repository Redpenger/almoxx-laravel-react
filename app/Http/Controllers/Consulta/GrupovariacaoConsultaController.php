<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Views\Consulta\GrupoVariacaoConsultaView;
use Illuminate\Http\Request;

class GrupovariacaoConsultaController extends ConsultaController
{
    protected function getView()
    {
        return new GrupoVariacaoConsultaView();
    }
}
