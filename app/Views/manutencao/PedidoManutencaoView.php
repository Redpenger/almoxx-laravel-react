<?php 

namespace App\Views\Manutencao;

use App\Views\Components\CampoExterno;
use App\Views\Components\CampoForm;

class PedidoManutencaoView extends ManutencaoView {

    protected function criaCampos()
    {
        $codigo = new CampoForm('number', 'Código', 'id');
        $codigo->hidden(true);
        $cliente = new CampoExterno('externo', 'Cliente', 'cliente.id', 'cliente.nome', route('cliente.consulta'), 'cliente', 'cliente_id');
        $data = new CampoForm('date', 'Data', 'data');
        $prazoEntrega = new CampoForm('number', 'Prazo Entrega', 'prazo_entrega');
        $obs = new CampoForm('text', 'Observação', 'observacao');

        $this->addComponent($codigo, $cliente, $data, $prazoEntrega, $obs);
    }
}