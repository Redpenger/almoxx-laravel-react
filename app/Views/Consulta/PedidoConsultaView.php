<?php

namespace App\Views\Consulta;

use App\Views\Components\Acao;
use App\Views\Components\CampoConsulta;

class PedidoConsultaView extends ConsultaView {

    protected function criaCampos()
    {
        $codigo = new CampoConsulta('number', 'Código', 'id');
        $cliente = new CampoConsulta('text', 'Cliente', 'cliente.nome');
        $cliente->filtro(true);
        $data = new CampoConsulta('date', 'Data', 'data');
        // $data->filtro(true);
        $prazoEntrega = new CampoConsulta('number', 'Prazo Entrega', 'prazo_entrega');
        $obs = new CampoConsulta('text', 'Observação', 'observacao');
        $obs->filtro(true);
        $this->addComponent($codigo, $cliente, $data, $prazoEntrega, $obs);
    }

    protected function criaAcoes()
    {
        $inc = new Acao('Incluir', 'create', route('pedido.manutencao'), 'global');
        $edi = new Acao('Editar', 'edit', route('pedido.manutencao'), 'grid');
        $vis = new Acao('Visualizar', 'show', route('pedido.manutencao'), 'grid');
        $exc = new Acao('Excluir', 'destroy', route('pedido.manutencao'), 'grid');
        $pedidoProduto = new Acao('Produtos', 'consulta', route('pedidoproduto.consulta'), 'grid');

        $this->addAcao($inc, $edi, $vis, $exc, $pedidoProduto);
    }
}