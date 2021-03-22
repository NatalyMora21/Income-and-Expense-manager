const UserAuth= ()=>{
    let token = localStorage.getItem('token');
    if (token){
        window.location.href="./home"
    }
    else{
        window.location.href="./"
    }
}


export default UserAuth;