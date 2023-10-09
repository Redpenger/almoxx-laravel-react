import { Button } from "@mui/material"
import React from "react"
import { useState } from "react"

export default function Grid({children}) {
    const [components, setComponents] = useState([])
    console.log(children)
    function handlePlus() {
        setComponents(prev => {
            const el = React.cloneElement(children, {
                ...children.props,
                campoCodigo: `produto_id_${prev.length}`,
                campoNome: `produto_nome_${prev.length}`
            })
            return [
                ...prev,
                <tr id={`tr${prev.length}`}>
                    <td>{el}</td>
                    <td>
                        <button onClick={() => handleMinus(`tr${prev.length}`)} type="button">-</button>
                        <button onClick={handlePlus} type="button">+</button>
                    </td>
                </tr>
            ]
        })
    }

    function handleMinus(trId) {
        let tr = document.getElementById(trId)
        tr.remove()
    }

    return(
        <div className="">
            <table className="w-full">
                <tr>
                    <td>{children}</td>
                    <td>
                        <button type="button">-</button>
                        <button onClick={handlePlus} type="button">+</button>
                    </td>
                </tr>
                {components.map(comp => (
                    <>
                        {comp}
                    </>
                ))}
            </table>
        </div>
    )
}