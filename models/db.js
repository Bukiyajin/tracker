const mysql = require('mysql2');
require('dotenv').config(); // .envファイルの読み込み
// MySQL接続設定
const db1 = mysql.createConnection({ //メイン
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BOOK_TRACKER
});
const db2 = mysql.createConnection({ //ほしい本
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_WANT_BOOKS
});
const userdb = mysql.createConnection({ //ユーザー
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_ACCOUNTS
});

module.exports = { db1, db2, userdb };