import { useContext } from 'react'
import { TelasContext } from '../Contexts/TelasContext'

export default function Footer({telaRef}) {
    const {telas, setTelas} = useContext(TelasContext)

    function handleToggler(telaId) {
        if(telaRef.current[telaId].isHidden()) {
            telaRef.current[telaId].show()
            telaRef.current[telaId].restore()
            telaRef.current[telaId].focus()
        } else if(!telaRef.current[telaId].isFocused()) {
            telaRef.current[telaId].focus()
        } else {
            telaRef.current[telaId].hide()
        }
    }

    return(
        <footer className="absolute bottom-0 w-full text-sm" style={{backgroundColor: '#03A9F4'}}>
            <div className="w-full">
                <div className="flex border w-full h-6">
                    {Object.keys(telas).map((telaId, index) => (
                        <div key={index} onClick={() => handleToggler(telaId)} className='border border-sky-950 border-collapse px-4 cursor-pointer bg-sky-600 text-white'>{telas[telaId].nome}</div>
                    ))}
                </div>
                <div className="border">div2</div>
            </div>
        </footer>
    )
}