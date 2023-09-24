import { AiOutlineClose } from 'react-icons/ai'
import { FiMaximize } from 'react-icons/fi'
import { FaRegWindowMinimize } from 'react-icons/fa'
import { Component } from 'react'

const TELA_MAX_HEIGHT = document.body.clientHeight - 82

class Janela extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            hidden: false,
            width: this.props.width,
            height: this.props.height,
            maximized: this.props.maximized ?? false,
            x: this.props.x ?? 0,
            y: this.props.y ?? '35px',
            top: this.props.top ?? 0,
            bottom: this.props.bottom ?? '36px',
            left: this.props.left ?? 0,
            right: this.props.right ?? document.body.clientWidth,
        }
        this.title = this.props.title
        this.id = this.props.id
        this.rodape = this.props.rodape
        
    }


    isMaximized = () => {
        return this.state.maximized
    }
    
    isHidden = () => {
        return this.state.hidden
    }

    show = () => {
        this.setState({...this.state, hidden : false})
    }
    hide = () => {
        this.setState({...this.state, hidden : true})
    }
    focus = () => {
        Array.from(document.getElementsByClassName('janela')).map((janela, index) => {
            janela.classList.add('z-0')
            janela.classList.remove('z-10')
        })
        document.getElementById(this.id).classList.add('z-10')
        document.getElementById(this.id).classList.remove('z-0')
    }

    isFocused = () => {
        return document.getElementById(this.id).classList.contains('z-10')
    }


    handleClose = () => {
        this.setState({open: false})
        this.props.onClose()
    }

    handleMinimize = () => {
        this.setState({...this.state, hidden : true})
    }

    handleMaximize = () => {
        this.setState({
            ...this.state,
            maximized : !this.state.maximized
        })
    }

    handleDrag = (e) => {
        const dragJanela = ({movementX, movementY}) => {
            const janela = document.getElementById(this.id)
            let x = (parseInt(this.state.x) + movementX)
            let y = (parseInt(this.state.y) + movementY)
            if(y <= parseInt(this.state.top) || y >= (TELA_MAX_HEIGHT + parseInt(this.state.bottom) - janela.clientHeight) || x <= parseInt(this.state.left) || x >= (parseInt(this.state.right) - janela.clientWidth)) return
            this.setState(prev => {
                return {
                    ...prev,
                    y: (parseInt(this.state.y) + movementY) + "px",
                    x: (parseInt(this.state.x) + movementX) + "px"
                }
            })
        }
        e = e || window.event
        e.preventDefault()
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
        document.onmousemove = dragJanela        
    }

    handleResize = (e, direction) => {
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
        document.onmousemove = (e) => {
            switch(direction) {
                case 'up':
                    this.setState(prev => {
                        return {
                            ...prev,
                            y: parseInt(this.state.y) + e.movementY,
                            height: parseInt(this.state.height) - e.movementY
                        }
                    })
                    break
                case 'down':
                    this.setState(prev => {
                        return {
                            ...prev,
                            height: parseInt(this.state.height) + e.movementY
                        }
                    })
                    break
                case 'left':
                    this.setState(prev => {
                        return {
                            ...prev,
                            x: parseInt(this.state.x) + e.movementX,
                            width: parseInt(this.state.width) - e.movementX
                        }
                    })
                    break
                case 'right':
                    this.setState(prev => {
                        return {
                            ...prev,
                            width: parseInt(this.state.width) + e.movementX
                        }
                    })
                    break
            }
        }
    }

    render() {
        return(
            // Janela
            <div style={{top: this.isMaximized() ? this.state.top : this.state.y, left: this.isMaximized() ? this.state.left : this.state.x, width: this.isMaximized() ? document.body.clientWidth : this.state.width, height: this.isMaximized() ? TELA_MAX_HEIGHT : this.state.height}} onClick={this.focus} id={this.id} className={`z-10 bg-sky-500 janela text-white absolute ${open && !this.state.hidden ? 'block' : 'hidden'} `}>
                {/* header container */}
                <div className='h-6 bg-sky-400'>
                        {/* drag contaiener */}
                        <div onMouseDown={this.handleDrag} onDoubleClick={this.handleMaximize} id='drag' className={`select-none absolute px-1 text-sm flex flex-col h-6 justify-center text-white w-full top-0 ${!this.isMaximized() ? 'cursor-move': ''}`}>{this.title}</div>
                        {/* control container */}
                        <div className="absolute right-0 top-0 flex">
                            <span onClick={this.handleMinimize} className='cursor-pointer p-1'><FaRegWindowMinimize className='hover:text-white'/></span>
                            <span onClick={this.handleMaximize} className='cursor-pointer p-1'><FiMaximize className='hover:text-white'/></span>
                            <span onClick={this.handleClose} className='cursor-pointer p-1'><AiOutlineClose className='hover:text-white'/></span>
                        </div>
                </div>
                {/* body container */}
                <div style={{height: 'calc(100% - 50px)'}} className='border-sky-500 border-2 overflow-auto bg-gray-100'>{this.props.children}</div>
                {/* rodape container */}
                <div className='absolute bottom-0 w-full'>{this.rodape}</div>
                {/* resizes containers */}
                <div onMouseDown={(e) => this.handleResize(e, 'up')} className={`absolute top-0 w-full h-2 ${!this.isMaximized() ? 'cursor-n-resize' : ''}`}></div>
                <div onMouseDown={(e) => this.handleResize(e, 'down')} className={`absolute bottom-0 h-2 w-full ${!this.isMaximized() ? 'cursor-s-resize' : ''}`}></div>
                <div onMouseDown={(e) => this.handleResize(e, 'left')} className={`absolute left-0 top-0 w-2 h-full ${!this.isMaximized() ? 'cursor-w-resize' : ''}`}></div>
                <div onMouseDown={(e) => this.handleResize(e, 'right')} className={`absolute right-0 top-0 w-2 h-full ${!this.isMaximized() ? 'cursor-e-resize' : ''}`}></div>
                <div className={`absolute left-0 top-0 h-2 w-2 ${!this.isMaximized() ? 'cursor-nw-resize' : ''}`}></div>
                <div className={`absolute right-0 top-0 h-2 w-2 ${!this.isMaximized() ? 'cursor-ne-resize' : ''}`}></div>
                <div className={`absolute right-0 bottom-0 h-2 w-2 ${!this.isMaximized() ? 'cursor-se-resize' : ''}`}></div>
                <div className={`absolute left-0 bottom-0 h-2 w-2 ${!this.isMaximized() ? 'cursor-sw-resize' : ''}`}></div>
            </div>
        )
    }

}

export default Janela
