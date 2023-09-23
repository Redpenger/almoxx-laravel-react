import useHandleClose from "@/Hooks/useHandleClose"

export default function TableList({tela, telaId, setRegistroSelecionado, registroSelecionado, externo}) {
    const handleClose = useHandleClose(telaId)

    function handleSelectRegistro(id, nome) {
        if(!externo) return
        externo.fnSetForm(prev => {
            return {
                ...prev,
                [externo.campoCodigo] : id,
                [externo.campoNome] : nome
            }
        })
        handleClose()
    }
    
    return(
        <div >
            <table className="min-w-full text-left text-sm text-black bg-white">
                <thead className="border-b font-medium dark:border-neutral-400 border">
                    <tr >
                        {tela.campos.map((campo, index) => (
                            <th scope="col" className="px-1 py-2 border" key={index}>{campo.titulo}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tela.registros.data.map((registro, index) => (
                        <tr onDoubleClick={() => handleSelectRegistro(registro.id, registro.nome)} onClick={() => setRegistroSelecionado(registro.id)} key={index}  className={`border-b dark:border-neutral-200 ${registroSelecionado == registro.id ? 'bg-gray-300': 'hover:bg-gray-200'}`}>
                            {tela.campos.map((campo, index) => (
                                <td className="whitespace-nowrap px-1 py-1 font-medium" key={index}>{campo.nome.indexOf('.') != -1 ? registro[campo.nome.split('.')[0]][campo.nome.split('.')[1]] : registro[campo.nome]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}