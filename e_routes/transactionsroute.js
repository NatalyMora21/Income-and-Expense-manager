const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {createUser,users}= require('../controllers/UsersController')


router.get('/',users);
//router.post('/signin',controllersUser);
//Register User
router.post('/signup',createUser);
//router.post('/signin',controllersUser);

module.exports = router;