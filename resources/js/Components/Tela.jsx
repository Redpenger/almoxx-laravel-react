import { useContext, useEffect, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import { useSelector } from 'react-redux'

export default function Tela({telaRef}) {
    // const {telas, setTelas} = useContext(TelasContext)
    const telas = useSelector(root => root.TelasReducer)

    return(
        <>
            {Object.keys(telas).map((telaId, index) => (
                <div key={index}> 
                    {telas[telaId].pagina}
                </div>
            ), telas)}
        </>
    )
}