import ErrorContainer from "@/Components/ErrorContainer"
import Externo from "@/Components/Form/Externo"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import useHandleClose from "@/Hooks/useHandleClose"
import useSubmitForm from "@/Hooks/useSubmitForm"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TELA_PAI = 'pedidoConsulta'
const TELA_ID = 'pedidoManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/pedido/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function PedidoManutencao({acao}) {
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
                        title={'Manutenção de Pedidos'}  
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
                <input type="hidden" name="id" value={form.id} />
                <div className="px-4 py-1">
                    <Externo campoCodigo={'cliente_id'} campoNome={'cliente'} handleChange={handleChange} title={'Cliente'} paginaExterno={'clienteConsulta'} />
                </div>
                <div className="px-4 py-1">
                    <label htmlFor="" className="block">Data</label>
                    <input type="date" name="data" id="" className="w-full rounded-md p-1" />
                </div>
                <div className="px-4 py-1">
                    <label htmlFor="" className="block">Prazo Entrega</label>
                    <input type="number" name="prazo_entrega" id="" className="p-1 rounded-md w-full"/>
                </div>
                <div className="px-4 py-1">
                    <label htmlFor="" className="block">Observação</label>
                    <textarea name="observacao" id="" cols="30" rows="4" className="w-full rounded-md">

                    </textarea>
                </div>
            </form>
        </Janela>
    )
}