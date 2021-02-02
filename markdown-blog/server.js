const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Articles = require('./models/articles')
const articleRouter = require('./routes/articles');

mongoose.connect('mongodb://localhost/blog',  { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
const db =  mongoose.connection
db.on('error',(error) => console.log(error) );
db.once('open', () => console.log('Connected to Database'))

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    const articles = await Articles.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles });
})
app.listen(port, () => console.log(`Server started on port ${port}`))
app.use('/articles', articleRouter);
