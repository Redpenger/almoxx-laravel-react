<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Views\Manutencao\CategoriaManutencaoView;
use Illuminate\Http\Request;

class CategoriaManutencaoController extends ManutencaoController
{


    protected function getTamY()
    {
        return '350px';
    }

    protected function getTamX()
    {
        return '500px';
    }

    protected function getView()
    {
        return new CategoriaManutencaoView();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:categorias,nome',
        ], [
            'required' => 'O campo :attribute é obrigatório',
            'unique' => 'O nome já está sendo usado'
        ]);
        return parent::store($request);
    }

    public function update(Request $request) {
        $request->validate([
            'nome' => "required|unique:categorias,nome,$request->id",
        ], [
            'required' => 'O campo :attribute é obrigatório',
            'unique' => 'O nome já está sendo usado'
        ]);
        return parent::update($request);
    }

    public function create(Request $request) {
        $this->setAcao('create');
        $this->setNome('Incluir Categoria');
        return $this->criaTela();
    }

    public function edit() {
        $this->setAcao('edit');
        $this->setNome('Editar Categoria');
        return $this->criaTela();
    }

    // public function show() {
    //     $this->setAcao('show');
    //     $this->setNome('Visualizar Categoria');
    //     return $this->criaTela();
    // }
}
