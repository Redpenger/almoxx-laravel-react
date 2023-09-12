<?php

namespace App\Http\Controllers\Consulta;

use App\Models\Produto;
use App\Views\Consulta\ProdutoConsultaView;
use Illuminate\Http\Request;

class ProdutoConsultaController extends ConsultaController
{

    public function produto() {
        return response()->json([
            'tela' => [
                'nome' => 'Produtos',
                'registros' => Produto::select('id', 'nome', 'quantidade')->paginate(20),
                'acoes' => [
                    'action' => 'produto.manutencao',
                    'acoes' => [
                        'editar', 'excluir'
                    ],
                ]
            ]
        ]);
    }

    protected function getView()
    {
        return new ProdutoConsultaView();
    }

    // protected function getRegistros()
    // {
    //     $search = request()->get('search');
    //     $searchName = request()->get('search-name');
    //     $model = $this->getModelRegistros();
    //     $model = new $model;
    //     if($search && $searchName) {
    //         $model = $model->where($searchName, 'LIKE', "%$search%");
    //     }
    //     if(request()->get('categoria_id')) {
    //         $model = $model->where('categoria_id', request()->get('categoria_id'));
    //     }
    //     return $model->with('categoria')->paginate($this->getPagination());
    // }

    protected function externo(Request $request)
    {
        $id = $request->id;
        return response()->json([
            'registro' => Produto::find($id)
        ]);
    }

}
