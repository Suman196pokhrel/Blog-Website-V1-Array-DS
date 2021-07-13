// Importing Dependencies

const express = require('express');
const bodyParser = require('body-parser');
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
var id = 0;

app.get("/",(req,res)=>{
     res.render('home',{homeContent :homeStartingContent,posts:posts})
});


app.post("/",function(req,res){
     var title = req.body.postTitle;
     var content = req.body.postBody;
     id = id+1;
     let post = {
          id: id,
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


app.get("/addpost",function(req,res){
     res.render('createPost');
})


app.get("/post/view/:postId",function(req,res){
     console.log("Inside Post Route");
     let tempPost = NaN;
     posts.forEach((post)=>{
          if(post.id == req.params.postId){
               console.log("The PostID is :> " + req.params.postId + 'And post.id is :> '+ post.id);
               tempPost = post;
          }
     })
     res.render('indiPost',{post:tempPost});
})





app.listen(process.env.PORT||3000,()=>{console.log("Node server running at port 3000 ...")})