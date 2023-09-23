import TelasActionTypes from "@/Redux/Telas/TelasActionTypes"
import { useDispatch } from "react-redux"

export default function useHandleClose(telaId) {
    const dispatch = useDispatch()

    return () => {
        dispatch({
            type: TelasActionTypes.REMOVE,
            payload: {
                id: telaId
            }
        })
    }
}