const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {createtransaction,alltransactions}= require('../controllers/transactionsController');
const verifyToken= require('../middlware/authjws');

//Consultar todas las transacciones del usuario
router.get('/',verifyToken,alltransactions);

//Crear una transacción (Ingreso o egreso)
router.post('/create',verifyToken,createtransaction);

//Modificar una transacción (Ingreso o egreso)
router.put('/modify',verifyToken,createtransaction);

//Eliminar transacción
router.delete('/delete',verifyToken,createtransaction);


module.exports = router;