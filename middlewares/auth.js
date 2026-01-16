// middlewares/auth.js (または app.js 内)

// ユーザーがログインしているかチェックするミドルウェア
function isAuthenticated(req, res, next) {
    // ① ユーザーがログインしているかチェック
    if (req.session.userId) {
        // ② ログインしていれば、OK！次の処理へ進む
        next();
    } else {
        // ③ ログインしていなければ、ログインページへ追い返す
        // またはエラーメッセージを表示
        console.log('ログインをお願いします');
        res.redirect('/login');
    }
}

module.exports = isAuthenticated; // 他のファイルで使えるようにエクスポート