import { Button } from "@mui/material";
import Link from "./Link";
import Acao from "./Acao";

export default function AcaoContainer({acoes}) {
    return(
        <div className="flex">
            {acoes.map((acao, index) => (
                <div key={index}>
                    {acao.el}
                </div>
            ))}
        </div>
    )
}