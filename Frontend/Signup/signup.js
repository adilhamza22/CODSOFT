// import axios from 'axios';

// const { response } = require("../../Backend/app");

async function onSignup (){
        let firstName = document.getElementById('f-name').value;
        console.log(firstName);
        let lastName = document.getElementById('l-name').value;
        console.log(lastName);
        let email = document.getElementById('email').value;
        console.log(email);
        let password = document.getElementById('password').value;
        console.log(password);

        if(!firstName || !lastName || !email || !password){
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

        await axios.post('http://localhost:5001/api/auth/signup',{
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "password":password
        }).then((response)=>{
            console.log(response);
            // if(response.status==201){
            //     alert("Signup successful");
            // }
            window.location.href='../Signin/signin.html';
        }).catch((err)=>{
            console.log(err);
            if(err.response.status==500){
                alert("Server not responding, please try again later");   
            }
            
        })
        // window.location.href='../Signin/signin.html';
}
// export default onSignup;