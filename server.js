'use strict'

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const checkToken = require('./middleware/checkToken');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(checkToken);

app.use(authRoutes);
app.use(postsRoutes);
app.use(userRoutes);
app.use(statsRoutes);

mongoose.connect('mongodb://<>:<>@ds163354.mlab.com:63354/social_app', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongoDB')
        app.listen(8081, () => {
            console.log('app listening')
        });
    })
    .catch(err => {
        console.log(err)
    })
