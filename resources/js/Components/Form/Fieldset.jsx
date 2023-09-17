import Grid from "./Grid"
import InputDate from "./InputDate"
import InputExterno from "./InputExterno"
import InputFile from "./InputFile"
import InputNumber from "./InputNumber"
import InputText from "./InputText"

export default function Fieldset({tela, form, setForm, handleChange, campo}) {
    
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
    
    return(
        <>
            <fieldset className="border-black border rounded-md p-3 w-full">
                <legend className="mx-3 px-1">{campo.titulo}</legend>
                {aCampos.map((campo, index) => (
                        <div key={index} className="">
                            {campo}
                        </div>
                ))}
          
            </fieldset>  
        </>
    )
}