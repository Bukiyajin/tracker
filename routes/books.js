const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { db1 } = require('../models/db');

const pagetitle = "ホンの虫";

// 著者名選択処理
router.post('/author-select-books', (req, res) => {
    const { author } = req.body;
    db1.query(
        'SELECT * FROM books WHERE author = ? ORDER BY author ASC',
        [author],
        (err, books) => {
            if (err) throw err;
            const formattedBooks = books.map(book => ({
                ...book,
                formatted_update_date: dayjs(book.date_time).format('YYYY-MM-DD HH:mm:ss')
            }));
            // 著者検索処理
            db1.query('SELECT DISTINCT author FROM books ORDER BY author ASC', (err, authors) => {
                if (err) throw err;
                res.render('index', { books: formattedBooks, authors, pagetitle });
            });
        }
    );
});

// 削除処理donebook側
router.post('/finish_delete', (req, res) => {
    const { id, title } = req.body;
    console.log(`${title}が削除されました`)
    db1.query(
        'DELETE FROM books WHERE id = ? AND is_finished = 1',
        [parseInt(id)],
        (err) => {
            if(err) throw err;
            res.redirect('/donebook');
        }
    );
});

module.exports = router;
