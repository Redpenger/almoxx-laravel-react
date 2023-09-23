import { Button } from "@mui/material";
import Link from "./Link";
import { useContext } from "react";
import { TelasContext } from "@/Contexts/TelasContext";

export default function AcaoManutencao({acao}) {
    const { handleClickAcao } = useContext(TelasContext)

    return(
        <Button disabled={!acao.chave && acao.tipo != 'create' ? true: false} onClick={() => handleClickAcao(acao)} variant="contained" size="small" sx={{fontSize: '11px', padding: '1px 10px', margin: '2px'}}>{acao.nome}</Button>
    )
}