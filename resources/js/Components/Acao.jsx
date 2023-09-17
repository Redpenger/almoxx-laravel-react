import Link from "./Link";

export default function Acao({acao}) {

    return(
        <Link to="produtoManutencao">{acao.nome}</Link>
        )
}