const express = require('express');
const router = express.Router();
const {db1} = require('../../models/db'); // DB接続用 

//読み終えた本登録処理
router.post('/', (req, res) =>{
    const { id, date_time } = req.body;
    db1.query('UPDATE books SET date_time = NOW(), is_finished = 1 WHERE id = ?',
        [parseInt(id)],
        (err) => {
            if (err){
                console.error('データベースエラー:', err);
                return res.status(500).json({ error: '内部サーバーエラー' });
            }
            res.status(200).json({ redirect: '/home'});
        }
    );
});

module.exports = router;