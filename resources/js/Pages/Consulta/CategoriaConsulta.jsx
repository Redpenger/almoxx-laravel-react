import Janela from "@/Components/Janela"
import TelaConsulta from "@/Components/TelaConsulta"
import { TelasContext } from "@/Contexts/TelasContext"
import { useContext, useEffect, useState } from "react"

const TELA_ID = 'categoriaConsulta'
const URL = 'http://127.0.0.1:8000/api/categoria/consulta'
const acoes = [
    {
        nome: 'Incluir',
        tipo: 'create',
        acao: 'store',
        pagina: 'categoriaManutencao'
    },
    {
        nome: 'Editar',
        tipo: 'edit',
        acao: 'update',
        pagina: 'categoriaManutencao'
    }
]

export default function CategoriaConsulta({handleClose, innerRef, reload}) {
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
    }, [reload])

    return (
        <>
            <Janela ref={el => innerRef.current[TELA_ID] = el} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Consulta de Categorias'}  
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