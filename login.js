
let onClickLogin = document.getElementById("login-btn")

onClickLogin.addEventListener("click", async function(){
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    console.log("in login function")
    const response = await fetch("https://dummyjson.com/auth/login", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput,
        }),
    });
    const data= await response.json();

    let user=null;
    user={...data};
    console.log(user.token);

    if(user.token){
        localStorage.setItem("user",JSON.stringify(user));
        window.location.replace("http://127.0.0.1:5500/home.html");
        console.log("login success")
    }
    else 
    {
        alert("Invalid Credentials !!! ");
    }
});




