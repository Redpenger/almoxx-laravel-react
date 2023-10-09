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

    protected function getRegistros()
    {
        $model = $this->getModelFiltrado();
        $model->where('produto_id', request()->get('produto_id'));
        return $model->paginate($this->getPagination());
    }
}
