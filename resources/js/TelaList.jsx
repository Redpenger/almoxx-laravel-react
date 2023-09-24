import CategoriaConsulta from "./Pages/Consulta/CategoriaConsulta"
import PedidoConsulta from "./Pages/Consulta/PedidoConsulta"
import ProdutoConsulta from "./Pages/Consulta/ProdutoConsulta"
import ProdutosubprodutoConsulta from "./Pages/Consulta/ProdutosubprodutoConsulta"
import CategoriaManutencao from "./Pages/Manutencao/CategoriaManutencao"
import ProdutoManutencao from "./Pages/Manutencao/ProdutoManutencao"
import ProdutosubprodutoManutencao from "./Pages/Manutencao/ProdutosubprodutoManutencao"

const TelaList = (telaId, props) => {
    switch(telaId) {
        case 'categoriaConsulta':
            return {pagina: <CategoriaConsulta {...props}/>, title: 'Categorias'}
        case 'categoriaManutencao':
            return {pagina: <CategoriaManutencao {...props}/>, title: 'Manutencao de Categoria'}

        case 'produtoConsulta':
            return {pagina: <ProdutoConsulta {...props}/>, title: 'Produtos'}
        case 'produtoManutencao':
            return {pagina: <ProdutoManutencao {...props}/>, title: 'Manutencao de Produto'}

        case 'pedidoConsulta':
            return {pagina: <PedidoConsulta {...props}/>, title: 'Pedidos'}
        
            
        case 'produtosubprodutoConsulta':
            return {pagina: <ProdutosubprodutoConsulta {...props}/>, title: 'Subprodutos'}
        case 'produtosubprodutoManutencao':
            return {pagina: <ProdutosubprodutoManutencao {...props}/>, title: 'Manutenção de Subproduto'}
        
        
    }
}

export default TelaList