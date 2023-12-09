const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()


app.use(express.json())

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// updata a product
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(400).json({message: `Can't find product of ID ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const products = await Product.findByIdAndDelete(id)
        if(!products) {
            return res.status(404).json({message: `Cannot find any products with ID ${id}`})
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// fetch specific id from mongodb database
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(res.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("url_from_mongoose_website").then(() => {
    app.listen(3000, () => {
        console.log(`Node App is running on 3000`)
    })
    console.log('connected to mongodb')
})
app.get('/', (req, res) => {
    res.send("response sent!")
})
