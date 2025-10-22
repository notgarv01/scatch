const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const indexRouter = require('./routes/indexRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter');
const expressSession = require('express-session');
const flash = require('connect-flash')

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET, // uses your .env secret
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false } // true only if HTTPS
}));
app.use(flash())
app.set('view engine', 'ejs')

app.use('/',indexRouter)
app.use('/users', usersRouter)
app.use('/owners', ownersRouter)
app.use('/products', productsRouter)

app.get("/owners", (req, res) => {
    res.send("Direct test works");
});

app.listen(3000, function(){
    // console.log("its running");
    
})

module.exports = app;