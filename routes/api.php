<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categoria', '\App\Http\Controllers\Consulta\CategoriaConsultaController@categoria')->name('categoria');
Route::get('/produto', '\App\Http\Controllers\Consulta\ProdutoConsultaController@produto')->name('produto');



Route::get('/produto/consulta/externo/{id}', '\App\Http\Controllers\Consulta\ProdutoConsultaController@externo')->name('produto.consulta.externo');
Route::get('/categoria/consulta/externo/{id}', '\App\Http\Controllers\Consulta\CategoriaConsultaController@externo')->name('categoria.consulta.externo');
Route::get('/cliente/consulta/externo/{id}', '\App\Http\Controllers\Consulta\ClienteConsultaController@externo')->name('cliente.consulta.externo');

// rotas de consulta
Route::get('/produto/consulta', '\App\Http\Controllers\Consulta\ProdutoConsultaController@consulta')->name('produto.consulta');
Route::get('/categoria/consulta', '\App\Http\Controllers\Consulta\CategoriaConsultaController@consulta')->name('categoria.consulta');
Route::get('/cliente/consulta', '\App\Http\Controllers\Consulta\ClienteConsultaController@consulta')->name('cliente.consulta');
Route::get('/pedido/consulta', '\App\Http\Controllers\Consulta\PedidoConsultaController@consulta')->name('pedido.consulta');
Route::get('/produtosubproduto/consulta', '\App\Http\Controllers\Consulta\ProdutosubprodutoConsultaController@consulta')->name('produtosubproduto.consulta');
Route::get('/pedidoproduto/consulta', '\App\Http\Controllers\Consulta\PedidoprodutoConsultaController@consulta')->name('pedidoproduto.consulta');
Route::get('/saida/consulta', '\App\Http\Controllers\Consulta\SaidaConsultaController@consulta')->name('saida.consulta');
Route::get('/entrada/consulta', '\App\Http\Controllers\Consulta\EntradaConsultaController@consulta')->name('entrada.consulta');


// rotas de manutenção
Route::get('/categoria/manutencao', [App\Http\Controllers\Manutencao\CategoriaManutencaoController::class, 'manutencao'])->name('categoria.manutencao');
Route::post('/categoria/manutencao', [App\Http\Controllers\Manutencao\CategoriaManutencaoController::class, 'manutencao'])->name('categoria.manutencao');

Route::get('/produto/manutencao', [App\Http\Controllers\Manutencao\ProdutoManutencaoController::class, 'manutencao'])->name('produto.manutencao');
Route::post('/produto/manutencao', [App\Http\Controllers\Manutencao\ProdutoManutencaoController::class, 'manutencao'])->name('produto.manutencao');

Route::get('/produtosubproduto/manutencao', [App\Http\Controllers\Manutencao\ProdutosubprodutoManutencaoController::class, 'manutencao'])->name('produtosubproduto.manutencao');
Route::post('/produtosubproduto/manutencao', [App\Http\Controllers\Manutencao\ProdutosubprodutoManutencaoController::class, 'manutencao'])->name('produtosubproduto.manutencao');

Route::get('/cliente/manutencao', [\App\Http\Controllers\Manutencao\ClienteManutencaoController::class, 'manutencao'])->name('cliente.manutencao');
Route::post('/cliente/manutencao', [\App\Http\Controllers\Manutencao\ClienteManutencaoController::class, 'manutencao'])->name('cliente.manutencao');


Route::get('/pedido/manutencao', [\App\Http\Controllers\Manutencao\PedidoManutencaoController::class, 'manutencao'])->name('pedido.manutencao');
Route::post('/pedido/manutencao', [\App\Http\Controllers\Manutencao\PedidoManutencaoController::class, 'manutencao'])->name('pedido.manutencao');

Route::get('/pedidoproduto/manutencao', [\App\Http\Controllers\Manutencao\PedidoprodutoManutencaoController::class, 'manutencao'])->name('pedidoproduto.manutencao');
Route::post('/pedidoproduto/manutencao', [\App\Http\Controllers\Manutencao\PedidoprodutoManutencaoController::class, 'manutencao'])->name('pedidoproduto.manutencao');

Route::get('/saida/manutencao/create', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'create'])->name('saida.manutencao.create');
Route::get('/saida/manutencao/edit', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'edit'])->name('saida.manutencao.edit');
Route::get('/saida/manutencao/show', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'show'])->name('saida.manutencao.show');
Route::get('/saida/manutencao/destroy', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'destroy'])->name('saida.manutencao.destroy');
Route::post('/saida/manutencao/store', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'store'])->name('saida.manutencao.store');
Route::post('/saida/manutencao/update', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'update'])->name('saida.manutencao.update');

Route::get('/entrada/manutencao/create', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'create'])->name('entrada.manutencao.create');
Route::get('/entrada/manutencao/edit', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'edit'])->name('entrada.manutencao.edit');
Route::get('/entrada/manutencao/show', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'show'])->name('entrada.manutencao.show');
Route::get('/entrada/manutencao/destroy', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'destroy'])->name('entrada.manutencao.destroy');
Route::post('/entrada/manutencao/store', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'store'])->name('entrada.manutencao.store');
Route::post('/entrada/manutencao/update', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'update'])->name('entrada.manutencao.update');


