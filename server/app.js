const express = require('express'),
	passport = require('passport'),
	helmet = require('helmet'),
	morgan = require('morgan'),
	keys = require('./config/keys'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

const app = express();
app.use(helmet());
app.use(passport.initialize());

//DB
mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
	)
	.then(() => console.log('DB connected!'))
	.catch(err => console.log(err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', require('./routers/indexRoutes'));
app.use('/user', require('./routers/userRoutes'));

module.exports = app;
