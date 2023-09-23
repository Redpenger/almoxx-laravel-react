import { TelasContext } from '../Contexts/TelasContext'
import Header from '@/Components/Header'
import Tela from '@/Components/Tela'
import Footer from '@/Components/Footer'
import { useDispatch } from 'react-redux'
import TelasActionTypes from '@/Redux/Telas/TelasActionTypes'
import TelaList from '@/TelaList'
import ForceReloadActionTypes from '@/Redux/ForceReload/ForceReloadActionTypes'

export default function Padrao({}) {
    const dispatch = useDispatch()

    function loadTela(endereco, props = {}) {
        const component = TelaList(endereco, props)
        const tela = {
            id: endereco,
            pagina: component.pagina,
            title: component.title
        }
        dispatch({
            type: TelasActionTypes.ADD,
            payload: {
                id: endereco,
                tela: tela
            }
        })
        dispatch({
            type: ForceReloadActionTypes.RELOAD,
            payload: {
                id: endereco,
                counter: 0
            }
        })
    }

    function handleClickLink(e) {
        e.preventDefault()
        let endereco = e.target.href.split('/')[3]
        loadTela(endereco)
    }

    function handleClickAcao(acao) {
        loadTela(acao.pagina, {acao: acao})
    }

    return(
        <>
            <TelasContext.Provider value={{handleClickLink, handleClickAcao}} >
                <Header/>
                <Tela />
                <Footer />    
            </TelasContext.Provider>
        </>
    )
}