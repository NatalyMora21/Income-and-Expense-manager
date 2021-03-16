const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {signUp,signIn}= require('../controllers/UsersController')

//router.get('/',users);
//Register User
router.post('/signup',signUp);
//Loging user
router.post('/login',signIn);

module.exports = router;
