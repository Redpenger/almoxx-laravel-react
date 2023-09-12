import { useEffect } from "react"

export default function SelectOperador({operadores, setOperador, operador, tela}) {
    useEffect(() => {
        setOperador({...operador, [tela.id]: operadores[Object.keys(operadores)[0]]})
    }, [])
    return(
        <select name="operador" onChange={(e) => setOperador({...operador, [tela.id]: e.target.value})} className="border border-black rounded-md bg-gray-100 px-3 me-1 my-2 py-1">
            {Object.keys(operadores).map((operador, index) => (
                <option key={index} value={operadores[operador]}>{operador}</option>
            ))}
        </select>
    )
}