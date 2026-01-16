let current = 0;
    const selects = document.querySelectorAll('.book-select');
    const titles = ["進行中の本", "ほしい本", "テスト", "読了した本", "ログアウト"]; // 表示したい名前
    const titleElement = document.getElementById("current-title");

    function updateSelection() {
        selects.forEach((div, index) => {
        div.classList.toggle('selected', index === current) ? 'block' : 'none'; //条件式 ? 真の時 : 偽の時
    });
        // 選択中のタイトルを表示
        titleElement.textContent = titles[current];
        // アニメーションをリセットして再発動させる
        titleElement.style.animation = 'none'; // 一旦アニメーションを解除
        void titleElement.offsetWidth;         // DOMを再計算（トリガー）
        titleElement.style.animation = null;   // 再度アニメーションを有効にする
    }

    function moveLeft() {
        current = (current - 1 + selects.length) % selects.length;
        updateSelection();
    }

    function moveRight() {
        current = (current + 1) % selects.length;
        updateSelection();
    }

    // 最初に表示
    updateSelection();