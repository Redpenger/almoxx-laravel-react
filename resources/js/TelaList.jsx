import CategoriaConsulta from "./Pages/Consulta/CategoriaConsulta"
import ProdutoConsulta from "./Pages/Consulta/ProdutoConsulta"
import CategoriaManutencao from "./Pages/Manutencao/CategoriaManutencao"
import ProdutoManutencao from "./Pages/Manutencao/ProdutoManutencao"

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
    }
}

export default TelaList