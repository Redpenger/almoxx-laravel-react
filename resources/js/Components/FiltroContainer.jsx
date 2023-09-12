import { useEffect } from "react"
import SelectOperador from "./SelectOperador"

export default function FiltroContainer({tela, handleReload, campoFiltro, operador, valor1, valor2, setCampoFiltro, setOperador, setValor1, setValor2}) {
    function handleAplicaFiltro() {
        handleReload(tela.id)
    }
    useEffect(() => {
        if(tela.filtros.length > 0) {
            setCampoFiltro({...campoFiltro, [tela.id]: tela.filtros[0].campo.nome})
        }
    }, [])

    return(
        <>
        {tela.filtros.length > 0 && (
            <>
                <select name="campo" onChange={(e) => setCampoFiltro({...campoFiltro, [tela.id]: e.target.value})} className="border border-black rounded-md bg-gray-100 w-40 px-3 mx-1 my-2 py-1">
                    {tela.filtros.map((filtro, index) => (
                        <option key={index} value={filtro.campo.nome}>{filtro.campo.titulo}</option>
                    ))}
                </select>
                {tela.filtros.map((filtro, index) => (
                    <>
                        {filtro.campo.nome == campoFiltro[tela.id] && (
                            <>
                                <SelectOperador key={index} operadores={filtro.operadores} setOperador={setOperador} operador={operador} tela={tela} />
                            </>
                        )}
                    </>
                ))}
                <input onChange={(e) => setValor1({...valor1, [tela.id]: e.target.value})} type="text" value={valor1[tela.id]} name="valor1" className="me-1 rounded-md p-0.5"/>
                <input onChange={(e) => setValor2({...valor2, [tela.id]: e.target.value})} type="text" value={valor2[tela.id]} name="valor2" className={`me-1 rounded-md p-0.5 ${operador[tela.id] != 'BETWEEN' ? 'hidden' : ''}`}/>
                <button onClick={() => handleAplicaFiltro()} className="me-1 border bg-cyan-950 text-white rounded-md p-0.5 px-2 hover:bg-cyan-900">Consultar</button>
                <button className="me-1 border bg-gray-500 text-white rounded-md hover:bg-gray-400 p-0.5 px-2">Limpar</button>
            </>
        )}
            
        </>
    )
}