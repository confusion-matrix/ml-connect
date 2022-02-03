import React, {useState} from 'react';
import cog from '../imgs/cog.png'


function Navi(props){
    return (
        <nav className='navi'>
            <div className='navi-nav'> { props.children } </div>

        </nav>
    )
    
}

function NaviItem(props) {
    const [open, setOpen] = useState(false);

    return(
    <div className='item'>

        <button className="btn btn-danger" onClick={()=> setOpen(!open)}>
            <img className="spinner" src={cog} width='50rem'></img>
        </button>
        
        {open && props.children}

    </div>
    )
}

function Dropdown(){
    function DropItem(props){
        return (
        <div>
            <span>{props.leftSymb}</span>
            {props.children}
            <span>{props.rightSymb}</span>
        </div>
        )
    }
}

export {Navi, NaviItem};