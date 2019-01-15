const express = require('express'),
	morgan = require('morgan'),
	keys = require('./config/keys'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

const app = express();

//DB
mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => console.log('DB connected!'))
	.catch(err => console.log(err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', require('./routers/indexRoutes'));
app.use('/user', require('./routers/userRoutes'));

//listen to sever
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));
