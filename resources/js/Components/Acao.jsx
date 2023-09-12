import { Button } from "@mui/material";
import { TelasContext } from "../Contexts/TelasContext";
import { useContext } from "react";

export default function Acao({acao, registroSelecionado, tela, handleReload}) {
    const {telas, setTelas, telaRef} = useContext(TelasContext)
    
    function getStringParams() {
        let str = ''
        acao.parametros.map(parametro => {
            str += `&${parametro.nome}=${parametro.valor}`
        })    
        return str
    }

    function openPage() {
        if(acao.acao == 'destroy') {
            if (!window.confirm('Deseja mesmo excluir o registro?')) return
        }
        let url = acao.rota + '?' + `acao=${acao.acao}&chave=${registroSelecionado[tela.id]}&telaPai=${tela.id}` + getStringParams()
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(acao.acao == 'destroy') {
                window.alert(data.mensagem)
                handleReload(data.janelaPai)
            } else {
                setTelas(prev => 
                    {return {
                        ...prev,
                        [data.tela.id]: data.tela
                    }})
                telaRef.current[data.tela.id]?.focus()
            }
        })
        .catch(err => console.error(err))
    }

    return(
        <Button disabled={acao.acao != 'create' && !registroSelecionado[tela.id] ? true : false} onClick={openPage} sx={{margin: '2px', fontSize: '11px'}} variant="contained" size="small">{acao.nome}</Button>
    )
}