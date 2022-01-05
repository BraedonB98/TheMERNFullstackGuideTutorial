const fs = require('fs');
const path = require('path') //required for express static path for file accessing

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const res = require('express/lib/response');

const MongoPassword = 'Y3BfyYa2b6nzPxor'
const url = `mongodb+srv://BraedonB98:${MongoPassword}@cluster0.webvv.mongodb.net/mern?retryWrites=true&w=majority`

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads','images')));//express.static(path)

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');//Access-control-Allow-Origin required to let browser use api, the the * can be replaced by urls (for the browser) that are allowed to use it
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')//Second values are what types of requests you want to accept
    next();
});

app.use('/api/places',placesRoutes); // /api/places...
app.use('/api/users',usersRoutes); // /api/users...

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.', 404);
    return(next(error));
});

app.use((error, req,res,next)=> {
    if(req.file){
        fs.unlink(req.file.path , (err) => {
            console.log(err);
        } )
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
.connect(url)
.then(() =>{
    app.listen(5000);//start the whole server only if it can successfully connect to mongoose otherwise it wont open the port to receive connections
})
.catch(error =>{
    console.log(error);
});
