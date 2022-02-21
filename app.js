// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// const mongoose = require("mongoose");

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// // mongoose
// mongoose.connect("mongodb+srv://Admin-Rohan:adminrohansharma1199@cluster0.2vxj1.mongodb.net/itemsDB",{useNewUrlParser:true,useUnifiedTopology:true}); 

// // items schema
// const itemSchema = new mongoose.Schema({
//   itemName : {
//     type:String,
//     required:true 
//   }
// })

// // mongoose model
// const Item = mongoose.model("Item", itemSchema);




// app.get("/", function(req, res) {
// Item.find({},(err,foundItems)=>{
//   if(!err){
//     res.render("list",{
//       newListItems:foundItems
//     })
//   }
// })
// });

// app.post("/", function(req, res){
// // received data from bp
//   const newListItem = req.body.newItem;

//   // create
//   const item1 = new Item({
//     itemName : newListItem
//   })
//   item1.save();
//   res.redirect("/")
// });


// // the delete route
// app.post("/delete",(req,res)=>{
//   const checkedItemId = req.body.checkbox;
//   Item.deleteOne({_id:checkedItemId},(err)=>{
//     if(!err){
//       res.redirect("/")
//     }
//   })
// })


// app.get("/:customListName",(req,res)=>{
//   console.log(req.params.customListName);
// })

// app.listen(process.env.PORT || 3000, ()=>{
//   console.log("Server started on port 3000");
// });


const express = require("express");
const app = express();
const bodyParser = require ("body-parser")


const mongoose = require ("mongoose")

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


// mongoose
mongoose.connect("mongodb://localhost:27017/itemList",{useNewUrlParser:true, useUnifiedTopology:true})

const itemSchema = new mongoose.Schema({
item:{
  type: String, 
  require:true
}
})


const Item = mongoose.model("Item", itemSchema)


// route
app.get("/",(req,res)=>{
  Item.find({},(err,result )=>{
    if(!err){ 
      res.render("list",{
        result: result
      })
     
    }
    else{
      console.log(err)
    }
  })
})

app.post("/",(req,res)=>{
 
 var item1 = new Item({
  item : req.body.newItem
 })
 
 item1.save();
 res.redirect("/")
 
})
// delete route
 app.post("/delete",(req,res)=>{
   const idToBeDeleted = req.body.checkbox;
   Item.deleteOne({_id:idToBeDeleted},(err)=>{
     if(!err){
       res.redirect("/")
       console.log(`got deleted successfully :${idToBeDeleted}`) 
     }else{
       console.log(err);
     }
   })
 })


app.listen(3000,(req,res)=>{
  console.log("server started on port: 3000")
})



