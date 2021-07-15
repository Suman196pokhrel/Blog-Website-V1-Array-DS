// Importing Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const ejs = require("ejs");
const nodemon = require('nodemon');
const app = express();


// Setting Up The Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Global Variables
const homeStartingContent = "Lacus  amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


var posts = [];


app.get("/",(req,res)=>{
     res.render('home',{homeContent :homeStartingContent,posts:posts})
});


app.post("/",function(req,res){
     
     var title = req.body.postTitle;
     var content = req.body.postBody;
     let post = {
          id: (math.random(1,99999)).toFixed(2),
          title: title,
          content: content

     }
     posts.push(post);

     res.redirect('/');

;})



app.get("/about",function(req,res){
     res.render('about',{aboutContent :aboutContent})
})
   
   
app.get("/contact",function(req,res){
     res.render('contact',{contactContent :contactContent})
})

app.get("/post/view/:postId",function(req,res){
     let tempPost = NaN;
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
               tempPost = post;
          }
     })
     console.log("Post ID Your Have Selected : " + tempPost.id);
     res.render('indiPost',{post:tempPost});
})


app.get("/post/add",function(req,res){
     res.render('createPost');
})

app.get("/post/delete/:postId",function(req,res){
     let tempPost2 = NaN;
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
               tempPost2 = post;
          }
     })

     console.log("Post ID Your Have Selected : " + tempPost2.id);

     res.render('deletePost',{post:tempPost2});
})

app.post("/post/delete/:postId",function(req,res){
     console.log("Post ID Your Have Selected for final deletion : " + req.params.postId);
     let index = NaN;
     // let index = Number(req.params.postId);
     
     // posts.splice(index, 1);
     // id -= 1;
     // console.log(posts)
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
                index = posts.indexOf(post);
               console.log("Your objects Indes is :> "+ index);
               
          }
     })
     posts.splice(index, 1);

     res.redirect('/');
})


app.get("/post/edit/:postId",function(req,res){
     let tempPost3 = NaN;
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
               tempPost3 = post;
          }
     })

     console.log("Post ID Your Have Selected : " + tempPost3.id);

     res.render('editPost',{post:tempPost3});
     
})
     

app.post("/post/edit/:postId",function(req,res){
     let editedTitle = req.body.editTitle;
     let editedBody = req.body.editBody;

     console.log("Edited Title is : "+ editedTitle);
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
              post.title = editedTitle;
              post.content = editedBody;
               
          }
     })

     res.redirect('/');
     
})
     



app.listen(process.env.PORT||3000,()=>{console.log("Node server running at port 3000 ...")})