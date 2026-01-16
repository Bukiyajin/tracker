const button = document.getElementById('button');
button.addEventListener('click', () => {
    // カラーピッカーの色を取得
    const color = document.getElementById('color').value;
    // 色を反映
    const result = document.getElementById('result');
    result.style.backgroundColor = color;
});