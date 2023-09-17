import styles from './Header.module.css'
import { BsHouse } from 'react-icons/bs'
import Link from './Link'

export default function Header() {
    return(
        <nav>
            <div className={styles.nav_xbootstrap}>
            <ul className="text-white z-50 list-none m-0 mb-1 p-0 block border-b-black">
                <li className={styles.iconHeader}>Almoxx <BsHouse className="mt-1 mx-2"/></li>
                <li ><Link to="pedidoConsulta">Pedidos</Link></li>
                <li ><Link to="produtoConsulta">Produtos</Link></li>
                <li ><Link to="categoriaConsulta">Categorias</Link></li>
                <li ><Link to="clienteConsulta">Clientes</Link></li>
                <li >
                    <span className="inline-block">Movimentações<span></span></span>
                    <ul className={styles.dropdown}>
                        <li><a href="{{ route('entrada.consulta') }}">Entrada</a></li>
                        <li><a href="{{ route('saida.consulta') }}">Saída</a></li>
                    </ul>
                </li>
                <li>
                    <span className="inline-block">Compras<span ></span></span>
                    <ul className={styles.dropdown}>
                        <li><a href="">Listas de compra</a></li>
                    </ul>
                </li>
            </ul>
            </div>
        </nav>
    )
}