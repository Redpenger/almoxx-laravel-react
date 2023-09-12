<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Models\ProdutoSubproduto;
use App\Views\Consulta\ProdutoSubprodutoConsultaView;
use Illuminate\Http\Request;

class ProdutosubprodutoConsultaController extends ConsultaController
{
    protected function getModelRegistros() {
        return 'App\Models\ProdutoSubproduto';
    }

    public function getColumnChave()
    {
        return 'produto_pai_id';
    }   

    protected function getView()
    {
        return new ProdutoSubprodutoConsultaView();
    }

    // protected function getRegistros()
    // {
    //     $search = request()->get('search');
    //     $searchName = request()->get('search-name');
        
    //     $model = $this->getModelRegistros();
    //     $model = new $model;
    //     if(request()->get('chave')) {
    //         $model = $model->where($this->getColumnChave(), request()->get('chave'));
    //     }
    //     if($search && $searchName) {
    //         $model = $model->where($searchName, 'LIKE', "%$search%");
    //     }
    //     return $model->with('produtoFilho')->paginate($this->getPagination());
    // }

}
