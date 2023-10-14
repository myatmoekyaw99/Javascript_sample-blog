const posturl = 'http://localhost:3000/posts?id=1';

let left_side = document.getElementById('left-col');
let right_col_leftside = document.getElementById('right-col-leftside');
let right_col_rightside = document.getElementById('right-col-rightside');
let manage_buttons = document.getElementById('manage-buttons');
let ulist = document.getElementById('right-list');

function showPostDetail(post){
    // console.log('hello detail');
    const d = new Date(post[0].created_at);

    left_side.innerHTML = `
    <img src="${post[0].image_url}" class="left-image">
    `;

    right_col_leftside.innerHTML = `
    <li class="post-list"><i class="fa-solid fa-flag"></i>${post[0].title}</li>
    <li class="post-list"><i class="fa-solid fa-calendar-days"></i>${d.toLocaleDateString()}</li>
    <li class="post-list"><i class="fa-solid fa-clock"></i>${d.toLocaleTimeString()}</li>
    <li class="post-list"><i class="fa-solid fa-person"></i>${post[0].created_by}</li>
    `;

    manage_buttons.innerHTML = `
    <a href="create.html?id=${post[0].id}" class="manage-btn">Edit</a>
    <a href="#" class="manage-btn" onclick="deletePost(${post[0].id})">Delete</a>
    `;

    right_col_rightside.innerHTML = `
    <p class="post-content-detail">${post[0].content}</p>
    `;
}


window.addEventListener('load',()=>{

    if(localStorage.getItem('login_user')){   
        ulist.innerHTML = `<a class="right link" href="#login-form" id="logout-btn" onclick="logout()"><li>Logout</li></a>`;
    }

    let url = new URL(posturl);
    const params = {id : window.location.search.split('=')[1] };
    url.search = new URLSearchParams(params);
    // console.log();

    async function getData(){
        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                const message = 'Error with Status Code: ' + response.status;
                throw new Error(message);
            }
        
            const data = await response.json();
            showPostDetail(data);
        } catch (error) {
            console.log('Error: ' + error);
            }
    }
    getData();
});

/*****Delete Post****/
function deletePost(id){
   
    fetch(`http://localhost:3000/posts/${id}`,{
        method:"DELETE",
    }).then(res => res.json()).then(()=>{
        alert(`Post Id-${id} was successfully deleted!`);
        window.location.href = 'index.html';
    });
}

///////logout///////
function logout(){
    localStorage.removeItem('login_user');
    window.location.href = 'index.html';
}