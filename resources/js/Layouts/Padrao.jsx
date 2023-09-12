import { useRef, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import Header from '@/Components/Header'
import Tela from '@/Components/Tela'
import Footer from '@/Components/Footer'

export default function Padrao() {
    const [telas, setTelas] = useState({})
    const telaRef = useRef({})

    return(
        <>
            <TelasContext.Provider value={{telas, setTelas, telaRef}} >
                <Header/>
                <Tela telaRef={telaRef}/>
                <Footer telaRef={telaRef}/>    
            </TelasContext.Provider>
        </>
    )
}