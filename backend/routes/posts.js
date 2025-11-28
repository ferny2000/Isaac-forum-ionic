const router = require('express').Router();
const pool = require('../db');

// Obtener todos los posts
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.title, p.content, p.image_url, p.created_at,
      u.username AS author
      FROM posts p
      INNER JOIN users u ON u.id = p.author_id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener posts", error });
  }
});

// Crear post nuevo
router.post('/', async (req, res) => {
  try {
    const { author_id, title, content, image_url } = req.body;

    if (!author_id || !title || !content)
      return res.status(400).json({ msg: "Campos incompletos" });

    await pool.query(
      "INSERT INTO posts (author_id, title, content, image_url) VALUES (?,?,?,?)",
      [author_id, title, content, image_url || null]
    );

    res.status(201).json({ msg: "Post creado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear post", error });
  }
});

module.exports = router;
