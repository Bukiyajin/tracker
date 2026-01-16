const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const{userdb} = require('../../models/db'); // ← DB接続用（今使ってるやつ）

// POST /api/users ユーザー登録API
router.post('/', (req, res) => {
    const { username, password } = req.body;

  // 入力チェック（簡易）
    if (!username || !password) {
    return res.status(400).json({ error: 'ユーザー名とパスワードは必須です' });
    }

  // パスワードをハッシュ化
    bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'ハッシュ化失敗' });

    // DBに保存
    userdb.query(
        'INSERT INTO accounts (username, password) VALUES (?, ?)',
        [username, hash],
        (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            return res.status(409).json({ error: 'このユーザー名は既に登録されています' });
            }
            return res.status(500).json({ error: 'データベースエラー' });
        }

        return res.status(200).json('login', {});
        }
    );
    });   
});

module.exports = router;