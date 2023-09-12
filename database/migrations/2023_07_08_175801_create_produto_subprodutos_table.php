<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutoSubprodutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produto_subprodutos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produto_pai_id');
            $table->foreignId('produto_filho_id');
            $table->decimal('quantidade');
            $table->timestamps();

            $table->foreign('produto_pai_id')->references('id')->on('produtos');
            $table->foreign('produto_filho_id')->references('id')->on('produtos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produto_subprodutos');
    }
}
