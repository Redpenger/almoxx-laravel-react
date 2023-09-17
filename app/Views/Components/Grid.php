<?php 

namespace App\Views\Components;

class Grid 
{
    public $components = [];
    public $tipo = 'grid';
    public $nome;
    public $flexDirection;

    public function __construct($nome)
    {
        $this->nome = $nome;
    }

    public function flex($status) {
        $this->flexDirection = $status;
    }

    public function addComponent(...$components) {
        foreach($components as $component) {
            $this->components[] = $component;
        }
    }


}