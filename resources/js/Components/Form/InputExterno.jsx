import { useContext, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TelasContext } from '../../Contexts/TelasContext'

export default function InputExterno({campo, handleChange, form, setForm, tela}) {
    const {telas, setTelas} = useContext(TelasContext)
    const [hidden, setHidden] = useState({search: '', loading: 'hidden'})
    const codigoRef = useRef()
    const nomeRef = useRef()
    
    function mostraLoading() {
        setHidden({
            search: 'hidden',
            loading: ''
        })
    }

    function escondeLoading() {
        setHidden({
            search: '',
            loading: 'hidden'
        })
    }

    function openExterno() {
        if(!tela.acaoEnvio) return
        mostraLoading()
        fetch(campo.rota + '?externo=true', {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            data.tela.campoExterno = {obj: form, codigoForm : codigoRef.current.name, nomeForm: nomeRef.current.name} 
            setTelas({...telas, [data.tela.id] : data.tela})
        })
        .then(() => escondeLoading())
    }

    function findRegistroExterno(e, campo) {
        mostraLoading()
        if(e.target.value == '') {
            escondeLoading()
            setForm(prev => {
                return {
                    ...prev,
                    [campo.nome] : '',
                    [campo.externoNome] : ''
                }
            })
            return
        }
        fetch(`http://127.0.0.1:8000/api/${campo.externo}/consulta/externo/${e.target.value}`, {
            method: 'GET'
           }) 
           .then(res => res.json())
           .then(data => {
                if(data.registro) {
                    setForm(prev => {
                        return {
                            ...prev,
                            [campo.nome] : data.registro.id,
                            [campo.externoNome] : data.registro.nome
                        }
                    })
                } else {
                    e.target.value = ''
                    window.alert('Registro não encontrado')
                    setForm(prev => {
                        return {
                            ...prev,
                            [campo.nome] : '',
                            [campo.externoNome] : ''
                        }
                    })
                    codigoRef.current.focus()
                }
           })
           .then(() => escondeLoading())
    }

    function handleKeyDown(e, campo) {
        if(e.key == 'Enter') {
            findRegistroExterno(e, campo)
        }
    }

    return(
        <div className="flex flex-col">
            <label>{campo.titulo}</label>
            <div className="flex">
                <input onKeyDown={(e) => handleKeyDown(e, campo)} onBlur={(e) => findRegistroExterno(e, campo)} ref={codigoRef} className="me-1 p-1 w-24 rounded-md" type="number" name={campo.nome} value={form[campo.nome]} onChange={handleChange}/>
                <input ref={nomeRef} className="me-1 p-1 w-full rounded-md" type="text" name={campo.externoNome} value={form[campo.externoNome]} onChange={handleChange}/>
                <span onClick={openExterno} className={`bg-white flex flex-col me-1 justify-center w-16 align-middle rounded-md border border-gray-500 ${!tela.acaoEnvio ? 'bg-zinc-300 cursor-default': 'cursor-pointer'}`}>
                    <BsSearch className={`text-1xl m-auto ${hidden.search}`}/>
                    <img src='/gifs/loading-gif.gif' className={`w-4 m-auto ${hidden.loading}`}/>
                </span>
            </div>
        </div>
    )
}