const express = require('express');
const router = express.Router();

// ログアウト処理
router.get('/logout', (req, res) => {
    // セッションを破棄する
    req.session.destroy((err) => {
        if (err) {
            console.error('セッション破棄エラー:', err);
            return res.redirect('/'); // エラー時もとりあえずトップに戻す
        }
        console.log('ログアウトしました。');
        res.redirect('/login'); // ログアウト後、ログインページにリダイレクト
    });
});

module.exports = router;
