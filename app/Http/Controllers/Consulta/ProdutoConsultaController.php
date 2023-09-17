<?php

namespace App\Http\Controllers\Consulta;

use App\Models\Produto;
use App\Views\Consulta\ProdutoConsultaView;
use Illuminate\Http\Request;

class ProdutoConsultaController extends ConsultaController
{
    protected function getView()
    {
        return new ProdutoConsultaView();
    }

    protected function externo(Request $request)
    {
        $id = $request->id;
        return response()->json([
            'registro' => Produto::find($id)
        ]);
    }

}
