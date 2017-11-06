const express = require('express');
const hbs = require('hbs');
const  fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');



app.use((request, response, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log')
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (request, response) => {
   // response.send('<h1>Hello, Express!</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Kiubas, kiubas, kiubas'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to fulfill request'
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000')
});