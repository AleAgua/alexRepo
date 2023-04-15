const express = require('express')
const router = express.Router()
const peliculasController =   require('../controllers/peliculas'); 

const multer = require('multer'); 
var img;
const storage = multer.diskStorage({ 
  destination: 'uploads/', 
  filename: function(req, file, callback) { 
    const img_nombre = file.originalname;                                                                                                        
    const img_nuevo_nombre = img_nombre.replace(/\s+/g,'-'); 
    const img = Date.now() + '-' + img_nuevo_nombre; 
    callback(null, img);
  } 
});
var upload = multer({ storage: storage }) 

router.get('/', peliculasController.findAll);

router.post('/', upload.single('img'), peliculasController.create);

router.get('/:id', peliculasController.findById);

router.post('/:id', upload.single('img'), peliculasController.update);

router.post('/eliminar/:id', peliculasController.delete); 

module.exports = router 
