import React from 'react';

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
            className={param ? 'input-error form-control' : 'regular-style form-control'}/>
        </div>
    )
}

export default Input;