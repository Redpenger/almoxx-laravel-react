import { useEffect, useRef, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import Header from '@/Components/Header'
import Tela from '@/Components/Tela'
import Footer from '@/Components/Footer'
import ProdutoConsulta from '@/Pages/Consulta/ProdutoConsulta'
import CategoriaConsulta from '@/Pages/Consulta/CategoriaConsulta'
import ClienteConsulta from '@/Pages/Consulta/ClienteConsulta'
import PedidoConsulta from '@/Pages/Consulta/PedidoConsulta'
import ProdutoManutencao from '@/Pages/Manutencao/ProdutoManutencao'

export default function Padrao({}) {
    const [telas, setTelas] = useState({})
    const telaRef = useRef({})
    const [janelas, setJanelas] = useState({})

    function handleClickLink(e) {
        e.preventDefault()
        if(e.target.tagName != 'A') return
        let pagina
        let title
        let endereco = e.target.href.split('/')[3]
        switch(endereco) {
            case 'produtoConsulta':
                pagina = <ProdutoConsulta innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Produtos'
                break
            case 'produtoManutencao':
                pagina = <ProdutoManutencao  innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Manutencao de produtos'
                break
            case 'categoriaConsulta':
                pagina = <CategoriaConsulta  innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Categorias'
                break
            case 'clienteConsulta':
                pagina = <ClienteConsulta  innerRef={telaRef}  handleClose={handleClose}/>
                title = 'Consulta de Clientes'
                break
            case 'pedidoConsulta':
                pagina = <PedidoConsulta  innerRef={telaRef}  handleClose={handleClose} />
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
            <TelasContext.Provider value={{telas, setTelas, handleClickLink, janelas, setJanelas}} >
                <Header telaRef={telaRef}/>
                <Tela telaRef={telaRef}/>
                <Footer telaRef={telaRef}/>    
            </TelasContext.Provider>
        </>
    )
}