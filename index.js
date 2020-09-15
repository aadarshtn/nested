const express = require('express');
const app = express();
const port = 8000;

// MiddleWare
// Use Express Router
app.use('/', require('./routes/index'));


// Making the server listen to required port
app.listen(8000, function(err){
    if(err){
        console.log(`Error In Running The Server : ${err}`);
    }
    console.log(`The Server Is Up And Running At ${port} `);
});