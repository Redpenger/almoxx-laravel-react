import Janela from "@/Components/Janela"
import TelaConsulta from "@/Components/TelaConsulta"
import { TelasContext } from "@/Contexts/TelasContext"
import { useContext, useEffect, useState } from "react"

const TELA_ID = 'produtoConsulta'
const URL = 'http://127.0.0.1:8000/api/produto/consulta'
const acoes = [
    {
        nome: 'Incluir',
        tipo: 'create',
        acao: 'store',
        pagina: 'produtoManutencao',
        toggler: 'Incluir Produto'
    },
    {
        nome: 'editar',
        tipo: 'edit',
        acao: 'update',
        pagina: 'produtoManutencao',
        toggler: 'Editar Produto'
    }
]

export default function ProdutoConsulta({handleClose, innerRef}) {
    const {telas, setTelas} = useContext(TelasContext)
    const [tela, setTela] = useState()
    const [loading, setLoading] = useState(true)
    const [registroSelecionado, setRegistroSelecionado] = useState()

    useEffect(() => {
        console.log('effect..')
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
                <Janela ref={el => innerRef.current[TELA_ID] = el} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Consulta de Produtos'}  
                        id={TELA_ID}  
                        width={document.body.clientWidth}
                        height={document.body.clientHeight - 82 + 'px'}
                        top={'35px'}
                    >
                    <TelaConsulta acoes={acoes} loading={loading} tela={tela} handleClose={handleClose} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado}/>
                </Janela>
        </>
    )
}