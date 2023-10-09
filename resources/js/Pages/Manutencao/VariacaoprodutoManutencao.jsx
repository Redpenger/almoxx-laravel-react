import ErrorContainer from "@/Components/ErrorContainer"
import FieldsetVariacao from "@/Components/FieldsetVariacao"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import useHandleClose from "@/Hooks/useHandleClose"
import useSubmitForm from "@/Hooks/useSubmitForm"
import TelaRefActionTypes from "@/Redux/TelaRef.jsx/TelaRefActionTypes"
import { Button } from "@mui/material"
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const TELA_PAI = 'variacaoprodutoConsulta'
const TELA_ID = 'variacaoprodutoManutencao'
const TELA_WIDTH = '600px'
const URL = 'http://127.0.0.1:8000/api/grupovariacao/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function VariacaoprodutoManutencao({ acao }) {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const handleClose = useHandleClose(TELA_ID)
    const [errors, setErrors] = useState(null)
    const callSubmit = useSubmitForm(URL, TELA_ID, TELA_PAI, setErrors)
    const [variacoes, setVariacoes] = useState([])

    useEffect(() => {
        if(acao.tipo != 'edit') {
            addVariacao()
            return
        }
        let url = URL + `?chave=${acao.chave}&acao=show`
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setForm(prev => {
                return {
                    ...prev,
                    atributo: data.registro['grupo_variacao'].nome,
                }
            })
            data.registro.variacoes.forEach((variacao, index) => {
                addVariacao({nome: variacao.nome, produtos: variacao.produtos})
            });
            
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

    const addVariacao = (values) => { 
        setVariacoes(prev => {
            return [
                ...prev,
                <FieldsetVariacao values={values} acao={acao} variacoes={variacoes} handleChange={handleChange} />
            ]
        })
    }

    return (
        <Janela ref={el => dispatch({type: TelaRefActionTypes.ADD, payload: {id: TELA_ID, ref: el}})} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Manutenção de Variação de Produtos'}  
                        id={TELA_ID} 
                        width={TELA_WIDTH}
                        height={'550px'} 
                        top={'35px'}
                        y={'100px'}
                        x={X_CENTER}
                        rodape={<RodapeManutencao handleSubmit={handleSubmit} />}
                    >
            <ErrorContainer errors={errors}/>
            <form id={`form-${TELA_ID}`}>
                <input type="hidden" name="acao" defaultValue={acao.acao} />
                <input type="hidden" name="id" value={form?.id} />
                <input type="hidden" name="produto_id" defaultValue={acao.registroPai} />

                <div className="px-4">
                    <label htmlFor=""  className="block mt-2 font-medium" >Atributo</label>
                    <input value={form['atributo']} type="text" name="atributo" id="" className="text-sm p-1.5 m-0 rounded-md w-full" />
                </div>
                <div className="px-4 py-1">
                    {variacoes.length > 0 && variacoes.map((variacao, index) => (
                        <React.Fragment key={index}>
                            {variacao}
                        </React.Fragment>
                    ))}
                    <Button onClick={addVariacao} variant="contained" sx={{float: 'right', margin: '3px 0px', fontSize: '11px'}}>+ variação</Button>
                </div>
            </form>
        </Janela>
    )
}