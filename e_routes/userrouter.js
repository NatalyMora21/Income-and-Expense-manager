const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {signUp,signIn,isUserAuth}= require('../controllers/UsersController');
const verifyToken= require('../middlware/authjws');

//router.get('/',users);
//Register User
router.post('/signup',signUp);
//Loging user
router.post('/login',signIn);

router.get('/isUserAuth',verifyToken,isUserAuth);


module.exports = router;
