const express = require('express')
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
let PORT = process.env.port||3000;
const sequelize = require('./database');
const User = require('./models/user');
const Carrier = require('./models/carrier');
const Contact = require('./models/contact')
let expirationInMin = 10 ;
let expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin))

app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized: false,
    expirationDate: expirationDate.toISOString()
}))

app.listen(PORT,()=>{
    console.log(`Server Listening To The Port:${PORT}`)
});

//sequelize.sync().then(() => console.log('db is ready'));
//sequelize.sync({alter: true}).then(() => console.log('db is ready'));




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
let serviceRoute = require('./routes/service');
app.use('/',serviceRoute)



module.exports = app