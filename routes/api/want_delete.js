const express = require('express');
const router = express.Router();
const { db2 } = require('../../models/db'); // DB接続用

//削除処理addwantbook側
router.post('/', (req, res) =>{
    const { id,title } = req.body;
    console.log(`${title}が削除されました`)
    db2.query(
        'DELETE FROM wants WHERE id = ?',
        [parseInt(id)],
        (err) => {
            if(err) {
                console.error('削除中にエラーが発生しました:', err);
                return res.status(500).json({});
            };
            res.status(200).json({ redirect: '/want' });
        }
    );
});

module.exports = router;