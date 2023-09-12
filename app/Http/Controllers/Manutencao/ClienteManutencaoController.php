<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Views\Manutencao\ClienteManutencaoView;
use Illuminate\Http\Request;

class ClienteManutencaoController extends ManutencaoController
{
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:clientes,nome',
        ],
        [
            'required' => 'O campo :attribute é obrigatório'
        ]);
        return parent::store($request);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nome' => "required|unique:clientes,nome,$request->id",
        ],
        [
            'required' => 'O campo :attribute é obrigatório'
        ]);
        return parent::update($request);
    }

    protected function getTamY()
    {
        return '450px';
    }

    protected function getView()
    {
        return new ClienteManutencaoView();
    }

}
