import FiltroContainer from "./FiltroContainer";
import AcaoContainer from "./AcaoContainer";
import TableList from "./TableList";
import { useState } from "react";
import TelaList from "@/TelaList";
import TelasActionTypes from "@/Redux/Telas/TelasActionTypes";
import ForceReloadActionTypes from "@/Redux/ForceReload/ForceReloadActionTypes";
import { useDispatch } from "react-redux";
import RoadapeConsulta from "./RodapeConsulta";
import Loading from "./Loading";

export default function TelaConsulta({telaId, externo, acoes, loading, tela, registroSelecionado, setRegistroSelecionado, filtros, chave}) {
    const dispatch = useDispatch()
    const [campo, setCampo] = useState(null)
    const [operador, setOperador] = useState()
    const [valor1, setValor1] = useState('')
    const [valor2, setValor2] = useState('')
    const [registrosPagina, setRegistrosPagina] = useState(30)

    if(loading) {
        return <Loading />
    }

    function aplicaFiltros(page = 1, chave = '') {
        const component = TelaList(telaId, {filtro: {campo: campo, operador: operador, valor1: valor1, valor2: valor2}, registrosPorPagina: registrosPagina, page: page, acao: {chave: chave}})
        const tela = {
            id: telaId,
            pagina: component.pagina,
            title: component.title
        }
        dispatch({
            type: TelasActionTypes.ADD,
            payload: {
                id: telaId,
                tela: tela
            } 
        })
        dispatch({
            type: ForceReloadActionTypes.RELOAD,
            payload: {
                id: telaId
            }
        })
    }

    function aplicaRegistroPorPagina(e) {
        if(e.key == 'Enter') {
            aplicaFiltros()
        }
    }

    function aplicaPagina(e) {
        e.preventDefault()
        let url = new URL(e.target.href)
        let page = url.searchParams.get('page')
        aplicaFiltros(page)
    }
    
    return(
        <div>
            <div className="text-black py-1">
                {filtros && <FiltroContainer chave={chave} aplicaFiltros={aplicaFiltros} filtros={filtros} telaId={telaId} campo={campo} setCampo={setCampo} operador={operador} setOperador={setOperador} valor1={valor1} setValor1={setValor1} valor2={valor2} setValor2={setValor2}/>}
            </div>
            <div className="border-zinc-400 border-b text-black bg-zinc-50">
                <AcaoContainer acoes={acoes}/>
            </div>
            <div className="border-t border-gray-600">
                <TableList telaId={telaId} externo={externo} tela={tela} setRegistroSelecionado={setRegistroSelecionado} registroSelecionado={registroSelecionado}/>
            </div>
            <div>
                <RoadapeConsulta aplicaPagina={aplicaPagina} tela={tela} aplicaRegistroPorPagina={aplicaRegistroPorPagina} registrosPagina={registrosPagina} setRegistrosPagina={setRegistrosPagina}/>
            </div>
        </div>
    )
}