const app = require('./app');

//start server

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => console.log( `Server listening on ${PORT}...` ) );

//refactor code for testing and scalability
