export default function InputText({campo, handleChange, form}) {
    return(
        <div className={`flex flex-col ${campo.hidden ? 'hidden': ''}`}>
            <label className="">{campo.titulo}</label>
            <input onChange={handleChange} className="rounded-md p-1" type="text" name={campo.nome} value={form[campo.nome]}/>
        </div>
    )
}