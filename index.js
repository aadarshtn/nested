const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used For Session Cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}))
app.use(express.urlencoded());



// MiddleWare
app.use(cors());

app.use(cookieParser());

app.use(express.static('./assets'));

// Make The Uplaods path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

// Extracting Styles And Scripts From Body To Appropriate Positions In The Layout EJS File
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// Set Up The View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'nested',
    // TODO Change The Secret Before Deployment In Production Mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo db is set up and working fine');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);

// Use Express Router
app.use('/', require('./routes'));

// Making the server listen to required port
app.listen(8000, function(err){
    if(err){
        console.log(`Error In Running The Server : ${err}`);
    }
    console.log(`The Server Is Up And Running At Port :  ${port} `);
});