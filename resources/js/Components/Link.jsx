import { useContext } from 'react'
import { TelasContext } from '../Contexts/TelasContext'

export default function Link({to, children, className, acao}) {
    const {handleClickLink} = useContext(TelasContext)

    return(
        <a onClick={(e) => handleClickLink(e, acao)} href={to} className={className}>{children}</a>
    )
}