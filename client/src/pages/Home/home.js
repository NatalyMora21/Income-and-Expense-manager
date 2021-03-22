import React, {useState} from 'react';


const Home= ()=>{

    const cerarrSesion=()=>{
        localStorage.removeItem('token')


        window.location.href="./"
        
    }

    return (
        <div>
            HOMEE
            <br />
            <button onClick={cerarrSesion}>Cerrar sesión</button>
        </div>
        
    )
}


export default Home