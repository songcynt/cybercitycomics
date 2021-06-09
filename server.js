var PORT = process.env.PORT || 3000;

//imports
const express = require('express');
const router = require('./public/router');

const app = express();

app.set('view engine', 'ejs');

// allow access to input from search box
app.use(express.urlencoded({extended: false}));

app.use('/', router);

// access static css file in public folder
app.use('/public', express.static('public'));

app.listen(PORT);
  