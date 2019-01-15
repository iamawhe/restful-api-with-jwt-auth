const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', require('./routers/indexRoutes'));
app.use('/user', require('./routers/userRoutes'));

//listen to sever
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));
