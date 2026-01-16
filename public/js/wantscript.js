//form
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', async e => {
        e.preventDefault();
        const action = button.dataset.action; // want_delete

    // APIリクエスト
    // 削除処理
        try{
            const res = await fetch(`/api${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: button.dataset.id,
                    title: button.dataset.title
                })
            });
            
            if (res.ok) {
                const result = await res.json();
                // 成功時の処理
                console.log(`${action}処理成功`, result);
                location.reload();
            }else{
                alert(`${action}処理が失敗しました: ` + result.error);
            }
        } catch (error) {
            console.error(`${action}処理中にエラーが発生:`, error);
        }     
    });
});