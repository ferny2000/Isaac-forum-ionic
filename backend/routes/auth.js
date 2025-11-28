const router = require('express').Router();
const pool = require('../db'); // Asegúrate que la ruta a tu db es correcta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTRAR USUARIO (Tu código original) ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "Faltan datos." });

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?,?,?)",
      [username, email, hash]
    );

    res.status(201).json({ success: true, message: "Usuario creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el registro", error: error.message });
  }
});


// --- LOGIN (AQUÍ ESTÁ LA CORRECCIÓN) ---
router.post('/login', async (req, res) => {
  try {
    // 1. ACEPTAR USERNAME (en lugar de email)
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Faltan datos." });
    }

    // 2. BUSCAR POR USERNAME
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username] // Usar username para la consulta
    );

    // Si no se encuentra el usuario
    if (!rows.length) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas." });
    }

    // 3. COMPARAR CONTRASEÑA
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas." });
    }

    // 4. CREAR TOKEN
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. DEVOLVER RESPUESTA COMPATIBLE CON IONIC
    // (El frontend [cite: `src/app/login/login.page.ts`] espera 'success: true' y 'user')
    res.json({ 
      success: true, 
      message: "Login correcto", 
      token: token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Error en /auth/login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor", error: error.message });
  }
});

module.exports = router;
