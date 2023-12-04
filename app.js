const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Configura la conexión a MongoDB Atlas
const uri = 'mongodb+srv://anubarah:cdcordobam@atlascluster.q3pg7xe.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conexión a MongoDB Atlas
client.connect(err => {
  if (err) {
    console.error('Error al conectar a MongoDB Atlas:', err);
    return;
  }
  console.log('Conexión exitosa a MongoDB Atlas');

  // Define el nombre de la base de datos y la colección
  const dbName = 'anubarah';
  const collectionName = 'anubarah';
  const collection = client.db(dbName).collection(collectionName);

// Ruta para manejar el envío del formulario de usuarios
app.post('/submit-usuario', (req, res) => {
    const formData = req.body;

    // Aquí puedes manejar los datos del formulario de usuarios y guardarlos en la base de datos
    collection.insertOne(formData, (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      console.log('Datos del formulario de usuarios insertados con éxito:', result.ops);
      res.status(200).send('Formulario de usuarios enviado correctamente');
    });
  });

  // Ruta para manejar el envío del formulario de personajes
  app.post('/submit-personaje', (req, res) => {
    const formData = req.body;

    // Aquí puedes manejar los datos del formulario de personajes y guardarlos en la base de datos
    collection.insertOne(formData, (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      console.log('Datos del formulario de personajes insertados con éxito:', result.ops);
      res.status(200).send('Formulario de personajes enviado correctamente');
    });
  });

  // Ruta para servir archivos estáticos
  app.use(express.static('public'));

  // Ruta para servir la página principal
  app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo HTML:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
      res.send(data);
    });
  });

  // Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Servidor web en http://localhost:${PORT}/`);
  });
});
