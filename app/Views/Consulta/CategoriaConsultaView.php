<?php
namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class CategoriaConsultaView extends ConsultaView {

    protected function criaCampos()
    {
        $id         = new CampoConsulta('number', 'Código'    , 'id');
        $id->filtro(true);
        $nome       = new CampoConsulta('text'  , 'Nome'      , 'nome');
        $nome->filtro(true);
        $this->addComponent($id, $nome);
    }

    protected function criaAcoes()
    {
        $incluir = new Acao('Incluir', 'create', route('categoria.manutencao'), 'global');
        $editar  = new Acao('Editar', 'edit', route('categoria.manutencao'), 'grid');
        $visualizar = new Acao('Visualizar', 'show', route('categoria.manutencao'), 'grid');
        $excluir = new Acao('Excluir', 'destroy', route('categoria.manutencao'), 'grid');
        $this->addAcao($incluir, $editar, $visualizar, $excluir);
    }



}