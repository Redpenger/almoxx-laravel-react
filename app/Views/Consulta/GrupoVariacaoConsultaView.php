<?php 

namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;
use App\Views\Components\CampoForm;

class GrupoVariacaoConsultaView extends ConsultaView 
{
    protected function criaCampos()
    {
        $nome = new CampoConsulta('text', 'Nome', 'nome');

        $this->addComponent($nome);
    }

    protected function criaAcoes()
    {
        $inc = new Acao('Incluir', 'create', route('grupovariacao.manutencao'), 'grid');
        $this->addAcao($inc);
    }
}