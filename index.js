const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local-strategy');

const app = express();

const port = 8000;

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'Social',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    // mongo store used to store the session cookie in db
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    err => {
        console.log(err || 'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, err => {
    if(err)
        console.log(`Error in running the server: ${err}`);
    else    
        console.log(`Server is running on port: ${port}`);
});