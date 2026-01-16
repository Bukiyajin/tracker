const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();

// ビューエンジンの設定
app.set('view engine', 'ejs');
app.set('views', './views');

// ミドルウェアの設定
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// セッションミドルウェアの設定
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

module.exports = app;
