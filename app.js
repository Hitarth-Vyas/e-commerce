const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorController = require('./controllers/error');
let port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', 'views'); 
 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

 // use() can use any http method 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
//as we used post method in shop.js, order doesn't matter
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(port);
