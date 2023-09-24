import ErrorContainer from "@/Components/ErrorContainer"
import Externo from "@/Components/Form/Externo"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import useHandleClose from "@/Hooks/useHandleClose"
import useSubmitForm from "@/Hooks/useSubmitForm"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TELA_PAI = 'produtosubprodutoConsulta'
const TELA_ID = 'produtosubprodutoManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/produtosubproduto/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function ProdutosubprodutoManutencao({acao}) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const handleClose = useHandleClose(TELA_ID)
    const [errors, setErrors] = useState(null)
    const callSubmit = useSubmitForm(URL, TELA_ID, TELA_PAI, setErrors)

    useEffect(() => {
        if(acao.tipo != 'edit') return
        let url = URL + `?chave=${acao.chave}&acao=show`
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            setForm(data.registro)
            console.log(data.registro)
        })
    }, [])

    function handleSubmit() {
        callSubmit()
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <Janela ref={el => dispatch({type: TelaRefActionTypes.ADD, payload: {id: TELA_ID, ref: el}})} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Manutenção de Subproduto'}  
                        id={TELA_ID} 
                        width={'500px'}
                        height={'500px'} 
                        top={'35px'}
                        y={'100px'}
                        x={X_CENTER}
                        rodape={<RodapeManutencao handleSubmit={handleSubmit} />}
                    >
            <ErrorContainer errors={errors}/>
            <form id={`form-${TELA_ID}`}>
                <input type="hidden" name="acao" defaultValue={acao.acao} />
                <input type="hidden" name="id" value={form.id} />
                <div className="px-5 mt-2 text-black">
                    <Externo handleChange={handleChange} form={form} setForm={setForm} title="Produto Pai" campoCodigo="produto_pai_id" campoNome="produto_pai" paginaExterno="produtoConsulta" />
                </div>
                <div className="px-5 mt-2 text-black">
                    <Externo handleChange={handleChange} form={form} setForm={setForm} title="Subproduto" campoCodigo="produto_filho_id" campoNome="produto_filho" paginaExterno="produtoConsulta" />
                </div>
                <div className="mb-6 p-5 text-black">
                    <label htmlFor="quantidade" className="block mb-2 text-sm text-gray-900 font-bold">Quantidade</label>
                    <input onChange={handleChange} value={form.quantidade} type="number" id="quantidade" name="quantidade" className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" required/>
                </div>
            </form>
        </Janela>
    )
}