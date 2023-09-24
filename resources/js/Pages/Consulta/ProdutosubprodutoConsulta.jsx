import AcaoExcluir from "@/Components/AcaoExcluir"
import AcaoManutencao from "@/Components/AcaoManutencao"
import Janela from "@/Components/Janela"
import TelaConsulta from "@/Components/TelaConsulta"
import useHandleClose from "@/Hooks/useHandleClose"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Url = 'http://127.0.0.1:8000/api/produtosubproduto/consulta'

export default function ProdutoConsulta({externo, filtro, registrosPorPagina, page, acao}) {
    const TELA_ID = !externo ? 'produtosubprodutoConsulta' : 'produtosubprodutoConsulta-externo'
    const dispatch = useDispatch()
    const reloader = useSelector(root => root.ForceReloadReducer)
    const handleClose = useHandleClose(TELA_ID)
    const [tela, setTela] = useState()
    const [loading, setLoading] = useState(true)
    const [registroSelecionado, setRegistroSelecionado] = useState()

    const acoes = [
        {
            el: <AcaoManutencao acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Incluir', tipo: 'create', acao: 'store', pagina: 'produtosubprodutoManutencao'}}/>
        },
        {
            el: <AcaoManutencao acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Editar', tipo: 'edit', acao: 'update', pagina: 'produtosubprodutoManutencao'}}/>
        },
        {
            el: <AcaoExcluir acao={{telaPai: TELA_ID, chave: registroSelecionado , nome: 'Excluir', tipo: 'destroy', acao: 'destroy', pagina: 'produtosubprodutoConsulta', actionUrl: 'http://127.0.0.1:8000/api/produtosubproduto/manutencao'}}/>
        }
    ]

    const filtros = 
        {
            quantidade: {
                nome: 'Quantidade',
                operadores : {
                    igual: '=',
                    maior: '>',
                    menor: '<',
                    entre: 'BETWEEN'
                }
            },
            Produto: {
                nome: 'Produto',
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
        let chave = acao?.chave ? acao.chave : ''
        fetch(Url + '?' + encodeParams(filtro) + `&chave=${chave}` + `&page=${page}` + `&registrosPorPagina=${registrosPorPagina}`, {
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
                        title={'Consulta de Subprodutos'}  
                        id={TELA_ID}  
                        width={document.body.clientWidth}
                        height={document.body.clientHeight - 82 + 'px'}
                        top={'35px'}
                    >
                    <TelaConsulta telaId={TELA_ID} filtros={filtros} acoes={acoes} loading={loading} tela={tela} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado}/>
                </Janela>
                
        </>
    )
}