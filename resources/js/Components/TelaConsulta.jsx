import { useEffect } from "react"
import FiltroContainer from "./FiltroContainer";
import AcaoContainer from "./AcaoContainer";
import TableList from "./TableList";

export default function TelaConsulta({acoes, loading, tela, handleClose, handleReload, registroSelecionado, setRegistroSelecionado, registroPorPagina, setRegistroPorPagina, campoFiltro, operador, valor1, valor2, setCampoFiltro, setOperador, setValor1, setValor2}) {
    
    if(loading) {
        return "carregando..."
    }
    return(
        <>
            {/* <div className="text-black">
                <FiltroContainer tela={tela} handleReload={handleReload} campoFiltro={campoFiltro} operador={operador} setCampoFiltro={setCampoFiltro} setOperador={setOperador} setValor1={setValor1} setValor2={setValor2} valor1={valor1} valor2={valor2} />
            </div> */}
            <div className="border-zinc-400 border-b text-black bg-zinc-50">
                <AcaoContainer handleClose={handleClose} acoes={acoes}/>
            </div>
            <div className="border-t border-gray-600">
                <TableList handleClose={handleClose} tela={tela} setRegistroSelecionado={setRegistroSelecionado} registroSelecionado={registroSelecionado}/>
            </div>
            
        </>
    )
}