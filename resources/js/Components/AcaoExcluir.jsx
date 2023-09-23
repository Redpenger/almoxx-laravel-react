import useHandleReload from "@/Hooks/useHandleReload";
import { Button } from "@mui/material";

export default function AcaoExcluir({acao}) {
    const handleReload = useHandleReload(acao.telaPai)
    function handleExclusao() {
        if(!window.confirm('Deseja mesmo exlcluir o registro?')) return
        fetch(acao.actionUrl, {
            method: 'POST',
            body: new FormData(document.getElementById(`form-${acao.pagina}`))
        })
        .then(res => res.json())
        .then(data => {
            if(data.mensagem) {
                window.alert(data.mensagem)
                handleReload()
            }
        })
    }

    return(
        <form id={`form-${acao.pagina}`}>
            <input type="hidden" name="chave" defaultValue={acao.chave} />
            <input type="hidden" name="acao" defaultValue={acao.acao} />
            <Button disabled={!acao.chave? true: false} onClick={handleExclusao} variant="contained" size="small" sx={{fontSize: '11px', padding: '1px 10px', margin: '2px'}}>{acao.nome}</Button>

        </form>
    )
}