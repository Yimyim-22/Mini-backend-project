const express = require('express');
const app = express();

app.use(express.json())

app.get('/api/welcome', (req, res) => {
    res.json({
  "message": "Hello from Yimika's server"
});
})

const laptops = [
    {
        id: 1,
        brand: "Dell",
        model: "XPS 13",
        ram: "16GB"
    },
    {
        id: 2,
        brand: "Apple",
        model: "MacBook Air M3",
        ram: "8GB"
    },
    {
        id: 3,
        brand: "Lenovo",
        model: "ThinkPad X1 Carbon",
        ram: "16GB"
    },
    {
        id: 4,
        brand: "HP",
        model: "Spectre x360",
        ram: "32GB"
    },
    {
        id: 5,
        brand: "ASUS",
        model: "ROG Zephyrus G14",
        ram: "32GB"
    }
];

app.get('/api/data', (req, res)=> {
  res.json(laptops)
})

app.get('/api/data/:id', (req, res)=> {
  const id = parseInt(req.params.id)
  const laptop = laptops.find(laptop => laptop.id === id)

  if(!laptop){
    return res.status(404).json({
    "message": "Laptop not found"
})
  }

  res.json(laptop)

})

app.post('/api/data', (req,res)=> {
  const newLaptop = req.body

  const laptop = {
    id: laptops.length + 1,
    brand: newLaptop.brand,
    model: newLaptop.model,
    ram: newLaptop.ram
  }

  laptops.push(laptop)

  res.status(201).json(laptop)
})

app.put('/api/data/:id', (req, res)=> {
  const id = parseInt(req.params.id)
  const laptop= laptops.find(laptop=> laptop.id === id)

  if(!laptop){
    return res.status(404).json({
    "message": "Laptop not found"
})
  }

  const updatedLaptop = req.body

  laptop.brand = updatedLaptop.brand
  laptop.model = updatedLaptop.model
  laptop.ram = updatedLaptop.ram

  res.json(laptop)
})

app.delete('/api/data/:id', (req, res)=> {

  const id = parseInt(req.params.id)
  const laptop = laptops.find(laptop => laptop.id === id)

  if(!laptop){
    return res.status(404).json({
    "message": "Laptop not found"
})
  }

  const index = laptops.findIndex(laptop=> laptop.id === id)

  laptops.splice(index, 1)

  res.json(laptops)
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
});