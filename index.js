const express = require('express');
const app = express();
const { engine } = require('express-handlebars')
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/static', express.static('static'));

app.get('/', onHome);
app.get('/signup', onSignUp)
app.get('/login', onLogIn)

function onHome(req, res) {
    res.render('home', {
        post: {
            author: 'Ine van den Hoven',
            age: '22',
            comments: []
        }
    });
}

function onSignUp(req, res) {
    res.render('signup');
}

function onLogIn(req, res) {
    res.render('login');
}

app.use((req, res, next) => {
    res.status(404).send('404 page not found');
})

app.listen(PORT, () => {
    console.log('app running on port', PORT);
})