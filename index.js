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

app.post('/accountaangemaakt',(req, res)=> {
    try {
        // database logic schrijven..
        res.send('Naam: ' +req.body.user +' en wachtwoord: ' +req.body.password);   
    } catch (error) {
        throw new Error(error)
    }
});

app.get('/', (req, res) => {
    res.render('home', myData);
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup - BookBuddy'});
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - BookBuddy'});
});

app.use((req, res, next) => {
    res.status(404).send('404 page not found');
})

app.listen(PORT, () => {
    console.log('app running on port', PORT);
})