import { Button } from "@mui/material";
import Link from "./Link";
import Acao from "./Acao";

export default function AcaoContainer({tela, registroSelecionado, handleReload}) {
    return(
        <div className="flex">
            {tela.acoes.map((acao, index) => (           
                <div key={index}>
                    {acao.acao == 'consulta' && (<Link to={acao.rota} registroSelecionado={registroSelecionado} tela={tela} ><Button disabled={acao.acao != 'create' && !registroSelecionado[tela.id] ? true : false} sx={{margin: '2px', fontSize: '11px'}}  size="small" color="primary" variant="contained">{acao.nome}</Button></Link>)}
                    {acao.acao != 'consulta' && (<Acao acao={acao} handleReload={handleReload} registroSelecionado={registroSelecionado} tela={tela}/>)}
                </div>
            ))}
        </div>
    )
}