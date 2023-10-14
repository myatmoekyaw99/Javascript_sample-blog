const posturl = 'http://localhost:3000/posts';
const create_post = document.getElementById('create-form');

const title_value = document.getElementById('title');
const url_value = document.getElementById('url');
const author = document.getElementById('author');
const content_value = document.getElementById('content');
const submit_btn = document.getElementById('post-submit');
let ulist = document.getElementById('right-list');


function showValue(val){
    title_value.value = val[0].title;
    url_value.value = val[0].image_url;
    content_value.value = val[0].content
    author.value = val[0].created_by;
    submit_btn.innerText = "Update";
}

////////page start///////////
window.addEventListener('load',(e)=>{

    if(!localStorage.getItem('login_user')){
        window.location.href = 'index.html';
    }else{
        ulist.innerHTML = `<a class="right link" href="#login-form" id="logout-btn" onclick="logout()"><li>Logout</li></a>`;
    }

    const searchParams = new URLSearchParams(window.location.search);

    if(searchParams.has("id")){
        // console.log(searchParams.get("id"));

        fetch(`${posturl}?id=${searchParams.get("id")}`).then(res => res.json()).then(data => {
            showValue(data);
        });
    }

});

submit_btn.addEventListener('click',(e) => {

    const searchParams = new URLSearchParams(window.location.search);
    if(e.target.innerText == "Update"){
        e.preventDefault();
        fetch(`${posturl}/${searchParams.get("id")}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title:title_value.value,
                image_url: url_value.value,
                content: content_value.value,
                created_by: author.value
            }),
        }).then(res => res.json()).then(data => {
            alert(`Post id-${data.id} successfully updated!`);
            window.location.href = 'index.html';
        });
    }
    
});

/*/////insert new post//////*/
create_post.addEventListener('submit', (e)=>{

    e.preventDefault();
    // console.log(Date());
    fetch(posturl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:'',
            title:title_value.value,
            image_url: url_value.value,
            content: content_value.value,
            created_at: Date(),
            created_by: author.value
        }),
    }).then(res => res.json()).then(data => {
        alert(`Create new post ${data.title} successful!`);
        location.reload();
    });
});

///////logout///////
function logout(){
    localStorage.removeItem('login_user');
    window.location.href = 'index.html';
}

