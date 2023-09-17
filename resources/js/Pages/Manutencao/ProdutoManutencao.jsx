import Janela from "@/Components/Janela"
import { TelasContext } from "@/Contexts/TelasContext"
import { useContext, useRef } from "react"

const TELA_ID = 'produtoManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/produto/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function ProdutoManutencao({handleClose, innerRef}) {
    const {telas, setTelas} = useContext(TelasContext)
    
    return (
        <Janela ref={el => innerRef.current[TELA_ID] = el} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Manutenção de Produtos'}  
                        id={TELA_ID} 
                        width={'500px'}
                        height={'500px'} 
                        top={'35px'}
                        y={'100px'}
                        x={X_CENTER}
                    >
            fsdfsd
        </Janela>
    )
}