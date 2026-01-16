const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const { db2 } = require('../models/db');

const pagetitle = "ホンの虫";

// 著者名選択処理want側
router.post('/author-select-wants', (req, res) => {
    const { author } = req.body;
    db2.query(
        'SELECT * FROM wants WHERE author = ? ORDER BY author ASC',
        [author],
        (err, wbooks) => {
            if (err) throw err;
            const formattedWantBooks = wbooks.map(wbook => ({
                ...wbook,
                formatted_add_date: dayjs(wbook.add_date).format('YYYY-MM-DD HH:mm:ss')
            }));
            // 著者検索処理
            db2.query('SELECT DISTINCT author FROM wants ORDER BY author ASC', (err, authors) => {
                if (err) throw err;
                res.render('want', { wbooks: formattedWantBooks, authors, pagetitle });
            });
        }
    );
});

module.exports = router;
