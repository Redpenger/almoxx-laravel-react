<?php

namespace App\Http\Controllers\Manutencao;

use App\Views\Manutencao\ProdutoManutencaoView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProdutoManutencaoController extends ManutencaoController
{
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:produtos,nome',
            'categoria_id' => 'required|exists:categorias,id',
           
        ], 
        [
            'required' => 'O campo :attribute é obrigatório',
            'file' => 'O campo :attribute deve ser um arquivo',
            'existis' => 'Categoria inexistente',
            'unique' => 'O nome informado já existe',
        ]);

        $dados= $request->all();
        if($request->file('foto')) {
            $dados['foto'] = $request->file('foto')->store('foto-componentes', 'public');
        }
        $this->Model->create($dados);
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro cadastrado com sucesso'
        ], 200);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nome' => "required|unique:produtos,nome,$request->id",
            'categoria_id' => 'required|exists:categorias,id',
            
        ], 
        [
            'required' => 'O campo :attribute é obrigatório',
            'file' => 'O campo :attribute deve ser um arquivo',
            'existis' => 'Categoria inexistente',
            'unique' => 'O nome informado já existe',
        ]);

        $dados= $request->all();
        if($request->file('foto')) {
            $dados['foto'] = $request->file('foto')->store('foto-componentes', 'public');
        }
        $this->Model = $this->Model->find($request->id);
        $fileName = $this->Model->getFotoRaw();
        $fileName ? $result = Storage::disk('public')->delete($fileName) : '';
        $this->Model->update($dados);
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro alterado com sucesso'
        ]);
    }

    public function destroy(Request $request)
    {
        $this->Model = $this->Model->find($request->chave);
        $fileName = $this->Model->getFotoRaw();
        // $result = Storage::disk('public')->delete($fileName);
        $this->Model->delete();
        return response()->json([
            'janelaPai' => $request->telaPai,
            'mensagem' => 'Registro excluido com sucesso'
        ]);
    }

    protected function getTamX() {
        return '600px';
    }

    protected function getTamY() {
        return '500px';
    }

    protected function getView()
    {
        return new ProdutoManutencaoView();
    }

}
