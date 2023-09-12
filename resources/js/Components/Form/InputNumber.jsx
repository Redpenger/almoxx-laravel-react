export default function InputNumber({campo, handleChange, form}) {
    return(
        <div className={`flex flex-col ${campo.hidden ? 'hidden': ''}`}>
            <label className=" rounded-sm p-1">{campo.titulo}</label>
            <input onChange={handleChange}  className="rounded-md p-1" type="number" name={campo.nome} value={form[campo.nome]}/>
        </div>
    )
}