const express = require('express');
const router = express.Router();
const { db1 } = require('../../models/db'); // DB接続用

// 進捗更新処理
router.post('/', (req, res) => {
    const { id, current_pages } = req.body;
    console.log('更新されました');
    db1.query(
        'UPDATE books SET current_pages = ? WHERE id = ?',
        [parseInt(current_pages), parseInt(id)],
        (err) => {
            if (err) {
                console.error('進捗更新エラー:', err);
                return res.status(500).json({ error: '進捗更新中にエラーが発生しました' });
            }
            res.status(200).json({ redirect: '/home' });
        }
    );
});

module.exports = router;