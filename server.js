const express = require('express');
const articleRouter = require('./public/articles');

var PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/comic', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true});


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use('/', articleRouter);

app.use('/public', express.static('public'));

app.listen(PORT);
  