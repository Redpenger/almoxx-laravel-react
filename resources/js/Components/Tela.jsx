import { useContext, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import 'winbox/dist/css/winbox.min.css'; // required
import WinBox from 'react-winbox';
import TelaConsulta from './TelaConsulta';
import TelaManutencao from './TelaManutencao';

export default function Tela({telaRef}) {
    const {telas, setTelas} = useContext(TelasContext)
    
    const [campoFiltro, setCampoFiltro] = useState({})
    const [operador, setOperador] = useState({})
    const [valor1, setValor1] = useState({})
    const [valor2, setValor2] = useState({})
    const [registroSelecionado, setRegistroSelecionado] = useState({})
    const [registroPorPagina, setRegistroPorPagina] = useState({})
    
    function handleMinimize(telaId) {
        telaRef.current[telaId].hide()
    }

    function handleClose(telaId) {
        const telasAtual = {}
        const registroSelecionadoAtual = {}
        Object.keys(telas).map((id, index) => {
            if(id != telaId) {
                telasAtual[id] = telas[id]
                registroSelecionadoAtual[id] = registroSelecionado[id]
            }
        })
        setTelas({...telasAtual})
        setRegistroSelecionado({...registroSelecionadoAtual})
    }

    function handleReload(telaId, p = 1) {
        let cFiltro = campoFiltro[telaId] ? campoFiltro[telaId] : ''
        let o = operador[telaId] ? operador[telaId] : ''
        let v1 = valor1[telaId] ? valor1[telaId] : ''
        let v2 = valor2[telaId] ? valor2[telaId] : ''
        let externo = telas[telaId].campoExterno ? true : ''
        let rPorPagina = registroPorPagina[telaId] ? registroPorPagina[telaId] : ''
        let url = telas[telaId].url + `?page=${p}&registrosPorPagina=${rPorPagina}&chave=${telas[telaId].chave}&externo=${externo}&nome=${cFiltro}&operador=${o}&valor1=${v1}&valor2=${v2}` 
        console.log(url)
        fetch(url, {method: 'GET', headers: {'Content-type': 'application/json'}})
        .then(res => res.json())
        .then(data => {
            data.tela.campoExterno = telas[telaId].campoExterno
            setTelas(prev => {return {...prev, [data.tela.id]: data.tela}})
            telaRef.current[data.tela.id]?.focus()
            telaRef.current[data.tela.id]?.restore()
        })
        .catch(err => console.error(err))
        setRegistroSelecionado(prev => {
            return {
                ...prev,
                [telaId]: null
            }
        })
    }

    return(
        <>
            {Object.keys(telas).map((telaId, index) => (
                <WinBox 
                    ref={el => telaRef.current[telaId] = el}
                    key={telaId}
                    noShadow={true}
                    noFull={true}
                    id={telas[telaId].id}
                    title={telas[telaId].nome}
                    width={telas[telaId].width}
                    height={telas[telaId].height}
                    x={telas[telaId].tipo == 'manutencao' ? 'center' : ''}
                    y={telas[telaId].tipo == 'manutencao' ? 'center' : ''}
                    top="36"
                    bottom="46"
                    maxWidth={document.body.clientWidth}
                    maxHeight="668"
                    background='#03A9F4'
                    border="2"
                    onMinimize={() => handleMinimize(telaId)}
                    onClose={() => handleClose(telaId)}
                >
                    {telas[telaId].tipo == 'consulta' && (<TelaConsulta setCampoFiltro={setCampoFiltro} setOperador={setOperador} setValor1={setValor1} setValor2={setValor2} campoFiltro={campoFiltro} operador={operador} valor1={valor1} valor2={valor2} registroPorPagina={registroPorPagina} setRegistroPorPagina={setRegistroPorPagina} registroSelecionado={registroSelecionado} setRegistroSelecionado={setRegistroSelecionado} tela={telas[telaId]} handleClose={handleClose} handleReload={handleReload}/>)}
                    {telas[telaId].tipo == 'manutencao' && (<TelaManutencao tela={telas[telaId]} handleClose={handleClose} handleReload={handleReload}/>)}
                </WinBox>
            ), telas)}
        </>
    )
}