const mongoose = require ('mongoose');

const Product = require('./Models/product');

const MongoPassword = 'Y3BfyYa2b6nzPxor'
const url = 'mongodb+srv://BraedonB98:Y3BfyYa2b6nzPxor@cluster0.webvv.mongodb.net/products_test?retryWrites=true&w=majority'

mongoose.connect(url).then(()=>{console.log('Connected to database!')}).catch(()=>{console.log('Connection failed')});

const createProduct= async(req,res,next) =>{
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    const result = await createdProduct.save();

    res.json(result);
};
const getProducts = async(req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;