require("dotenv").config()
const mongoose = require('mongoose')
const express = require('express')
const Laptop = require("./model/Laptop")
const app = express()
app.use(express.json())

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}
connectDB();

app.get('/api/data', async (req, res)=>{
   const laptop = await Laptop.find()

    res.json(laptop)
})

app.post('/api/data', async (req, res)=>{
    const laptop = await Laptop.create(req.body)

    res.json(laptop)
})

app.get('/api/data/:id', async (req, res)=>{
    const laptop = await Laptop.findById(req.params.id)

    res.json(laptop)
})

app.put('/api/data/:id', async (req, res)=>{
    const laptop = await Laptop.findByIdAndUpdate(req.params.id,req.body,{new: true})

    if (!laptop) {
    return res.status(404).json({
        message: "Laptop not found"
    })
}

    res.json(laptop)
})

app.delete('/api/data/:id', async (req, res)=>{
    const laptop = await Laptop.findByIdAndDelete(req.params.id)

    res.json({
        message: "Laptop deleted successfully",
        laptop
    })
})


  app.listen(4000, ()=>{console.log('Server running...')})