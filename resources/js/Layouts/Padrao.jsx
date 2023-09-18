import { useRef, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import Header from '@/Components/Header'
import Tela from '@/Components/Tela'
import Footer from '@/Components/Footer'
import ProdutoConsulta from '@/Pages/Consulta/ProdutoConsulta'
import CategoriaConsulta from '@/Pages/Consulta/CategoriaConsulta'
import ClienteConsulta from '@/Pages/Consulta/ClienteConsulta'
import PedidoConsulta from '@/Pages/Consulta/PedidoConsulta'
import ProdutoManutencao from '@/Pages/Manutencao/ProdutoManutencao'
import CategoriaManutencao from '@/Pages/Manutencao/CategoriaManutencao'

export default function Padrao({}) {
    const [telas, setTelas] = useState({})
    const telaRef = useRef({})
    let reloader = 0

    function handleReload(telaId, acao) {
        reloader++
        handleClickLink(null, acao, telaId)
    }

    function handleClickLink(e, acao = null, paginaReload = null) {
        e?.preventDefault()
        if(!paginaReload && e.target.tagName != 'A') return
        let pagina
        let title
        let endereco = e?.target.href.split('/')[3] ?? paginaReload
        switch(endereco) {
            case 'produtoConsulta':
                pagina = <ProdutoConsulta reload={reloader} innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Produtos'
                break
            case 'produtoManutencao':
                pagina = <ProdutoManutencao acao={acao} innerRef={telaRef}  handleClose={handleClose} handleReload={handleReload}/>
                title = 'Manutencao de produto'
                break

            case 'categoriaConsulta':
                pagina = <CategoriaConsulta reload={reloader} innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Categorias'
                break
            case 'categoriaManutencao':
                pagina = <CategoriaManutencao acao={acao} innerRef={telaRef}  handleClose={handleClose} handleReload={handleReload}/>
                title = 'Manutencao de Categoria'
                break
            case 'clienteConsulta':
                pagina = <ClienteConsulta reload={reloader} innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Clientes'
                break
            case 'pedidoConsulta':
                pagina = <PedidoConsulta reload={reloader} innerRef={telaRef}  handleClose={handleClose} />
                title = 'Consulta de Pedidos'
                break
        }
        setTelas(prev => {
            return {
                ...prev,
                [endereco] : {pagina: pagina, title: title}
            }
        })
    }

    function handleClose(telaId) {
        setTelas(prev => {
            delete prev[telaId]
            return {...prev}
        })
    }

    

    return(
        <>
            <TelasContext.Provider value={{telas, setTelas, handleClickLink}} >
                <Header telaRef={telaRef}/>
                <Tela telaRef={telaRef}/>
                <Footer telaRef={telaRef}/>    
            </TelasContext.Provider>
        </>
    )
}