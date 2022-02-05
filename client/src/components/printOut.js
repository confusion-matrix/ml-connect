import React from 'react';
import printy from '../imgs/printOut.png'

export default function PrintOut(props){
    return(
        <div className="paper">
            
            {props.children}
        </div>
    )
}

