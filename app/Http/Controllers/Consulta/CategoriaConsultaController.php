<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use App\Views\Consulta\CategoriaConsultaView;

class CategoriaConsultaController extends ConsultaController
{
    public function categoria() {
        return response()->json([
            'tela' => [
                'nome' => 'Categorias',
                'registros' => Categoria::select('id', 'nome')->paginate(20),
                'acoes' => [
                    'action' => 'categoria.manutencao',
                    'acoes' => [
                        'editar', 'excluir'
                    ],
                ]
            ]
        ]);
    }

    protected function externo(Request $request)
    {
        $id = $request->id;
        return response()->json([
            'registro' => Categoria::find($id)
        ]);
    }

    protected function getView()
    {
        return new CategoriaConsultaView();
    }

}
