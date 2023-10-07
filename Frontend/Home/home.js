// const axios  = require("axios");

const logOut = () =>{
    localStorage.removeItem('token');
    window.location.href = '../Signin/signin.html';
}

const getAllPosts = async ()=>{
    await axios.get("http://localhost:5001/api/author",{headers:{"Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
    .then((response)=>{
        console.log(response);
        if(response.data.message == "jwt expired"){
            alert("Session expired, please login again");
            window.location.href = '../Signin/signin.html';
        }
    })
    .catch((err)=>{
        console.log(err);
        alert(err);
    })
}

const createNewPost = async ()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    await axios.post("http://localhost:5001/api/posts/create",{
        //this is hardcoded make it dynamic user form
        "title":"new post",
        "desc":"new post desc",
        "body":"new post body",
        "user":user,
    },{headers:{"Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
    .then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });
}

