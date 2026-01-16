const express = require('express');
const router = express.Router();
const {db1} = require('../../models/db'); // DB接続用 

// 登録処理
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { title, author, total_pages, color, date_time, user_id } = req.body;

    if (!title) {
        alert('タイトルは必須です');
        return res.status(400).json({ error: 'タイトルは必須です' });
    }
    const totalPagesNum = parseInt(total_pages);
    if (isNaN(totalPagesNum) || totalPagesNum <= 0) {
        return res.status(400).json({ error: 'ページ数は正の整数で入力してください' });
    }

    db1.query(
        'INSERT INTO books (title, author, total_pages, color, user_id, date_time) VALUES (?, ?, ?, ?, ?, NOW())',
        [title, author, totalPagesNum, color, parseInt(userId)],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                    console.error('書籍登録エラー:', err);
                    return res.status(409).json('add', { error: 'この書籍は既に登録されています' }); //←機能してない
                }
                console.error('書籍登録エラー:', err);
                return res.status(500).json('add', { error: '書籍登録中にエラーが発生しました' });
            };
            console.log(`${title}の追加に成功しました！`);
            res.status(200).json({ redirect: '/home' });
        }
    );
});

module.exports = router;