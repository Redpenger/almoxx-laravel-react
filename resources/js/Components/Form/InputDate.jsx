export default function InputDate({tela, form, handleChange, campo}) {
    return (
        <div className={`flex flex-col ${campo.hidden ? 'hidden': ''}`}>
            <label htmlFor="">{campo.titulo}</label>
            <input onChange={handleChange} className="rounded-md p-1" type="date" name={campo.nome} value={form[campo.nome]}/>
        </div>
    )
}