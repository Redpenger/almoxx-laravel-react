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

// rotas para externo
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
Route::get('/grupovariacao/consulta', [\App\Http\Controllers\Consulta\GrupovariacaoConsultaController::class, 'consulta'])->name('grupovariacao.consulta');

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

Route::get('/saida/manutencao', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'manutencao'])->name('saida.manutencao');
Route::post('/saida/manutencao', [\App\Http\Controllers\Manutencao\SaidaManutencaoController::class, 'manutencao'])->name('saida.manutencao');

Route::get('/entrada/manutencao', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'manutencao'])->name('entrada.manutencao');
Route::post('/entrada/manutencao', [\App\Http\Controllers\Manutencao\EntradaManutencaoController::class, 'manutencao'])->name('entrada.manutencao');

Route::get('/grupovariacao/manutencao', [\App\Http\Controllers\Manutencao\GrupovariacaoManutencaoController::class, 'manutencao'])->name('grupovariacao.manutencao');
Route::post('/grupovariacao/manutencao', [\App\Http\Controllers\Manutencao\GrupovariacaoManutencaoController::class, 'manutencao'])->name('grupovariacao.manutencao');


