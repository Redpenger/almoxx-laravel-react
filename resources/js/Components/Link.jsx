import { useContext } from 'react'
import { TelasContext } from '../Contexts/TelasContext'

export default function Link({to, children, registroSelecionado, tela}) {
    const {telas, setTelas, telaRef} = useContext(TelasContext)

    function loadTela(e) {
        e.preventDefault()
        let url;
        if(registroSelecionado && tela) {
            url = e.currentTarget.href + `?chave=${registroSelecionado[tela.id]}` 
        } else {
            url = e.currentTarget.href
        }
        fetch(url , {method: 'GET', headers: {'Content-type': 'application/json'}})
        .then(res => res.json())
        .then(data => {
            setTelas({...telas, [data.tela.id]: data.tela})
            telaRef.current[data.tela.id]?.focus()
            telaRef.current[data.tela.id]?.restore()
        })
        .catch(err => console.error(err))
    }

    return(
        <a onClick={loadTela} href={to}>{children}</a>
    )
}