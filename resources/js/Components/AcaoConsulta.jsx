import { TelasContext } from "@/Contexts/TelasContext";
import { Button } from "@mui/material";
import { useContext } from "react";

export default function AcaoConsulta({acao}) {
    const { handleClickAcao } = useContext(TelasContext)
    return(
        <>
            <Button onClick={() => handleClickAcao(acao)} variant="contained" disabled={!acao.chave && acao.tipo != 'create' ? true: false}  sx={{fontSize: '11px', padding: '1px 10px', margin: '2px'}}>
                {acao.nome}
            </Button>
        </>
    )
}