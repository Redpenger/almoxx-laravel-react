import { useContext, useEffect, useState } from 'react'
import { TelasContext } from '../Contexts/TelasContext'
import { useSelector } from 'react-redux'

export default function Footer() {
    const telaRef = useSelector(root => root.TelaRefReducer)
    // const {telas, setTelas} = useContext(TelasContext)
    const telas = useSelector(root => root.TelasReducer)
    const [reloader, setReloader] = useState(true)

    function handleToggler(telaId) {
        // debugger
        if(telaRef[telaId].isHidden()) {
            telaRef[telaId].show()
            telaRef[telaId].focus()
        } else if(!telaRef[telaId].isFocused()) {
            telaRef[telaId].focus()
        } else {
            telaRef[telaId].hide()
        }
    }

    return(
        <footer className="absolute bottom-0 w-full text-sm" style={{backgroundColor: '#03A9F4'}}>
            <div className="w-full">
                <div className="flex border w-full h-6">
                    {Object.keys(telas).map((telaId, index) => (
                        <div key={index} onClick={() => handleToggler(telaId)} className='border border-sky-950 border-collapse px-4 cursor-pointer bg-sky-600 text-white'>{telas[telaId].title}</div>
                    ))}
                </div>
                <div className="border">div2</div>
            </div>
        </footer>
    )
}