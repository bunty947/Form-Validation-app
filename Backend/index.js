require("dotenv").config();

const express= require("express");
const app=express();
const path= require("path");
const mongoose=require("mongoose");
const methodOverride = require('method-override');

const port=process.env.PORT|| 8080;

//middlewares

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

//View Engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//DB Connection

mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    console.log("MongoDB Connection Successfull");
})
.catch((err)=>console.log(err));

// console.log("ENV CHECK:", process.env.MONGO_URL);

//Creating Schema

const userSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
 email: {
  type: String,
  required: true,
  lowercase: true,
  match:/.+@.+\..+/
},
    password:{
        type:String,
        required:true,
        minlength:6,
        maxLength:9,
    },
    Gender:{
        type:String,
        required:true,
    },
    ageCheck: {
         type: Boolean, 
         required: true, }
}, 
{ timestamps: true });

const User= mongoose.model("User",userSchema);

//Express routes for user management

//show all users
app.get("/users",async(req,res)=>{  
    let users=await User.find();
    res.render("users",{users});
});

 //to create new user
app.post("/register",async(req,res)=>{    
    console.log(req.body);  
    try{ 
let {user,email,password,Gender,ageCheck} = req.body;
ageCheck=ageCheck==="on";
let newUser = {user,email,password,Gender,ageCheck};
await User.create(newUser);
res.redirect("/users");
    }
    catch(err){
        console.error(err);
        res.status(400).send("Error creating user");
    }
});

// Show user's profile

app.get("/users/:id",async(req,res)=>{
    let{id}=req.params;
    let user=await User.findById(id);
    if(!user){
        return res.send("User not found");
    }
    console.log(user);
    res.render("profile",{user});
});

//to show edit form
app.get("/users/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let user= await User.findById(id);
if(!user){
        return res.send("Oops! User not found");
    }
    res.render("edit",{user});
});

// edit/update the form
app.patch("/users/:id", async (req,res)=>{
    let { id } = req.params;
   let updatedData = {
        ...req.body,
        ageCheck: req.body.ageCheck === "on"
    };

    await User.findByIdAndUpdate(id, updatedData);
    console.log(req.body);

    res.redirect("/users");
});

//Delete User
app.delete("/users/:id", async(req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
});


//Server
app.listen(port,()=>{
    console.log(`App is listening to the ${port}`);
});
