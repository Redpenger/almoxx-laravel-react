export default function InputFile({campo, handleChange, form}) {
    return(
        <div className={`flex flex-col ${campo.hidden ? 'hidden': ''}`}>
            <label className="">{campo.titulo}</label>
            <input onChange={handleChange} className="rounded-md p-1" type="file" name={campo.nome} value={form[campo.nome]}/>
        </div>
    )
}