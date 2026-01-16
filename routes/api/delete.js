const express = require('express');
const router = express.Router();
const { db1 } = require('../../models/db'); // DB接続用 

//削除処理index側
router.post('/', (req, res) =>{
    const { id,title } = req.body;
    console.log(`${title}が削除されました`)
    db1.query(
        'DELETE FROM books WHERE id = ?',
        [parseInt(id)],
        (err) => {
            if(err) {
                console.error('削除中にエラーが発生しました:', err);
                return res.status(500).json({});
            };
            res.status(200).json({ redirect: '/home' });
        }
    );
});

module.exports = router;