import TelaConsulta from "@/Components/TelaConsulta"
import { TelasContext } from "@/Contexts/TelasContext"
import { useContext, useEffect, useState } from "react"
import WinBox from "react-winbox"

const TELA_ID = 'pedidoConsulta'
const URL = 'http://127.0.0.1:8000/api/pedido/consulta'

export default function PedidoConsulta({handleClose}) {
    const {telas, setTelas, telaRef} = useContext(TelasContext)
    const [tela, setTela] = useState()
    const [loading, setLoading] = useState(true)
    const [registroSelecionado, setRegistroSelecionado] = useState()

    useEffect(() => {
        fetch(URL, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            setTela(data.tela)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <WinBox 
                    ref={el => telaRef.current[TELA_ID] = el}
                    noShadow={true}
                    noFull={true}
                    id={TELA_ID}
                    title={'Consulta de Pedidos'}
                    width={'100%'}
                    height={'100%'}                    
                    top="36"
                    bottom="46"
                    maxWidth={document.body.clientWidth}
                    maxHeight="668"
                    background='#03A9F4'
                    border="2"
                    // onMinimize={() => handleMinimize(telaId)}
                    onClose={() => handleClose(TELA_ID)}
                >
                    
                    <TelaConsulta loading={loading} tela={tela} handleClose={handleClose} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado}/>
                    
                </WinBox>
        </>
    )
}