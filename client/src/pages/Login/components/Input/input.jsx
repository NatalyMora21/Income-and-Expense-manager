import React from 'react';
import './input.css';

const Input=(props)=>{
    const {attribute,handleChange, param}= props
    return(
        <div>
            <input 
            id={attribute.id} 
            name={attribute.name} 
            placeholder={attribute.placeholder} 
            type={attribute.type}
            onChange={(e)=>handleChange(e.target.name, e.target.value)} 
            className={param ? 'input-error' : 'regular-style'} />
        </div>
    )
}

export default Input;