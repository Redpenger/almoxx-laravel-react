import { useContext } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import ProdutoConsulta from '@/Pages/Consulta/ProdutoConsulta'
import CategoriaConsulta from '@/Pages/Consulta/CategoriaConsulta'
import PedidoConsulta from '@/Pages/Consulta/PedidoConsulta'
import ClienteConsulta from '@/Pages/Consulta/ClienteConsulta'

export default function Link({to, children}) {
    const {handleClickLink} = useContext(TelasContext)
    return(
        <a onClick={handleClickLink} href={to}>{children}</a>
    )
}