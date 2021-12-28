const express = require('express');
const { check } = require('express-validator')

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup',
[check('email').normalizeEmail().isEmail() , check('password').isLength({min:5}) , check('name').not().isEmpty() ],//normalize email turns BraedonB98@gmail.com into braedonb98@gmail.com
 usersController.signup)

router.post('/login',
[],
 usersController.login)

module.exports = router;