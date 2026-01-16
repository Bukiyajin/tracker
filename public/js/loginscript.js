const btn = document.getElementById('action-btn');
const formRegister = document.forms['login_form'];
const usernameInput = formRegister?.querySelector('input[name="username"]');
const passwordInput = formRegister?.querySelector('input[name="password"]');
// inputフィールドの幅を調整
usernameInput?.setAttribute('size', '35');
passwordInput?.setAttribute('size', '35');

btn.addEventListener('click', async e => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // ✅ username のバリデーションチェック
    if (!usernameInput || !usernameInput.checkValidity()) {
        usernameInput?.reportValidity(); // ブラウザの標準エラーメッセージ表示
        return; // 中断
    }
    // ✅ password のバリデーションチェック
    if (!passwordInput || !passwordInput.checkValidity()) {
        passwordInput?.reportValidity(); // ブラウザの標準エラーメッセージ表示
        return; // 中断
    }
    // APIリクエスト
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();
        if (res.ok) {
            console.log('ログイン成功！');
            location.href = '/'; // 必要ならリダイレクト
        } else {
            console.error('ログイン中にエラーが発生しました:', result.error);
        }
    } catch (error) {
        console.error('ログイン中にエラーが発生しました:', error);
        alert('ログインに失敗しました');
    }

});
