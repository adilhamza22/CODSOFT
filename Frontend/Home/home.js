const logOut = () =>{
    localStorage.removeItem('token');
    window.location.href = '../Signin/signin.html';
}