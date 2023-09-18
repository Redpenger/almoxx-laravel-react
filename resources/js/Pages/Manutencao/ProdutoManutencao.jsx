import ErrorContainer from "@/Components/ErrorContainer"
import Janela from "@/Components/Janela"
import RodapeManutencao from "@/Components/RodapeManutencao"
import { useState } from "react"

const TELA_ID = 'produtoManutencao'
const TELA_WIDTH = '500px'
const URL = 'http://127.0.0.1:8000/api/produto/manutencao'
const X_CENTER = (document.body.clientWidth / 2) - (parseInt(TELA_WIDTH) / 2)

export default function ProdutoManutencao({handleClose, innerRef, handleReload, acao}) {
    const [errors, setErrors] = useState(null)

    function handleSubmit() {
        const formData = new FormData(document.getElementById(`form-${TELA_ID}`))

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors) {
                setErrors(data.errors)
            }
            if(data.mensagem) {
                window.alert(data.mensagem)
                handleClose(TELA_ID)
                handleReload()
            }
            console.log(data)
        })
    }

    return (
        <Janela ref={el => innerRef.current[TELA_ID] = el} 
                        onClose={() => handleClose(TELA_ID)}
                        title={'Manutenção de Produtos'}  
                        id={TELA_ID} 
                        width={'500px'}
                        height={'500px'} 
                        top={'35px'}
                        y={'100px'}
                        x={X_CENTER}
                        rodape={<RodapeManutencao handleSubmit={handleSubmit} />}
                    >
            <ErrorContainer errors={errors}/>
            <form id={`form-${TELA_ID}`}>
                <input type="hidden" name="acao" defaultValue={acao.acao} />
                <div className="mb-6 p-5 text-black">
                    <label htmlFor="nome" className="block mb-2 text-sm text-gray-900 font-bold">Nome</label>
                    <input type="text" id="nome" name="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="produto" required/>
                </div>
            </form>
        </Janela>
    )
}