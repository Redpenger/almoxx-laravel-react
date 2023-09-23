<?php

namespace App\Http\Controllers\Consulta;

use App\Http\Controllers\Controller;
use App\Views\Consulta\ProdutoConsultaView;
use Illuminate\Http\Request;

class ConsultaController extends Controller
{
    public function consulta(Request $request) {
        return $this->criaTela();
    }

    protected function criaTela() {
        return response()->json([
            'tela' => [
                'request'   => request()->all(),
                'id'        => $this->getId(),
                'chave'     => request()->get('chave'),
                'nome'      => $this->getNome(),
                'width'     => $this->getTamX(),
                'url'       => $this->getUrl(),
                'height'    => $this->getTamY(),
                'tipo'      => 'consulta',
                'campos'    => $this->getView()->getCampos(),
                'acoes'     => $this->getView()->getAcoes(),
                'registros' => $this->getRegistros(),
                'campoExterno' => request()->get('campoExterno'),
                'filtros'     => $this->getView()->getFiltros(),
            ]
        ]);
    }

    protected function getView() {
        return new ProdutoConsultaView();
    }

    protected function getTamX() {
        return '100%';
    }

    protected function getTamY() {
        return '100%';
    }

    protected function getModel() {
        $model = $this->getModelRegistros();
        return new $model;
    }

    /**
     * Get de Id for the window
     */
    protected function getId() {
        $parts = $this->splitCamelCase(get_called_class());
        array_pop($parts);
        $id = strtolower(implode('-', $parts));
        if(request()->get('externo') == 'true') {
            $id .= '-externo';
        }   
        return $id; 
    }

    /**
     * Get the name of the window
     */
    protected function getNome() {
        $parts = $this->splitCamelCase(get_called_class());
        array_pop($parts);
        return implode(' de ', array_reverse($parts));
    }

    /**
     * Get url of the window
     */
    protected function getUrl() {
        return request()->url();
    }

    protected function getModelFiltrado() {
        $filtroNome     = request()->get('campo');
        $filtroOperador = request()->get('operador');
        $filtroValor1   = request()->get('valor1');
        $filtroValor2   = request()->get('valor2');

        $model = $this->getModelRegistros();
        $model = new $model;
        $model = $model->query();
        if(request()->get('chave') && request()->get('chave') != 'null') {
            $model = $model->where($this->getColumnChave(), request()->get('chave'));
        }
        if(count(explode('.', $filtroNome)) > 1 && $filtroValor1 != null) {
            switch ($filtroOperador) {
                case 'LIKE':
                    $model = $model->whereRelation(explode('.', $filtroNome)[0], 'nome', $filtroOperador, "%$filtroValor1%");
                    break;
                default:
                $model = $model->whereRelation(explode('.', $filtroNome)[0], 'nome', $filtroOperador, $filtroValor1);
                    break;
            }  
        } else {
            if($filtroNome && $filtroValor1 != null) {
                switch ($filtroOperador) {
                    case 'BETWEEN':
                        $model = $model->whereBetween($filtroNome, [$filtroValor1, $filtroValor2]);
                        break;
                    case 'LIKE':
                        $model = $model->where($filtroNome, $filtroOperador, "%$filtroValor1%");
                        break;
                    default:
                        $model = $model->where($filtroNome, $filtroOperador, $filtroValor1);
                        break;
                }  
            } 
        }
        return $model;
    }   

    protected function getRegistros() {
        return $this->getModelFiltrado()->paginate($this->getPagination());
    }

    public function getColumnChave() {
        return 'id';
    }

    protected function getPagination() {
        return request()->get('registrosPorPagina', 30);
    }

    protected function getModelRegistros() {
        $parts = $this->splitCamelCase(get_called_class());
        return "App\Models\\" . $parts[0];
    }

    private function splitCamelCase($word) {
        $word = explode('\\', $word);
        $word = array_pop($word);
        $pattern = '/(?<=[a-z])(?=[A-Z])/'; // Expressão regular para encontrar o ponto de separação
        $parts = preg_split($pattern, $word);
        return $parts;
    }
}
