const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'static/uploads/' });
const myData = require('./data/data.json');
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/accountaangemaakt', (req, res) => {
    try {
        res.send('Email: ' + req.body.email +' en wachtwoord: ' + req.body.password);
    } catch (error) {
        throw new Error(error);
    }
});

const data = JSON.parse(JSON.stringify(myData));
const people = data.people;

app.post('/ingelogd', (req, res) => {
    try {
        // database logic schrijven..
        // res.send('Email: ' +req.body.email +' en wachtwoord: ' +req.body.password);
        
        const first = req.body.email == people[0].email & req.body.password == people[0].password;
        const second = req.body.email == people[1].email & req.body.password == people[1].password;

        if( first || second) {
            res.send('Je bent ingelogd');  
        } else {
            res.send('Probeer het nog een keer');
        }

    } catch (error) {
        throw new Error(error);
    }
});

// console.log(people[0].name)

app.get('/', (req, res) => {
    res.render('home', {data, title: 'BookBuddy'});
});

app.get('/signup', (req, res) => {
    res.render('signup', {data, title: 'Signup - BookBuddy'});
});

app.get('/login', (req, res) => {
    res.render('login', {data, title: 'Login - BookBuddy'});
});

app.use((req, res, next) => {
    res.status(404).send('404 page not found');
});

app.listen(PORT, () => {
    console.log('app running on port', PORT);
});