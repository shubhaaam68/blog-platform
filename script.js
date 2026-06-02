let currentUser = "";

function registerUser(){

    fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("regEmail").value,
            password:document.getElementById("regPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>alert(data.message));

}

function loginUser(){

    fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("loginEmail").value,
            password:document.getElementById("loginPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

        if(data.success){
            currentUser=data.email;
            loadPosts();
        }

    });

}

function createPost(){

    fetch("http://localhost:5000/createPost",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:currentUser,
            title:document.getElementById("blogTitle").value,
            content:document.getElementById("blogContent").value
        })
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);
        loadPosts();

    });

}

function loadPosts(){

    fetch("http://localhost:5000/posts")
    .then(res=>res.json())
    .then(posts=>{

        let div=document.getElementById("posts");

        div.innerHTML="";

        posts.forEach(post=>{

            div.innerHTML+=`
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>

                <button onclick="deletePost('${post._id}')">
                    Delete
                </button>

                <button onclick="commentPost('${post._id}')">
                    Add Comment
                </button>

            </div>
            `;

        });

    });

}

function deletePost(id){

    fetch(`http://localhost:5000/deletePost/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);
        loadPosts();

    });

}

function commentPost(id){

    const comment=prompt("Enter Comment");

    fetch("http://localhost:5000/comment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            postId:id,
            comment:comment
        })
    })
    .then(res=>res.json())
    .then(data=>alert(data.message));

}
