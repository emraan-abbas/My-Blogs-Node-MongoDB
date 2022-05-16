const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/MyBlog', {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Database Connected !');
  })
  .catch((error) => {
    console.log('Error at DB Connection !', error);
    process.exit();
  });

// Defining Routes
app.use('/myblog', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My Blog Application is UP on Port: ${PORT}`);
});
