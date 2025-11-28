const router = require('express').Router();
// Importamos el JSON directamente (Node.js lo permite)
const gameData = require('../data/isaac_data.json');

// Obtener toda la información del juego
router.get('/', (req, res) => {
  try {
    // Simplemente devolvemos el objeto JSON completo
    res.json(gameData);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener datos del juego", error });
  }
});

module.exports = router;