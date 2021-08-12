const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('./database');
const app = express();
//settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Routes
app.use('/task', require(__dirname + '/routes/taskRoutes.js'));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Starting the Server
app.listen(app.get('port'), () => console.log(`server on port ${app.get('port')}`));