export default function RodapeManutencao({handleSubmit}) {
    return (
        <div className="bg-sky-500 w-full text-center flex align-middle justify-center">
            <button onClick={handleSubmit} className="border-sky-800 border rounded-md px-3 text-sm m-0.5 bg-sky-600">Enviar</button>
            <button className="border-sky-800 border rounded-md px-3 text-sm m-0.5 bg-sky-600">Limpar</button>
        </div>

    )
}