import ForceReloadActionTypes from "@/Redux/ForceReload/ForceReloadActionTypes"
import { useDispatch } from "react-redux"

export default function useHandleReload(telaId) {
    const dispatch = useDispatch()
    return () => {
            dispatch({
                type: ForceReloadActionTypes.RELOAD,
                payload: {
                    id: telaId
                }
            })
        }


}