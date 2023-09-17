<?php 

namespace App\Views\Components;

class Fieldset 
{
    public $components = [];
    public $tipo = 'fieldset';
    public $nome;
    public $titulo;

    public function __construct($nome, $titulo)
    {
        $this->nome = $nome;
        $this->titulo = $titulo;
    }

    public function addComponent(...$components) {
        foreach($components as $component) {
            $this->components[] = $component;
        }
    }


}