const btn = document.getElementById('add-btn');
const formAdd = document.forms['add_form'];
const titleInput = formAdd?.querySelector('input[name="title"]');
const authorInput = formAdd?.querySelector('input[name="author"]');
const totalPagesInput = formAdd?.querySelector('input[name="total_pages"]');
const colorInput = formAdd?.querySelector('input[name="color"]');

btn.addEventListener('click', async e => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const total_pages = totalPagesInput.value;
    const color = colorInput.value;

    if (!title) {
        alert('タイトルは必須です');
    }
    const totalPagesNum = parseInt(total_pages, 10);
    if (isNaN(totalPagesNum) || totalPagesNum <= 0) {
        alert('ページ数は正の整数で入力してください');
        return;
    }
    // APIリクエスト
    try {
        const res = await fetch('/api/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, total_pages: totalPagesNum, color })
        });
        const result = await res.json();
        if (res.ok) {
            console.log('本の追加に成功しました！');
            location.href = '/home'; // 必要ならリダイレクト
        } else {
            console.error('本の追加中にエラーが発生しました:', result.error);
            alert('本の追加に失敗しました');
        }
    } catch (error) {
        console.error('本の追加中にエラーが発生しました:', error);
        alert('本の追加に失敗しました');
    }

});