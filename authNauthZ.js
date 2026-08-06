const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config()
const mongoose = require('mongoose')
const express = require('express')
const User = require("./model/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}
connectDB();

const authorizationToken = (req,res,next)=>{

const authHeader = req.headers.authorization

if (!authHeader) {
        return res.status(401).send("Access denied. No token provided");
    }

const token = authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).send("Access denied. No token provided");
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode

        next()

    } catch (error) {
        console.log(error.message)
        res.send("Invalid token")
    }
}

app.get('/api/users', async(req, res)=>{
    try {
    const users = await User.find()
    res.json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/register', async(req, res)=>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({
        email: req.body.email,
        password: hashedPassword
    })

    res.send("User succesfully created")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/login', async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
    if (user == null) {
        return res.send("User not found")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
           const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
           )
        
           res.json({token})
        }
        else{
            res.send("incorrect password")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/api/data", authorizationToken, async (req, res) => {
    console.log(req.user);
    res.send("Protected route accessed successfully");
});

app.put('/api/users/:id', authorizationToken, async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(user)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/api/users/:id', authorizationToken, async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user)
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(5000, ()=>console.log("Server Running"))