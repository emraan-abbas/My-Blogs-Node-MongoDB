const express = require('express');
const router = express();

const userRoutes = require('./user.routes');
const blogRoutes = require('./blog.routes');

// User Routes
router.use('/user', userRoutes);

// Blog Routes
router.use('/blog', blogRoutes);

module.exports = router;
