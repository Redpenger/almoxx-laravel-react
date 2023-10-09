import ForceReloadActionTypes from "@/Redux/ForceReload/ForceReloadActionTypes";
import TelasActionTypes from "@/Redux/Telas/TelasActionTypes";
import TelaList from "@/TelaList";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function Externo({title, campoCodigo, campoNome, paginaExterno, handleChange, readonly, values}) {
    const dispatch = useDispatch()
    const [form, setForm] = useState({})

    console.log(values)

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
                    <input readOnly={readonly} className="me-1 p-1 w-24 rounded-md" type="number" name={campoCodigo} onChange={handleChange} value={values?.codigo ? values?.codigo : form[campoCodigo]}/>
                    <input readOnly={readonly} className="me-1 p-1 w-full rounded-md" type="text" name={campoNome} onChange={handleChange} value={values?.nome ? values?.nome : form[campoNome]}/>
                    <span onClick={!readonly ? openExterno : null} className={`bg-white flex flex-col me-1 justify-center w-16 align-middle rounded-md border border-gray-500 cursor-pointer`}>
                        <BsSearch className={`text-1xl m-auto`}/>
                        {/* <img src='/gifs/loading-gif.gif' className={`w-4 m-auto`}/> */}
                    </span>
                </div>
        </div>
    )
}