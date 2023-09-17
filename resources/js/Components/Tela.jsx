import { useContext, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import 'winbox/dist/css/winbox.min.css'; // required

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