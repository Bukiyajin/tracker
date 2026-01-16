const btn = document.getElementById('add-btn');
const formAdd = document.forms['add_form'];
const titleInput = formAdd?.querySelector('input[name="title"]');
const authorInput = formAdd?.querySelector('input[name="author"]');
//const userIdInput = formAdd?.querySelector('input[name="user_id"]');

btn.addEventListener('click', async e => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    //const user_id = userIdInput.value;

    if (!title) {
        alert('タイトルは必須です');
    } else if (!author) {
        alert('著者名は必須です');
    }

    // APIリクエスト
    try {
        const res = await fetch('/api/add_want', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        });
        const result = await res.json();
        if (res.ok) {
            console.log('読みたい本を追加しました！');
            location.href = '/want'; // 必要ならリダイレクト
        } else {
            console.error('本の追加中にエラーが発生しました:', result.error);
            alert('本の追加に失敗しました');
        }
    } catch (error) {
        console.error('本の追加中にエラーが発生しました:', error);
        alert('本の追加に失敗しました');
    }

});