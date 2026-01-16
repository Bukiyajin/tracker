const express = require('express');
const router = express.Router();
const {db2} = require('../../models/db'); // DB接続用 

// 読みたい本登録処理
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { title, author, user_id} = req.body;

    if (!title) {
        alert('タイトルは必須です');
        return res.status(400).json({ error: 'タイトルは必須です' });
    }

    db2.query(
        'INSERT INTO wants (title, author, user_id) VALUES (?, ?, ?)',
        [title, author, parseInt(userId)],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                    console.error('書籍登録エラー:', err);
                    return res.status(409).json('want', { error: 'この書籍は既に登録されています' }); //←機能してない
                }
                console.error('書籍登録エラー:', err);
                return res.status(500).json('want', { error: '書籍登録中にエラーが発生しました' });
            };
            console.log(`${title}の追加に成功しました！`);
            res.status(200).json({ redirect: '/want' });
        }
    );
});

module.exports = router;