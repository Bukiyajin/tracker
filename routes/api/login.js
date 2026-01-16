const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {userdb} = require('../../models/db'); // DB接続用 
const pagetitle = "ホンの虫"; //タイトル 
//ログイン処理
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // データベースから該当するユーザーを検索
    userdb.query(
        'SELECT * FROM accounts WHERE username = ?',
        [username],
        (err, results) => {
        if (err) {
            if(err.code === 'ER_NO_DB_ERROR' || err.errno === 1046){
                return res.status(503).json('login', { pagetitle, message: 'ただいま、メンテナンス中です。しばしお待ちください'});
                }
                return res.status(500).json('login', { pagetitle, message: 'エラーが発生しました。しばらくしてから再度お試しください。'});
                /*console.error('データベース参照エラー:', err.message);
                return res.render('login', { pagetitle, message: 'ただいま、メンテナンス中です。しばしお待ちください'})*/ 
        }

        // ユーザーの存在チェック
        if (results.length === 0) {
            // ユーザーが見つからない場合
            return res.status(401).json('login', { pagetitle, message: 'ユーザー名またはパスワードが間違っています' });
        }

        // ユーザーが見つかった場合、そのユーザー情報を取得
        const user = results[0];

            // 入力されたパスワードとハッシュ化されたパスワードを比較
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                // パスワードが一致した場合
                req.session.userId = user.id; //IDをセッションに保存
                req.session.username = user.username; // ユーザ名をセッションに保存
                console.log('ログイン成功！');
                return res.status(200).json('select', { pagetitle });
                } else {
                // パスワードが一致しない場合
                res.status(401).json('login', { pagetitle, message: 'ユーザー名またはパスワードが間違っています' });
                }
            });
        }
    );
});

module.exports = router;