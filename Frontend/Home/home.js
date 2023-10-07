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
            return;
        }
        let posts = response.data.posts;
        let postsContainer = document.getElementById('posts-container');
        let postsHTML = document.createElement('div');
        
        posts.forEach((post)=>{
            console.log(post);
            postsHTML.innerHTML += 
            `<div class=" col-md-4 col-sm-12 m-1">
                <div class="card blog-card" style="width: 100%; height: 100%;">
                <img src="../Assets/greg-johnson-zZfw1ChCy9M-unsplash.jpg" class="card-img-top" alt="..." height="150px" width="150px">
                <div class="card-body">
                  <p class="card-text">${post.desc}</p>
                </div>
              </div>
            </div>`
            // div.innerHTML = postsHTML;  
            postsContainer.appendChild(postsHTML);

        });
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

