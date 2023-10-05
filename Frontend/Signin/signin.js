// import axios from 'axios';

// const { response } = require("../../Backend/app");

async function onSignin (){
   
    let email = document.getElementById('email').value;
    console.log(email);
    let password = document.getElementById('password').value;
    console.log(password);

    if(!email || !password){
        alert("Please fill all the fields");
        return;
    }
    if(password.length<8){
        alert("Password must be at least 8 characters long");
        return;
    }
    if(!email.includes('@')){
        alert("Please enter a valid email");
        return;
    }

    await axios.post('http://localhost:5001/api/auth/login',{
        "email":email,
        "password":password
    }).then((response)=>{
        console.log(response);
        if(response.status==200){
            alert("Signin successful");
        }
        localStorage.setItem('token',JSON.stringify(response.data.token));
        window.location.href='../Home/home.html';
    }).catch((err)=>{
        console.log(err);
        if(err.response.status==500){
            alert("Server not responding, please try again later");   
        }
        if(err.response.status==404){
            alert("User not found");
        }
        
    })
    // window.location.href='../Signin/signin.html';
}
// export default onSignup;