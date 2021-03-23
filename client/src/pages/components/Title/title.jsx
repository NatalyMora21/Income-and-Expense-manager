import React from 'react';


const Title=(props)=>{
    const {text}= props
    return(
        <div className='title-container'>
            <h1>{text}</h1>
        </div>
    )
}

export default Title;