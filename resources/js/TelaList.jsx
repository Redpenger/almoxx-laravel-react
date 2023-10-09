import CategoriaConsulta from "./Pages/Consulta/CategoriaConsulta"
import ClienteConsulta from "./Pages/Consulta/ClienteConsulta"
import PedidoConsulta from "./Pages/Consulta/PedidoConsulta"
import ProdutoConsulta from "./Pages/Consulta/ProdutoConsulta"
import ProdutosubprodutoConsulta from "./Pages/Consulta/ProdutosubprodutoConsulta"
import VariacaoprodutoConsulta from "./Pages/Consulta/VariacaoprodutoConsulta"
import CategoriaManutencao from "./Pages/Manutencao/CategoriaManutencao"
import ClienteManutencao from "./Pages/Manutencao/ClienteManutencao"
import PedidoManutencao from "./Pages/Manutencao/PedidoManutencao"
import ProdutoManutencao from "./Pages/Manutencao/ProdutoManutencao"
import ProdutosubprodutoManutencao from "./Pages/Manutencao/ProdutosubprodutoManutencao"
import VariacaoprodutoManutencao from "./Pages/Manutencao/VariacaoprodutoManutencao"

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
        case 'pedidoManutencao':
            return {pagina: <PedidoManutencao {...props}/>, title: 'Manutenção de Pedido'}
            
        case 'produtosubprodutoConsulta':
            return {pagina: <ProdutosubprodutoConsulta {...props}/>, title: 'Subprodutos'}
        case 'produtosubprodutoManutencao':
            return {pagina: <ProdutosubprodutoManutencao {...props}/>, title: 'Manutenção de Subproduto'}
        
        case 'clienteConsulta':
            return {pagina: <ClienteConsulta {...props}/>, title: 'Clientes'}
        case 'clienteManutencao':
            return {pagina: <ClienteManutencao {...props}/>, title: 'Manutenção de Cliente'}
        
        case 'variacaoprodutoConsulta':
            return {pagina: <VariacaoprodutoConsulta {...props}/>, title: 'Variações'}
        case 'variacaoprodutoManutencao':
            return {pagina: <VariacaoprodutoManutencao {...props}/>, title: 'Manutenção de Variação'}
        
    }
}

export default TelaList