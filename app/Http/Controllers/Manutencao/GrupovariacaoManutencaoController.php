<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Views\Manutencao\GrupoVariacaoManutencaoView;
use Illuminate\Http\Request;

class GrupovariacaoManutencaoController extends ManutencaoController
{
    protected function getView()
    {
        return new GrupoVariacaoManutencaoView();
    }
}
