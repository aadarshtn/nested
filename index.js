const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayout);

// Extracting Styles And Scripts From Body To Appropriate Positions In The Layout EJS File
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// MiddleWare
// Use Express Router
app.use('/', require('./routes'));
// Set Up The View Engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Making the server listen to required port
app.listen(8000, function(err){
    if(err){
        console.log(`Error In Running The Server : ${err}`);
    }
    console.log(`The Server Is Up And Running At ${port} `);
});