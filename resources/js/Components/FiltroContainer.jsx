import { Button } from "@mui/material"
import { useEffect } from "react"

export default function FiltroContainer({aplicaFiltros, filtros, telaId, campo, setCampo, operador, setOperador, valor1, setValor1, valor2, setValor2, chave}) {
  
    useEffect(() => {
        let key = Object.keys(filtros)[0]
        if(!campo) {
            setCampo(key)
        } 
        setOperador(filtros[key].operadores[Object.keys(filtros[key].operadores)[0]])
        setValor1('')
        setValor2('')
    }, [campo])

    function limpaFiltros() {
        setValor1('')
        setValor2('')
    }

    return(
        <>
            {filtros && (
                <>
                    <select name="" id="" onChange={(e) => setCampo(e.target.value)} className="w-min pe-10 py-0.5 text-sm rounded-md me-1 ms-0.5">
                        {Object.keys(filtros).map((filtro, index) => (
                            <option key={index} value={filtro}>{filtros[filtro].nome}</option>
                        ))}
                    </select>

                    <select name="" id="" onChange={(e) => setOperador(e.target.value)} className="w-min pe-10 py-0.5 text-sm rounded-md me-1">
                        {campo && Object.keys(filtros[campo].operadores).map((chave, index) => (
                            <option key={index} value={filtros[campo].operadores[chave]}>{chave}</option>
                        ))}
                    </select>

                    <input onChange={(e) => setValor1(e.target.value)} type="text"  className="w-28 pe-10 py-0.5 text-sm rounded-md me-1" value={valor1 ? valor1 : ''}/>
                    <input onChange={(e) => setValor2(e.target.value)} type="text" value={valor2 ? valor2 : ''} className={`${operador != 'BETWEEN' ? 'hidden': ''} w-28 pe-10 py-0.5 text-sm rounded-md me-1`}/>

                    <Button onClick={() => aplicaFiltros(1, chave)} variant="contained" sx={{fontSize: '11px', padding: '3px 10px', marginRight: '4px'}}>Consultar</Button>
                    <Button onClick={limpaFiltros} variant="contained" sx={{fontSize: '11px', padding: '3px 10px'}}>Limpar</Button>
                </>    
            )}
        </>
    )
}