const express = require('express'),
	path = require('path'),
	passport = require('passport'),
	helmet = require('helmet'),
	morgan = require('morgan'),
	keys = require('./config/keys'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cors = require('cors');

const app = express();

app.use(cors());
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
app.use('/api', require('./routers/authRoutes'));
app.use('/', require('./routers/indexRoutes'));


/* deployment:  production config for client routes*/
if (process.env.NODE_ENV === 'production') {
	//Express to serve up production assets, like main.js, main.css
	app.use(express.static('client/build'));

	//Express to serve index.html if requested route isn't recognized
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

/* Port to listen */
const PORT = process.env.PORT || 5000;

/* testing purposes */
if (require.main === module) {
	app.listen(PORT, () => console.log(`App started on PORT: ${PORT}...`));
} else {
	module.exports = app;
}
