import AcaoExcluir from "@/Components/AcaoExcluir"
import AcaoManutencao from "@/Components/AcaoManutencao"
import Janela from "@/Components/Janela"
import TelaConsulta from "@/Components/TelaConsulta"
import { TelasContext } from "@/Contexts/TelasContext"
import useHandleClose from "@/Hooks/useHandleClose"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const TELA_ID = 'pedidoConsulta'
const Url = 'http://127.0.0.1:8000/api/pedido/consulta'
const acoes = [ ]

export default function PedidoConsulta({externo, filtro, registrosPorPagina, page}) {
    const TELA_ID = !externo ? 'pedidoConsulta' : 'pedidoConsulta-externo'
    const dispatch = useDispatch()
    const reloader = useSelector(root => root.ForceReloadReducer)
    const handleClose = useHandleClose(TELA_ID)
    const [tela, setTela] = useState()
    const [loading, setLoading] = useState(true)
    const [registroSelecionado, setRegistroSelecionado] = useState()

    const acoes = [
        {
            el: <AcaoManutencao acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Incluir', tipo: 'create', acao: 'store', pagina: 'pedidoManutencao'}}/>
        },
        {
            el: <AcaoManutencao acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Editar', tipo: 'edit', acao: 'update', pagina: 'pedidoManutencao'}}/>
        },
        {
            el: <AcaoExcluir acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Excluir', tipo: 'destroy', acao: 'destroy', pagina: 'pedidoConsulta', actionUrl: 'http://127.0.0.1:8000/api/produto/manutencao'}}/>
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
            'cliente.nome': {
                nome: 'Cliente',
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
                    title={'Consulta de Pedidos'}  
                    id={TELA_ID}  
                    width={document.body.clientWidth}
                    height={document.body.clientHeight - 82 + 'px'}
                    top={'35px'}
                    >
                    <TelaConsulta telaId={TELA_ID} filtros={filtros} acoes={acoes} loading={loading} tela={tela} handleClose={handleClose} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado}/>
            </Janela>
                    
                    
                
        </>
    )
}