import { useState } from "react"
import useHandleClose from "./useHandleClose"
import useHandleReload from "./useHandleReload"

function useSubmitForm(url, telaId, telaPai, setErrors) {
    const handleClose = useHandleClose(telaId)
    const handleReload = useHandleReload(telaPai)

    return () => {
        const formData = new FormData(document.getElementById(`form-${telaId}`))
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors) {
                setErrors(data.errors)
            } else if(data.mensagem) {
                window.alert(data.mensagem)
                handleClose()
                handleReload()
            } else if(data.exception) {
                window.alert(data.message)
            }
        })
    }   
    
}

export default useSubmitForm