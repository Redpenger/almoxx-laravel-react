export default function RoadapeConsulta({tela, aplicaRegistroPorPagina, aplicaPagina, registrosPagina, setRegistrosPagina}) {
    return(
        <div className="absolute bottom-0 bg-sky-500 w-max m-0 flex text-sm pb-0.5">
            <span className="bg-gray-200 rounded-md text-black ps-1">Registros: <span className="rounded-md bg-white px-3 pb-1 border border-gray-500">{tela.registros.total}</span></span>
            <span className="ms-3 bg-gray-200 rounded-md text-black ps-1 ">
                Registros Por Página
                <input onKeyDown={aplicaRegistroPorPagina} onChange={(e) => setRegistrosPagina(e.target.value)} value={registrosPagina ? registrosPagina : ''} type="number" className="text-sm p-0 m-0 rounded-md w-16 px-1 ms-1 text-black outline-0" />
            </span>
            
            
            <span >
                
                <ul class="flex -space-x-px text-sm text-black">
                    {tela.registros.links.map((link, index) => (
                        <li>
                            {index == 0 && (<a onClick={aplicaPagina} href={link.url} className="px-2 bg-gray-200 border border-gray-600 rounded-s-md ms-4 py-0.5">Anterior</a>)}
                            {(index >= 1 && index < tela.registros.links.length -1) && (
                                <li><a onClick={aplicaPagina} href={link.url} className={`px-1.5 bg-gray-200 border border-gray-600 py-0.5 ${link.active ? 'bg-sky-700 text-gray-100': ''}`}>{link.label}</a></li>
                            )} 
                            {index == tela.registros.links.length -1 && (<a onClick={aplicaPagina} className="px-2 bg-gray-200 border py-0.5 border-gray-600 rounded-e-md" href={link.url}>Próximo</a>)} 
                            
                        </li>
                    ))}
                </ul>
                   
            </span>
        </div>
    )
}