import AcaoExcluir from "@/Components/AcaoExcluir"
import AcaoManutencao from "@/Components/AcaoManutencao"
import Janela from "@/Components/Janela"
import TelaConsulta from "@/Components/TelaConsulta"
import { useEffect, useState } from "react"
import useHandleClose from "@/Hooks/useHandleClose"
import { useDispatch, useSelector } from "react-redux"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"

const Url = 'http://127.0.0.1:8000/api/cliente/consulta'

export default function ClienteConsulta({externo, filtro, registrosPorPagina, page}) {
    const TELA_ID = !externo ? 'clienteConsulta' : 'clienteConsulta-externo'
    const reloader = useSelector(root => root.ForceReloadReducer)
    const dispatch = useDispatch()
    const handleClose = useHandleClose(TELA_ID)
    const [tela, setTela] = useState()
    const [loading, setLoading] = useState(true)
    const [registroSelecionado, setRegistroSelecionado] = useState()

    const acoes = [
        {
            el: <AcaoManutencao  acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Incluir', tipo: 'create', acao: 'store', pagina: 'clienteManutencao'}}/>
        },
        {
            el: <AcaoManutencao acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Editar', tipo: 'edit', acao: 'update', pagina: 'clienteManutencao'}}/>
        },
        {
            el: <AcaoExcluir acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Excluir', tipo: 'destroy', acao: 'destroy', pagina: 'clienteConsulta', actionUrl: 'http://127.0.0.1:8000/api/cliente/manutencao'}}/>
        }
    ]

    const filtros = 
        {
            id: {
                nome: 'Código',
                operadores : {
                    igual: '=',
                    maior: '>',
                    menor: '<',
                    entre: 'BETWEEN'
                }
            },
            nome: {
                nome: 'Nome',
                operadores : {
                    igual: '=',
                    contem: 'LIKE',
                }
            }

        }  

    function encodeParams(obj) {
        if(!obj) return ''
        let aParam = []
        Object.keys(obj).map(key => {
            aParam.push(`${key}=${obj[key]}`)
        })
        return aParam.join('&')
    }
 
    useEffect(() => {
        registrosPorPagina = registrosPorPagina ? registrosPorPagina : ''
        page = page ? page : 1
        fetch(Url + '?' + encodeParams(filtro) + `&page=${page}` + `&registrosPorPagina=${registrosPorPagina}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            setTela(data.tela)
        })
        .finally(() => {
            setLoading(false)
        })
        setRegistroSelecionado(null)
    }, [reloader[TELA_ID]])

    return (
        <>
            <Janela ref={el => dispatch({type: TelaRefActionTypes.ADD, payload: {id: TELA_ID, ref: el}})} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Consulta de Clientes'}  
                        id={TELA_ID}  
                        width={document.body.clientWidth}
                        height={document.body.clientHeight - 82 + 'px'}
                        top={'35px'}
                    >

                    <TelaConsulta filtros={filtros} telaId={TELA_ID} externo={externo} acoes={acoes} loading={loading} tela={tela} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado}/>

            </Janela>
                    
                    
            
        </>
    )
}