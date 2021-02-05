const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const articleRouter = require('./routes/articlesRoute');

mongoose.connect('mongodb://localhost/blog',  { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
const db =  mongoose.connection
db.on('error',(error) => console.log(error) );
db.once('open', () => console.log('Connected to Database'))

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use('/articles', articleRouter);

app.listen(port, () => console.log(`Server started on port ${port}`))
