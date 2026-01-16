const btn = document.getElementById('action-btn');
const formRegister = document.forms['register_form'];
const usernameInput = formRegister?.querySelector('input[name="username"]');
const passwordInput = formRegister?.querySelector('input[name="password"]');

// ユーザ名とパスワードの入力欄サイズを取得
const textSize = 15;

// ユーザ名とパスワードの最小・最大文字数を取得
const usernameMin = formRegister?.getAttribute('minlength') || 3;
const usernameMax = formRegister?.getAttribute('maxlength') || 15;
const passwordMin = formRegister?.getAttribute('minlength') || 6;
const passwordMax = formRegister?.getAttribute('maxlength') || 20;

const usernamePattern = new RegExp(`^[a-zA-Z0-9_]{${usernameMin},${usernameMax}}$`);

// ユーザ名の入力欄サイズを設定
usernameInput.setAttribute('size', textSize);
usernameInput.setAttribute('placeholder', 'ユーザー名を入力');
passwordInput.setAttribute('size', textSize);
passwordInput.setAttribute('placeholder', 'パスワードを入力');

//ボタン処理
btn.addEventListener('click', async e => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // バリデーションチェック
    if (!usernameInput || !usernameInput.checkValidity()) {
        usernameInput?.reportValidity();
        return;
    }
    if (!passwordInput || !passwordInput.checkValidity()) {
        passwordInput?.reportValidity();
        return;
    }
    if (username.length < usernameMin || username.length > usernameMax) {
        alert(`ユーザ名は${usernameMin}文字以上、${usernameMax}文字以下で入力してください。`);
        return;
    }
    if (!usernamePattern.test(username)) {
        alert(`ユーザ名は英数字とアンダースコア(_)のみ使用できます。`);
        return;
    }

    // APIリクエスト
    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();
        if (res.ok) {
            console.log('ユーザー登録成功');
            location.href = '/login'; // 必要ならリダイレクト
        } else {
            console.error('登録中にエラーが発生しました:', result.error);
        }
    } catch (error) {
        alert('登録に失敗しました');
    }
});
