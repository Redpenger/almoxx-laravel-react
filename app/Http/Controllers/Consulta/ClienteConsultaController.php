<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Views\Consulta\ClienteConsultaView;
use Illuminate\Http\Request;

class ClienteConsultaController extends ConsultaController
{
    protected function externo(Request $request)
    {
        $id = $request->id;
        return response()->json([
            'registro' => Cliente::find($id)
        ]);
    }

    protected function getView()
    {
        return new ClienteConsultaView();
    }
}
