//initializing dependecies and modules
const port=4000;
const express=require("express");//for creating API
const app =express();//created app instance using express
const mongoose=require("mongoose");// for databases ,Connects Node.js to MongoDB and defines schemas
const jwt =require("jsonwebtoken");// for userauth system , Used for login tokens
const multer=require("multer");//for storing images
const path=require("path");//using this path we can get access to backend directory in our express app
const cors=require("cors");//using this we can add permision to our appli. to access the backend ,Allows frontend (React) to talk to backend
//Without it → browser blocks API calls
const { error } = require("console");
const { type } = require("os");
app.use(cors());
app.use(express.json());
//database connection with mongodb
mongoose
  .connect("mongodb+srv://yashjha:Yashjha%4088@cluster0.umblvhw.mongodb.net/e-commerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//API Creation

app.get("/",(req,res)=>{
    res.send("Express is Running")
})

//Image Storage Engine - You are allowing your server to receive an image, save it on disk, and give back a URL to access it.

const Storage=multer.diskStorage({ //multer.diskStorage(...) — “Where & how to save image You are telling multer:“When someone uploads a file:Save it inside upload/images Give it a unique name”
    destination:'./upload/images',
    filename:(req,file,cb)=>{//You are generating a unique filename so files don’t overwrite each other.
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)//file.fieldname → name used in Postman / frontend (product)Date.now() → current timestamppath.extname(...) → keeps .png, .jpg, etc.
    }
})

const upload=multer({storage:Storage}) //“Create an upload handler using the rules we just defined.”This upload is now a middleware.

//Creating Uplaod Endpoint for images
app.use("/images",express.static('upload/images'))//express.static — “Make images publicly accessible” ,“If someone opens /images/filename.png,serve the file from upload/images.” 
// So this URL works in browser: http://localhost:4000/images/product_1705734523456.png
//Without this line → image exists on disk but browser can’t access it.
app.post("/upload",upload.single('product'),(req,res)=>{//API to upload image //keyname product type: multipart/form-data
res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})
// 🧠 What happens when you hit /upload?
// Step-by-step flow:// Client (Postman / React) sends a file// key name: product// type: multipart/form-data// upload.single('product')
// extracts the file// saves it to disk// puts file info in req.file// File is saved upload/images/product_1705734523456.png
//What is upload.single('product') exactly? “Expect one file(Handle single image), and its key name must be product” Server responds with image URL
//{ "success": 1,"image_url": "http://localhost:4000/images/product_1705734523456.png"}


//  Schema for Creating Products

const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,//idhr jo upload sai url mila vo daalengai
        required:true
    },
    category:{
        type:String,
        required:true
 },
 old_price:{
        type:Number,
        required:true
 },
 new_price:{
        type:Number,
        required:true
 },
 date:{
       type:Date,
       default:Date.now
 },
 available:{
    type:Boolean,
    default:true
 }

})
//1️⃣ Why do we need Upload API if we already have Add Product API?Because image ≠ product data.Think like this (real-world analogy):
// Upload API → “Upload photo to server & give me its URL”
// Add Product API → “Save product details in mongo database using that image URL”// They do two different jobs.

app.post('/addproduct', async (req, res) => {
    let products =await Product.find({});//saare products array(products) mai store krliye
    let id;//isse ab hume separatley id enter krne ki need ni hai ye khud assign krdega id
    if(products.length>0){
        let lastarrayproduct = products.slice(-1);
        let lastproduct = lastarrayproduct[0];
        id = lastproduct.id + 1;

    }else{
        id=1;
    }

  const product = new Product({ //Product → Class ,product → Object made from that class
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
console.log(product)
  await product.save();//save hone mai time lg skta isliye await use
console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id:req.body.id});//save hone mai time lg skta isliye await use
console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for getting all products

app.get('/allproducts', async (req, res) => {
 let products =await Product.find({});
console.log("all products fetched");
  res.send(products);
});



app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port"+port)
    }else{
        console.log("Error : "+error)
    }
})