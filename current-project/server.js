const express = require('express');
const mongoose = require('mongoose');
const subscribersRoute = require('./route/subscribersRoute')
require('dotenv').config()


const app = express();

const port = process.env.PORT || 3000;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db =  mongoose.connection
db.on('error',(error) => console.log(error) );
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())
app.use('/subscribers', subscribersRoute)

app.listen(port, () => console.log(`Server listening on port ${port}`));