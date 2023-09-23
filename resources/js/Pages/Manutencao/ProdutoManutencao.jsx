import ErrorContainer from "@/Components/ErrorContainer"
import Externo from "@/Components/Form/Externo"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import useHandleClose from "@/Hooks/useHandleClose"
import useSubmitForm from "@/Hooks/useSubmitForm"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TELA_PAI = 'produtoConsulta'
const TELA_ID = 'produtoManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/produto/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function ProdutoManutencao({acao}) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const handleClose = useHandleClose(TELA_ID)
    const [errors, setErrors] = useState(null)
    const callSubmit = useSubmitForm(URL, TELA_ID, TELA_PAI, setErrors)

    useEffect(() => {
        if(acao.tipo != 'edit') return
        let url = URL + `?chave=${acao.chave}&acao=show`
        console.log(url)
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
                        title={'Manutenção de Produtos'}  
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
                    <label htmlFor="nome" className="block mb-2 text-sm text-gray-900 font-bold">Nome</label>
                    <input value={form.nome} onChange={handleChange} type="text" id="nome" name="nome" className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                </div>
                <div className="px-5 mt-2 text-black">
                    <Externo handleChange={handleChange} form={form} setForm={setForm} title="Categoria" campoCodigo="categoria_id" campoNome="categoria" paginaExterno="categoriaConsulta" />
                </div>
            </form>
        </Janela>
    )
}