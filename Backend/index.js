const express= require("express");
const app=express();
const path= require("path");
const port=8080;

const {v4:uuidv4}=require("uuid");
uuidv4();

const methodOverride = require('method-override');
app.use(methodOverride("_method"));


const mongoose=require("mongoose");
const { match } = require("assert");
mongoose.connect("mongodb://127.0.0.1:27017/userApp")
.then((res)=>{
    console.log("MongoDB Connection Successfull");
})
.catch((err)=>console.log(err));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

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

app.get("/users",async(req,res)=>{  //to show the form
    let users=await User.find();
    res.render("users",{users});
});

app.post("/register",async(req,res)=>{     //to genrate new user
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

//to show edit form
app.get("/users/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let user= await User.findById(id);
if(!user){
        return res.send("Oops! User not found");
    }
    res.render("edit",{user});
});

//to show user's profile
app.get("/users/:id",async(req,res)=>{
    let{id}=req.params;
    let user=await User.findById(id);
    if(!user){
        return res.send("User not found");
    }
    console.log(user);
    res.render("profile",{user});
});

//to modify/update the data

// app.patch("/users/:id",async(req,res)=>{
//     let { id } = req.params;
//     let updateData=req.body;
//     updateData.ageCheck=updateDataageCheck==="on";
//       await User.findByIdAndUpdate(id,req.body)
// //   if (user) {
// //     user.email = req.body.email;
// //     user.user=req.body.user;        // update email
// //   }
//   res.redirect("/users");
// });

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

app.delete("/users/:id", async(req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
//   users = users.filter(u => u.id !== id);   
  res.redirect("/users");
});





app.listen(port,()=>{
    console.log(`App is listening to the ${port}`);
});