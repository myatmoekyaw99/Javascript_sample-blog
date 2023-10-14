const posturl = 'http://localhost:3000/posts';

let post_section = document.getElementById('main-content');
let login_section = document.getElementById('login-form');
let register_section = document.getElementById('register-form');
let footer_section = document.getElementById('footer');

let registerBtn = document.getElementById('register-btn');
let loginBtn = document.getElementById('login-btn');

let loginform = document.getElementById('login');
let registerform = document.getElementById('register');
let output = '';

const renderPost = (posts) => {
    posts.forEach(element => {
        let d = new Date(element.created_at);
        output += `
        <div class="card">
             <div class="card-title">
                 <h1>${element.title}</h1>
                 <span class="small-text">Published at - ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? 'pm' : 'am'}</span><br>
             </div>
             <div class="card-body">
                 <img src="${element.image_url}" id="card-image">
                 <p class="content-text">${element.content.slice(0,30)}...</p><br>
                 <span class="small-text">Author - ${element.created_by}</span>
             </div>
             <div class="card-footer">
                 <a id="btn" href="detail.html?id=${element.id}">Read more >></a>
             </div>
         </div>`; 
     });
     post_section.innerHTML = output;
}

////////page start///////////
window.addEventListener('load',()=>{

    let ulist = document.getElementById('right-list');
    let left_list = document.getElementById('nav-list');

    if(!localStorage.getItem('login_user')){
        fetch(posturl).then(res => res.json()).then(data => {         
            renderPost(data.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            }).slice(0,20));
        });

    }else{
        fetch(posturl).then(res => res.json()).then(data => {
            renderPost(data.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            }));
        });

        const usarr = JSON.parse(localStorage.getItem('login_user'));

        left_list.innerHTML = `
        <a href="index.html" class="link"><li>Home</li></a>
        <a href="create.html" class="link"><li>Create Post</li></a>
        `;
        ulist.innerHTML = `
        <a class="right link" href="#login-form" id="logout-btn" onclick="logout()"><li>Logout</li></a>
        <a class="right link" href="#"><li>Welcome ${usarr["name"]}</li></a>
        `;
    }
});

loginBtn.addEventListener('click',()=>{
    post_section.style.display = 'none';
    footer_section.style.display = 'none';
    register_section.style.display = 'none';
    login_section.style.display = 'block';
});

registerBtn.addEventListener('click',()=>{
    post_section.style.display = 'none';
    footer_section.style.display = 'none';
    login_section.style.display = 'none';
    register_section.style.display = 'block';
});

//////////user registration///////////
registerform.addEventListener('submit', (e)=>{
    e.preventDefault();
    let username = document.getElementById('name').value;
    let email = document.getElementById('regemail').value;
    let password = document.getElementById('regpassword').value;

    let userArr = new Array();
    userArr = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [] ;

    if(userArr.some((v) => {return v.email == email}) && username === '' || email === '' || password === ''){
        alert('Email already exist or something wrong!');

    }else{
        userArr.push({
            "name" : username,
            "email" : email,
            "password" : password
        });
        localStorage.setItem('users',JSON.stringify(userArr));
        alert('Account registration successful.Please Login!');
        window.location.href = 'index.html';
    }
   
});

/////////login user check/////////
loginform.addEventListener('submit', (e) => {
    e.preventDefault();
   
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userArr = new Array();
    userArr = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [] ;
   
    if(userArr.some((v) => {return v.email == email && v.password == password && email !== '' && password !== ''})){
        alert('Login successful!');

        let curr_user = userArr.filter((v)=>{
            return v.email == email && v.password == password
        })[0];

        let user = {
            "name":curr_user.name,
            "email":curr_user.email,
            "password":curr_user.password
        };

        localStorage.setItem('login_user',JSON.stringify(user));
        window.location.href = 'index.html';
    }else{
        alert('Login failed!');
    }
});


///////logout///////
function logout(){
    localStorage.removeItem('login_user');
    window.location.href = 'index.html';
}