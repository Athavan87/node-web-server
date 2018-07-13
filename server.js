//Dependencies
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Port number

const port = process.env.PORT || 3000;

//Express
var app = express();

//Directories
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//Middleware for track the server, how server works
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

//Maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


//directory
app.use(express.static(__dirname + '/public'));


//getting year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//changing text to uppercase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//Routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


//Listening server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
