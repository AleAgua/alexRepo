const express = require('express')
const router = express.Router()
const rentaController =   require('../controllers/renta'); 

const multer = require('multer'); 

router.get('/', rentaController.findAll);

router.post('/', rentaController.create);

router.get('/:id', rentaController.findById);

router.post('/:id', rentaController.update);

router.post('/eliminar/:id', rentaController.delete); 

module.exports = router 
