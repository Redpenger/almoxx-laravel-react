import { useEffect, useState } from "react"
import Fieldset from "./Fieldset"
import InputDate from "./InputDate"
import InputExterno from "./InputExterno"
import InputFile from "./InputFile"
import InputNumber from "./InputNumber"
import InputText from "./InputText"
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'

export default function Grid({tela, form, setForm, handleChange, campo}){
    const [campos, setCampos] = useState([])

    useEffect(() => {
        const aCampos= []
        campo.components.map((campo, index) => {
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
        setCampos(aCampos)
    }, [])

    function duplicaConteudo() {
        const aCampos= []
        campo.components.map((campo, index) => {
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
        setCampos([...campos, aCampos])
    }

    
    
    return(
        <>
            <div className={`${campo.flexDirection == 'col' ? 'flex flex-col' : 'flex'} w-full`}>
                {campos.map((campo, index) => (
                            <div key={index} className="w-full">
                                {campo}
                            </div>
                    ))}
                <div className="flex flex-col justify-end align-bottom text-1xl px-1">
                    <AiFillPlusCircle onClick={duplicaConteudo} className="hover:text-sky-500 cursor-pointer text-xl"/>
                    <AiOutlineMinusCircle className="hover:text-sky-500 cursor-pointer text-xl"/>
                </div>
            </div>
        </>
    )
}