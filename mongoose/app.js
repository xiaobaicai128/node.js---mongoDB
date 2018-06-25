var express = require('express');
var router = require('./router/router.js');
var app = express();
app.set('view engine','ejs');


app.get('/',router.showindex);

app.get('/add',router.showadd);

app.get('/doadd',router.doadd);

app.get('/update',router.doupdate);














app.listen(3000);
