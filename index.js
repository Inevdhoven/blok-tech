// Hier word alles opgehaald wat nodig is voor BookBuddy
require('dotenv').config();

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
// const myData = require('./data/data.json');

// Schema word opgehaald uit het mapje models
const User = require('./models/User');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const dbSleutel = process.env.MONGO_URI;
require('./passport-config')(passport);

// Regelt connectie met database
mongoose.connect(dbSleutel, { useNewURLParser: true })
    .then(() => console.log('Database is geconnect'))
    .catch(err => console.log(err));

// Regelt connectie met database via config/connect.js
// const connectDB = require('./config/connect');
// connectDB();

// Express
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/static', express.static('static'));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({
    extended: true,
}));

// ROUTES
// Signup
// Source https://soufiane-oucherrou.medium.com/user-registration-with-mongoose-models-81f80d9933b0
app.post('/signup', async (req, res) => {
    try {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                // Wanneer er al een gebruiker is met dit emailadres
                return res.status(400).json({ email: 'Er is al een gebruiker met dit emailadres.' });
            } else {
                // Genereer hash password
                // Source https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
                const hash = bcrypt.hashSync(req.body.password, 10);
                const verified = bcrypt.compareSync(req.body.confirm_password, hash);

                // Wanneer er nog geen account is met dit emailadres dan wordt er een nieuw account aangemaakt
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    confirmpassword: verified,
                });

                // console.log(newUser.name)
                newUser.save();
                // return res.status(200).json({newUser})
                return res.redirect('/login');
            }
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Login
app.post('/login', (req, res, next)=> {
    let errors = [];
    passport.authenticate('local', {
        failureFlash: true,
        successRedirect: '/account',
        failureRedirect: `/login?email=${req.body.email}`, 
    })(req, res, next)
    errors.push({msg: 'email not found'}) 
});

// Account aanpassen
app.post('/update', async (req, res) => {
    User.findOneAndUpdate({ name:req.user.name }, { name:req.body.name }, { new: true }, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('name updated');
        }
    });
    User.findOneAndUpdate({ email:req.user.email }, { email:req.body.email }, { new: true }, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('email updated');
        }
    });
    // Source https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
    const hash = bcrypt.hashSync(req.body.password, 10);
    const verified = bcrypt.compareSync(req.body.confirm_password, hash);
    User.findOneAndUpdate({ password:req.user.password }, { password:hash }, { new: true }, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('password updated');
        }
    });
    User.findOneAndUpdate({ confirmpassword:req.user.confirm_password }, { confirmpassword:verified }, { new: true }, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('password updated');
        }
    });
    res.redirect('/account');
});

// Data ophalen uit database
app.get('/account', async (req, res) => {
    res.render('account', {
        name: req.user.name,
        email: req.user.email,
        title: 'Account - BookBuddy'
    });
});

// const data = JSON.parse(JSON.stringify(myData));
// const people = data.people;
// console.log(people[0].name)

app.get('/', (req, res) => {
    res.render('home', { title: 'BookBuddy' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup - BookBuddy' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - BookBuddy' });
});

passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user)=> {
        done(err, user);
    })
});

// 404 pagina laden als de pagina niet bestaat
app.use((req, res) => {
    res.status(404).send('404 page not found');
});

// Localhost opstarten
app.listen(PORT, () => {
    console.log('app running on port', PORT);
});

// Resource https://www.youtube.com/watch?v=pzGQMwGmCnc
// app.post('/login', (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         User.findOne({ email: email, password: password }, function (err, user) {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send();
//             }

//             if (!user) {
//                 return res.status(404).send();
//             }

//             // return res.status(200).send();
//             return res.redirect('/account');
//         });
//     } catch (error) {
//         throw new Error(error);
//     }
// });