const router = require('express').Router();
const pool = require('../db');

// Obtener replies de un post
router.get('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;

    const [rows] = await pool.query(`
      SELECT r.id, r.content, r.created_at,
      u.username AS author
      FROM replies r
      INNER JOIN users u ON u.id = r.user_id
      WHERE r.post_id = ?
      ORDER BY r.created_at ASC
    `, [post_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener replies", error });
  }
});

// Crear reply
router.post('/', async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;

    if (!post_id || !user_id || !content)
      return res.status(400).json({ msg: "Campos incompletos" });

    await pool.query(
      "INSERT INTO replies (post_id, user_id, content) VALUES (?,?,?)",
      [post_id, user_id, content]
    );

    res.status(201).json({ msg: "Reply agregado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar reply", error });
  }
});

module.exports = router;
