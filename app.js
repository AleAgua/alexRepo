const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path") 

const session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false})); 

const flash = require('express-flash'); 
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))

app.get('/', (req,res) => {
  var message = req.flash('message');  
  res.render('peliculas/index', {
    data: message, 
  })
})
app.get('/crear', (req,res) => {  
  res.render('peliculas/crear')
})
app.get('/leer', (req,res) => {  
  res.render('peliculas/leer')
})
app.get('/actualizar', (req,res) => {  
  res.render('peliculas/actualizar')
})


app.get('/renta', (req,res) => {  
  res.render('renta/index')
})
app.get('/rentacrea', (req,res) => {  
  res.render('renta/crear')
})


app.get('/provcrear', (req,res) => {  
  res.render('proveedor/crear')
})
app.get('/provlee', (req,res) => {  
  res.render('proveedor/leer')
})
app.get('/provac', (req,res) => {  
  res.render('proveedor/actualizar')
})
app.get('/provin', (req,res) => {  
  res.render('proveedor/index')
})

const ruta_peliculas = require('./routes/peliculas');
const ruta_renta = require('./routes/renta');
const ruta_proveedor = require('./routes/proveedor');
const con = require('./config/db');

app.use('/api/v1/peliculas', ruta_peliculas)
app.use('/api/v1/renta', ruta_renta)
app.use('/api/v1/proveedores', ruta_proveedor);

app.use("/uploads",express.static(path.join(__dirname, "uploads")))

mongoose
    .connect("mongodb+srv://Alex:I4P1omjTNJe6Ubmv@cluster0.pful48j.mongodb.net/exam?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`La Aplicación está funcionando en el puerto ${port}`);
});
