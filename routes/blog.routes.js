const express = require('express');
const router = express();

const blog = require('../controllers/blog.controller');

router.post('/create', blog.create);
router.get('/all', blog.findAll);
router.put('/edit/:id', blog.edit);
router.delete('/delete/:id', blog.delete);

module.exports = router;