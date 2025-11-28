require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Servir imágenes estáticas (para las fotos de los posts)
app.use('/uploads', express.static('uploads')); 

// Rutas
app.get('/', (req, res) => {
  res.send('✅ Isaac Forum API funcionando correctamente');
});

// Importar subrutas
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
// app.use('/replies', require('./routes/replies')); // (Si ya la tienes)

// 👇 NUEVA RUTA DE INFORMACIÓN
app.use('/info', require('./routes/info')); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// para correr se usa npm run dev