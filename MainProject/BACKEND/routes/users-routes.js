const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('GET Request in Users')
    res.json({message:'It works!'});
});

module.exports = router;