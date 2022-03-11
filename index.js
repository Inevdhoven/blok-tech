require('dotenv').config()
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'static/uploads/' });
const myData = require('./data/data.json');
const mongoose = require('mongoose');
const PORT = 3000;
const dbSleutel = process.env.MONGO_URI

mongoose.connect(dbSleutel, {useNewURLParser: true})
.then(()=> console.log('Database is geconnect'))
.catch(err => console.log(err))

// const connectDB = require('./config/connect');
const User = require('./models/User');

// connectDB(); 

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/static', express.static('static'));

app.use(express.urlencoded({extended: false}))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/accountaangemaakt', (req, res) => {
    try {
        User.findOne({email: req.body.email}).then((user) => {
            if (user) {
                //Wanneer er al een gebruiker is met dit emailadres
                return res.status(400).json({email: "Er is al een gebruiker met dit emailadres."});
            } else {
                //Wanneer er nog geen account is met dit emailadres
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmpassword: req.body.confirm_password,
                });

                if (req.body.password == req.body.confirm_password) {
                    console.log('wachtwoord is hetzelfde')
                } else {
                    console.log("wachtwoord is niet helzelfde")
                }  

                newUser.save()
                return res.status(200).json({newUser})
                // res.redirect('/account');
            }
        });
    } catch (error) {
        throw new Error(error);
    }
});

const data = JSON.parse(JSON.stringify(myData));
const people = data.people;

//Resource voor het inloggen https://www.youtube.com/watch?v=pzGQMwGmCnc
app.post('/ingelogd', (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({email: email, password: password}, function(err, user){
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if(!user) {
                return res.status(404).send();
            }

            //return res.status(200).send();
            res.redirect('/ingelogd');
        });

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

app.get('/account', (req, res) => {
    res.render('account', {data, title: 'Account - BookBuddy'});
});

app.get('/ingelogd', (req, res) => {
    res.render('ingelogd', {data, title: 'Ingelogd - BookBuddy'});
});

app.use((req, res, next) => {
    res.status(404).send('404 page not found');
});

app.listen(PORT, () => {
    console.log('app running on port', PORT);
});