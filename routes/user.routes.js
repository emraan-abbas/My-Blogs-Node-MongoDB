const express = require('express');
const router = express();

const user = require('../controllers/user.controller');
const tokenCheck = require('../middleware/routeCheck.route');

router.post('/create', tokenCheck, user.createUser);
router.get('/login', user.logIn);
router.put('/edit/:id', tokenCheck, user.edit);
router.delete('/delete/:id', tokenCheck, user.delete);

module.exports = router;
