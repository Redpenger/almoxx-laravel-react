import { useContext, useEffect, useState } from "react"
import { Button } from "@mui/material"
import { TelasContext } from "../Contexts/TelasContext"
import InputText from "./Form/InputText"
import InputNumber from "./Form/InputNumber"
import InputExterno from "./Form/InputExterno"
import InputFile from "./Form/InputFile"
import InputDate from "./Form/InputDate"
import Fieldset from "./Form/Fieldset"
import Grid from "./Form/Grid"

export default function TelaManutencao({tela, handleClose, handleReload}) {
    console.log(tela)

    const [errors, setErrros] = useState({})
    const {telas, setTelas, telaRef} = useContext(TelasContext)
    const formInitialState = {}
    tela.campos.map(campo => {
        if(campo.tipo == 'externo') {
            formInitialState[campo.nome] = campo.valorCodigo ? campo.valorCodigo : ''
            formInitialState[campo.externoNome] = campo.valorNome ? campo.valorNome : ''
        } else {
            formInitialState[campo.nome] = campo.valor ? campo.valor : ''
        }
    })
    const [form, setForm] = useState(formInitialState)

    useEffect(() => {
        tela.campos.map(campo => {
            if(campo.tipo == 'externo') {
                formInitialState[campo.nome] = campo.valorCodigo ? campo.valorCodigo : ''
                formInitialState[campo.externoNome] = campo.valorNome ? campo.valorNome : ''
            } else {
                formInitialState[campo.nome] = campo.valor ? campo.valor : ''
            }
        })
        setForm(formInitialState)
    }, [tela])




    function handleChange(e) {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    function handleSubmit(e) {
        const formdata = new FormData();
        for(let campo in form) {
            formdata.append(campo, form[campo])
        }
        formdata.append('acao', tela.acaoEnvio)
        fetch(tela.actionForm, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json'
            },
            body: formdata
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors) {
                setErrros(data.errors)
            }
            if(data.mensagem) {
                window.alert(data.mensagem)
                handleClose(tela.id)
                handleReload(tela.telaPai)
            }
            if(data.exception) {
                window.alert(data.message)
            }
        })
    }

    const aCampos= []
    tela.campos.map((campo, index) => {
        switch(campo.tipo) {
            case 'text':
                aCampos.push(<InputText form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'number':
                aCampos.push(<InputNumber  form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'externo' :
                aCampos.push(<InputExterno tela={tela} setForm={setForm} form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'file' :
                aCampos.push(<InputFile tela={tela} setForm={setForm} form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'date' :
                aCampos.push(<InputDate tela={tela} setForm={setForm} form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'fieldset':
                aCampos.push(<Fieldset tela={tela} setForm={setForm} form={form} handleChange={handleChange} campo={campo} />)
                break
            case 'grid':
                aCampos.push(<Grid tela={tela} setForm={setForm} form={form} handleChange={handleChange} campo={campo} />)
                break
        }
    })
    console.log(aCampos)

    return(
        <>
            {Object.keys(errors).length > 0 ? (
                <ul className="bg-red-500 rounded-md p-3 m-3">
                    {tela.campos.map((campo, index) => (
                        <>
                            {errors.hasOwnProperty(campo.nome) ? (
                                errors[campo.nome].map((erro, index) => (
                                    <li>{erro}</li>
                                ))
                            ) : (<></>)}
                        </>
                    ))}
                </ul>
            ) : (<></>)}
            
            <div className="p-5 pt-0 text-black">
                <fieldset disabled={!tela.acaoEnvio}>
                    {aCampos.map((campo, index) => (
                        <div key={index} className="m-2">
                            {campo}
                        </div>
                    ))}
                </fieldset>
            </div>
            <div className={`bottom-0 absolute justify-center flex w-full bg-sky-500 ${!tela.acaoEnvio ? 'hidden':''}`}>
                <Button onClick={handleSubmit} sx={{margin: '2px', fontSize: '11px'}} variant="contained">Enviar</Button>
                <Button sx={{margin: '2px', fontSize: '11px'}} variant="contained">Limpar</Button>
            </div>
        </>
    )
}