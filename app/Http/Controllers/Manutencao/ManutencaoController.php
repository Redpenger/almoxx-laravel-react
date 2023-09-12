<?php

namespace App\Http\Controllers\Manutencao;

use App\Http\Controllers\Controller;
use App\Views\Manutencao\ManutencaoView;
use Illuminate\Http\Request;

class ManutencaoController extends Controller
{   
    protected $acao;
    protected $nome;
    protected $Model;
    protected $acaoEnvio;

    public function __construct()
    {
        $this->Model = $this->getModel();
    }

    public function manutencao(Request $request) {
        switch($request->get('acao')) {
            case 'create':
                $this->setAcaoEnvio('store');
                return $this->create($request);
            case 'edit':
                $this->setAcaoEnvio('update');
                return $this->edit($request);
            case 'show':
                return $this->show($request);
            case 'store':
                return $this->store($request);
            case 'update':
                return $this->update($request);
            case 'destroy':
                return $this->destroy($request);
        }
    }

    /**
     * Recupera o modelo do registro a ser trabalhado
     */
    protected function getModel() {
        $model = $this->getModelRegistros();
        return new $model;
    }

    /**
     * Seta a ação a ser passada para a view
     */
    public function setAcao($acao) {
        $this->acao = $acao;
    }

    /**
     * Seta o nome a ser passado para a view
     */
    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function setAcaoEnvio($actionRoute) {
        $this->acaoEnvio = $actionRoute;
    }

    public function getAcaoEnvio() {
        return $this->acaoEnvio;
    }
    
    /**
     * Endpoint de criação, abre a tela de manutenção de criação
     */
    public function create(Request $request) {
        $this->setNome('Incluir');
        return $this->criaTela();
    }

    /**
     * Endpoint de edição, abre a tela de manutenção de edição
     */
    public function edit() {
        $this->setNome('Editar');
        return $this->criaTela();
    }

    /**
     * Endpoint de visualização, abre a tela de manutenção de visualização
     */
    public function show() {
        $this->setNome('Visualizar');
        return $this->criaTela();
    }

    /**
     * Endpoint para guardar os dados da tela de criação
     */
    public function store(Request $request) {
        $this->Model->create($request->all());
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro cadastrado com sucesso'
        ], 200);
    }

    /**
     * Endpoint para salvar os dados da tela de edição
     */
    public function update(Request $request) {
        $this->Model = $this->Model->find($request->id);
        $this->Model->update($request->all());
        return response()->json([
            'janela' => $request->janela,
            'mensagem' => 'Registro alterado com sucesso'
        ]);
    }

    /**
     * Endpoint para exclusão de registro
     */
    public function destroy(Request $request) {
        $this->Model = $this->Model->find($request->chave);
        $this->Model->delete();
        return response()->json([
            'janelaPai' => $request->telaPai,
            'mensagem' => 'Registro excluido com sucesso'
        ]);
    }

    /**
     * Cria a tela de manutenção
     */
    protected function criaTela() {
        $view = $this->getView();
        $this->loadRegistro($view);
        return $this->getResponse($view);
    }
    protected function loadRegistro($view) {
        if(request()->get('acao') == 'create') {
            return;
        }
        $view->loadRegistro($this->getRegistro());
    }

    protected function getResponse($view) {
        return response()->json([
            'tela' => [
                'id'        => $this->getId(),
                'nome'      => $this->getNome(),
                'chave'     => request()->get('chave'),
                'telaPai'   => request()->get('telaPai'),
                'url'       => $this->getUrl(),
                'width'     => $this->getTamX(),
                'height'    => $this->getTamY(),
                'tipo'      => 'manutencao',
                'campos'    => $view->getCampos(),
                'acaoEnvio' => $this->getAcaoEnvio(),
                'actionForm' => route(strtolower($this->splitCamelCase(get_called_class())[0]) . '.' . 'manutencao'),
            ]
        ]);
    }

    /**
     * Tamanho horizontal da tela
     */
    protected function getTamX() {
        return '50%';
    }

    /**
     * Tamanha vertical de tela
     */
    protected function getTamY() {
        return '70%';
    }

    /**
     * Get de Id for the window
     */
    protected function getId() {
        $parts = explode('/', request()->url());
        $parts = array_slice($parts, 4);
        return implode('-', $parts) . strtolower(implode('-', explode(' ', $this->getNome())));    
    }

    /**
     * Get the name of the window
     */
    protected function getNome() {
        if($this->nome) {
            return $this->nome;
        }
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

    protected function getView() {
        return new ManutencaoView();
    }

    /**
     * Registro para manutenção
     */
    protected function getRegistro() {
        $registro = request()->get('chave');
        $model = $this->getModelRegistros();
        $model = new $model;
        return $model->find($registro);    
    }

    /**
     * Modelo compatível com o registro
     */
    private function getModelRegistros() {
        $parts = $this->splitCamelCase(get_called_class());
        return "App\Models\\" . $parts[0];
    }

    /**
     * Separa a palavra camel case
     */
    protected function splitCamelCase($word) {
        $word = explode('\\', $word);
        $word = array_pop($word);
        $pattern = '/(?<=[a-z])(?=[A-Z])/'; // Expressão regular para encontrar o ponto de separação
        $parts = preg_split($pattern, $word);
        return $parts;
    }
}
