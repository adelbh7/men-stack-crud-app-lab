//import dependencies
const express = require ('express')
const mongoose=require ('mongoose')
const methodOverride=require ('method-override')
require ('dotenv').config() 
const morgan = require ('morgan')

// import model
const car = require ('./models/car')
const Car = require('./models/car')

//create an express app
const app = express()

//middleware setup
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(morgan("dev"))


// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
console.log("Connect To DB Succesfully")
})
.catch(()=>{
console.log("Error canot connect the DB")

})

//Routes

app.get("/cars", async (req,res)=>{
    const allCars= await car.find ();
    console.log(allCars)
res.render('allCarsMain.ejs',{allCars})
})


app.get("/cars/new", (req,res)=>{
res.render("newCarAdd.ejs")
})

app.post("/cars",async(req,res)=>{
    console.log(req.body)
req.body.hybrid=req.body.hybrid==="on"
await car.create(req.body)
res.redirect("/cars")
})

app.get ("/cars/:id", async(req,res)=>{
    try{
        const foundCar=await car.findById(req.params.id)
        console.log(foundCar)
        res.render("showCarDetails.ejs",{foundCar})
    }catch{
        res.render ('errorPage.ejs')
    }
})

app.delete("/cars/:id",async(req,res)=>{
    try {console.log(req.params)
    await car.findByIdAndDelete(req.params.id)
    res.redirect("/cars")
    } catch {'errorPage.ejs'}

})


app.get ("/cars/:id/edit", async (req,res)=>{
    const foundCar= await Car.findById (req.params.id)
    res.render("editCar.ejs",{foundCar})
})
app.put("/cars/:id", async (req,res)=>{
    req.body.hybrid=req.body.hybrid==="on"
    await Car.findByIdAndUpdate (req.params.id,req.body)
    res.redirect(`/cars/${req.params.id}`)
})



//Start the server
app.listen(3002,()=>{
    console.log('listeing to the port')
})

// app.get ("/", (req,res)=>{
//     console.log("hello")
// res.send ("Welcome this is root page, please provide full address")
// })


// app.get ("/test", (req,res)=>{
//     console.log('this will be redirected to test.ejs page')
//     res.render ('test.ejs')
// })