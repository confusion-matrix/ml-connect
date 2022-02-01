import React, {useState} from 'react';

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

        <div onClick={()=> setOpen(!open)}>
            {props.symbol}
        </div>
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