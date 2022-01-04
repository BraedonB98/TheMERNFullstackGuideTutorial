const express = require('express');
const { check } = require('express-validator');
const req = require('express/lib/request');

const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', fileUpload.single('image'),
[check('email').normalizeEmail().isEmail() , check('password').isLength({min:5}) , check('name').not().isEmpty() ],//normalize email turns BraedonB98@gmail.com into braedonb98@gmail.com
 usersController.signup)

router.post('/login',
[],//checks on input go here but none needed for login
 usersController.login)

module.exports = router;