import { useEffect } from "react"
import FiltroContainer from "./FiltroContainer";
import AcaoContainer from "./AcaoContainer";
import TableList from "./TableList";

export default function TelaConsulta({acoes, loading, tela, handleClose, handleReload, registroSelecionado, setRegistroSelecionado, registroPorPagina, setRegistroPorPagina, campoFiltro, operador, valor1, valor2, setCampoFiltro, setOperador, setValor1, setValor2}) {
    
    useEffect(() => {
        // setRegistroPorPagina({...registroPorPagina, [tela.id]: 30})
    }, [])

    function handleAplicaRegistroPorPagina(e) {
        if(e.key == 'Enter') {
            handleReload(tela.id)
        }
    }

    function handlePage(page) {
        let p = page;
        if(page == 'anterior') {
            if(tela.registros.current_page == 1) return
            p = tela.registros.current_page - 1
        } else if(page == 'proximo') {
            if(tela.registros.current_page == tela.registros.last_page) return
            p = tela.registros.current_page + 1
        }
        handleReload(tela.id, p)
    }
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
            {/* <div className="text-white bottom-0 absolute w-full bg-sky-500 flex text-sm">
                <div className="mx-3 mt-0.5">Registros: {tela.registros.total}</div>
                <div className="mx-3">
                    Registros por Página:
                    <input onKeyDown={(e) => handleAplicaRegistroPorPagina(e)} onChange={(e) => setRegistroPorPagina({...registroPorPagina, [tela.id]: e.target.value})} type="number" className="p-0 mx-2 my-0.5 rounded-md w-20 h-5 text-black" value={registroPorPagina[tela.id]}/>
                </div>
                <div className="py-0.5">
                    <nav>
                        <ul className="inline-flex  text-xs">
                            <li>
                                <span onClick={() => handlePage('anterior')} className="flex items-center cursor-pointer justify-center px-3 h-5 ml-0 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Anterior</span>
                            </li>
                            {Array(tela.registros.last_page).fill(0).map((link, index) => (
                                <div key={index}>
                                    <li><span onClick={() => handlePage(index + 1)} className={`${tela.registros.current_page == index + 1 ? 'bg-sky-600 text-white hover:bg-sky-700': 'cursor-pointer bg-white hover:bg-gray-100 hover:text-gray-700'} flex items-center justify-center px-3 h-5 text-gray-500  border border-gray-300 `}>{index + 1}</span></li>
                                </div>
                            ))}
                            <li>
                                <span onClick={() => handlePage('proximo')} className="flex cursor-pointer items-center justify-center px-3 h-5 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Próximo</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div> */}
        </>
    )
}