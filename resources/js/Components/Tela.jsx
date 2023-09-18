import { useContext, useEffect, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'

export default function Tela({telaRef}) {
    const {telas, setTelas} = useContext(TelasContext)

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