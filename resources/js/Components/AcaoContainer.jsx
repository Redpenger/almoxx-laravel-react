import { Button } from "@mui/material";
import Link from "./Link";
import Acao from "./Acao";

export default function AcaoContainer({acoes, handleClose}) {
    return(
        <div className="flex">
            {acoes.map((acao, index) => (
                <Acao key={index} acao={acao} handleClose={handleClose}/>
            ))}
        </div>
    )
}