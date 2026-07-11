const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_CONNECTION_STRING")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const postSchema = new mongoose.Schema({
    email: String,
    title: String,
    content: String
});

const commentSchema = new mongoose.Schema({
    postId: String,
    comment: String
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Register
app.post('/register', async (req,res)=>{

    const {email,password}=req.body;

    const user = new User({
        email,
        password
    });

    await user.save();

    res.json({
        message:"User Registered"
    });

});

// Login
app.post('/login', async (req,res)=>{

    const {email,password}=req.body;

    const user = await User.findOne({
        email,
        password
    });

    if(user){

        res.json({
            success:true,
            email:user.email,
            message:"Login Success"
        });

    }else{

        res.json({
            success:false,
            message:"Invalid Credentials"
        });

    }

});

// Create Post
app.post('/createPost', async (req,res)=>{

    const {email,title,content}=req.body;

    const post = new Post({
        email,
        title,
        content
    });

    await post.save();

    res.json({
        message:"Post Created"
    });

});

// Get Posts
app.get('/posts', async (req,res)=>{

    const posts = await Post.find();

    res.json(posts);

});

// Delete Post
app.delete('/deletePost/:id', async (req,res)=>{

    await Post.findByIdAndDelete(req.params.id);

    res.json({
        message:"Post Deleted"
    });

});

// Add Comment
app.post('/comment', async (req,res)=>{

    const {postId,comment}=req.body;

    const newComment = new Comment({
        postId,
        comment
    });

    await newComment.save();

    res.json({
        message:"Comment Added"
    });

});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
