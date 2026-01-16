const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const isAuthenticated = require('../middlewares/auth');
const { db1, db2 } = require('../models/db');

const pagetitle = "ホンの虫";

// 選択フォームの表示
router.get('/', isAuthenticated, (req, res) => {
    console.log("#📖本の虫へ🐞ようこそ！#")
    res.render('select', {pagetitle, username: req.session.username});
});

// ユーザー登録フォーム
router.get('/register', (req, res) => {
    console.log("#こちらはユーザ登録ページです")
    res.render('register', {pagetitle, message:''});
});

// ログインフォーム
router.get('/login', (req, res) => {
    console.log("#こちらはログインページです")
    res.render('login', {pagetitle, message:''});
});

// 本の一覧フォームの表示
router.get('/home', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    
    db1.query('SELECT * FROM books WHERE is_finished = 0 AND user_id = ? ORDER BY author ASC', 
        [req.session.userId],
        (err, books) => {
            if (err) throw err;

            const formattedBooks = books.map(book => ({
                ...book,
                formatted_update_date: dayjs(book.date_time).format('YYYY-MM-DD HH:mm:ss')
            }));
            
            // 著者検索処理
            db1.query('SELECT DISTINCT author FROM books WHERE is_finished = 0 AND user_id = ? ORDER BY author ASC', 
                [req.session.userId],
                (err, authors) => {
                    if (err) throw err;
                    res.render('index', { books: formattedBooks, authors, pagetitle});
                }
            );
        }
    );
});

// 終わった本フォームの表示
router.get('/donebook', isAuthenticated, (req, res) => {
    console.log('#読み終えた本フォームに遷移しました');
    db1.query('SELECT * FROM books WHERE is_finished = 1', (err, finished) => {
        if (err) throw err;

        const formattedBooks = finished.map(book => ({
            ...book,
            formatted_update_date: dayjs(book.date_time).format('YYYY-MM-DD')
        }));

        res.render('donebook', {
            books: formattedBooks,
            pagetitle
        });
    });
});

// 登録フォームの表示
router.get('/add', isAuthenticated, (req, res) => {
    console.log("#登録フォームに遷移しました#");
    res.render('add', {pagetitle});
});

// 読みたい本登録フォームの表示
router.get('/addwantbook', isAuthenticated, (req, res) => {
    console.log("#ほしい本登録フォームに遷移しました#");
    res.render('addwantbook', {pagetitle});
});

// テストフォームの表示
router.get('/test', isAuthenticated, (req, res) => {
    db1.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        console.log("#テストフォームに遷移しました#")
        res.render('test', {books: results, pagetitle});
    });
});

// テストフォーム２の表示
router.get('/test2', (req, res) => {
    res.render('justtest');
});

// 読みたい本フォームの表示
router.get('/want', isAuthenticated, (req, res) => {
    db2.query('SELECT * FROM wants', (err, results) => {
        if (err) throw err;
        console.log("#読みたい本フォームに遷移しました#")
        const formattedWantBooks = results.map(wbook => ({
            ...wbook,
            formatted_add_date: dayjs(wbook.add_date).format('YYYY-MM-DD HH:mm:ss')
        }));
        
        // 著者検索処理
        db2.query('SELECT DISTINCT author FROM wants ORDER BY author ASC', (err, authors) => {
            if (err) throw err;
            res.render('want', { wbooks: formattedWantBooks, authors, pagetitle });
        });
    });
});

module.exports = router;
