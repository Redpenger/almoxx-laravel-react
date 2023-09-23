import { useContext } from 'react'
import { TelasContext } from '../Contexts/TelasContext'

export default function Link({to, children, className}) {
    const {handleClickLink} = useContext(TelasContext)

    return(
        <a onClick={(e) => handleClickLink(e)} href={to} className={className}>{children}</a>
    )
}