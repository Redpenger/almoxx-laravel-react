import Link from "./Link";

export default function Acao({acao}) {

    return(
        <Link className={'p-0.5 border rounded-md me-1 my-0.5 px-3 text-white bg-sky-600'} to={acao.pagina} acao={acao}>{acao.nome}</Link>
        )
}