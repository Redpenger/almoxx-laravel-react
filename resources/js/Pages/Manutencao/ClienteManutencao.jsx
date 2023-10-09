import ErrorContainer from "@/Components/ErrorContainer"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import useHandleClose from "@/Hooks/useHandleClose"
import useSubmitForm from "@/Hooks/useSubmitForm"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TELA_ID = 'clienteManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/cliente/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function ClienteManutencao({acao}) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const handleClose = useHandleClose(TELA_ID)
    const [errors, setErrors] = useState(null)
    const callSubmit = useSubmitForm(URL, TELA_ID, acao.telaPai, setErrors)
    
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
                        onClose={handleClose}
                        title={'Manutenção de Cliente'}  
                        id={TELA_ID} 
                        width={TELA_WIDTH}
                        height={'500px'} 
                        top={'35px'}
                        y={'100px'}
                        x={X_CENTER}
                        rodape={<RodapeManutencao handleSubmit={handleSubmit} />}
                    >
            <ErrorContainer errors={errors}/>
            <form id={`form-${TELA_ID}`}>
                <input type="hidden" name="acao" defaultValue={acao.acao} />
                <input type="hidden" name="id" value={form.id}/>
                <div className="mb-2 px-4 py-1 text-black">
                    <label htmlFor="nome" className="block mb-2 text-sm text-gray-900 font-bold">Nome</label>
                    <input onChange={handleChange} value={form.nome} type="text" id="nome" name="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="categoria" required/>
                </div>
                <div className="mb-2 px-4 text-black">
                    <label htmlFor="nome" className="block mb-2 text-sm text-gray-900 font-bold">Endereço</label>
                    <input onChange={handleChange} value={form.endereco} type="text" id="nome" name="endereco" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="categoria" required/>
                </div>
                <div className="mb-2 px-4 text-black">
                    <label htmlFor="nome" className="block mb-2 text-sm text-gray-900 font-bold">Telefone</label>
                    <input onChange={handleChange} value={form.telefone} type="text" id="nome" name="telefone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="categoria" required/>
                </div>
            </form>


        </Janela>
    )
}