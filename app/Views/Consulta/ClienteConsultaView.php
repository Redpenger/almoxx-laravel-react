<?php

namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class ClienteConsultaView extends ConsultaView{

    protected function criaCampos()
    {
        $nome = new CampoConsulta('text', 'Nome', 'nome');
        $endereco = new CampoConsulta('text', 'Endereço', 'endereco');
        $fone = new CampoConsulta('text', 'Telefone', 'telefone');

        $this->addComponent($nome, $endereco, $fone);
    }

    protected function criaAcoes()
    {
        $incluir = new Acao('Incluir', 'create', route('cliente.manutencao'), 'global');
        $editar = new Acao('Editar', 'edit', route('cliente.manutencao'), 'grid');
        $vis = new Acao('Visualizar', 'show', route('cliente.manutencao'), 'grid');
        $excluir = new Acao('Excluir', 'destroy', route('cliente.manutencao'), 'grid');
        
        $this->addAcao($incluir, $editar, $vis, $excluir);
    }

}