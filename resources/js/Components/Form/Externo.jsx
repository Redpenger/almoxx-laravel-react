import ForceReloadActionTypes from "@/Redux/ForceReload/ForceReloadActionTypes";
import TelasActionTypes from "@/Redux/Telas/TelasActionTypes";
import TelaList from "@/TelaList";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function Externo({title, campoCodigo, campoNome, paginaExterno, handleChange, form, setForm}) {
    const dispatch = useDispatch()
    console.log(form)
    function openExterno() {
        const component = TelaList(paginaExterno, {externo: {campoCodigo: campoCodigo, campoNome:campoNome, fnSetForm: setForm}})
        dispatch({
            type: TelasActionTypes.ADD,
            payload: {
                id: paginaExterno + '-externo',
                tela: {
                    id: paginaExterno + '-externo',
                    pagina: component.pagina,
                    title: 'Externo ' + component.title
                }
            }
        })
        dispatch({
            type: ForceReloadActionTypes.RELOAD,
            payload: {
                id: (paginaExterno + '-externo')
            }
        })
    }

    return (
        <div className="flex flex-col">
            <label className="font-medium">{title}</label>
            <div className="flex">
                <input  className="me-1 p-1 w-24 rounded-md" type="number" name={campoCodigo} onChange={handleChange} value={form[campoCodigo]}/>
                <input className="me-1 p-1 w-full rounded-md" type="text" name={campoNome} onChange={handleChange} value={form[campoNome]?.nome ? form[campoNome]['nome']: form[campoNome]}/>
                <span onClick={openExterno} className={`bg-white flex flex-col me-1 justify-center w-16 align-middle rounded-md border border-gray-500 cursor-pointer`}>
                    <BsSearch className={`text-1xl m-auto`}/>
                    {/* <img src='/gifs/loading-gif.gif' className={`w-4 m-auto`}/> */}
                </span>
            </div>
        </div>
    )
}