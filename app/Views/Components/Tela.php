<?php 

namespace App\Views\Components;

class Tela {

    protected $components = [];
    protected $actions    = [];


    public function getCampos() {
        return $this->components;
    }

    public function getAcoes() {
        return $this->actions;
    }

    public function getFiltros() {
        $filtros = [];
        foreach($this->getCampos() as $campo) {
            if(!$campo->filtro) {
                continue;
            }
            $filtros[] = new FiltroConsulta($campo, $this->getOperadoresFiltro($campo));
        }
        return $filtros;
    }

    private function getOperadoresFiltro($campo) {
        switch ($campo->tipo) {
            case 'text':
                return [
                    'Contem' => 'LIKE',    
                    'Igual' => '=',
                ];
            case 'number':
                return [
                    'Igual' => '=',
                    'Maior' => '>',
                    'Menor' => '<',
                    'Entre' => 'BETWEEN',
                ];
            
            default:
                return [
                    'Contem' => 'LIKE',
                    'Igual' => '=',
                ];
        }
    }

}