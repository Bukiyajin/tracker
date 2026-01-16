//ボタンの機能を使ってWellDoneを表示させる
const progress = document.querySelectorAll('.progress');
const pages = document.querySelectorAll('.pages');
const complete = document.querySelectorAll('.comp');
// 数値として取得
pages.forEach((meter, index) => {
    // 比較
    if (parseInt(meter.value, 10) === parseInt(meter.max, 10)) {
        complete[index].disabled = false;
        progress[index].textContent = 'WellDone!';
        }       
});

//form
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', async e => {
        e.preventDefault();

        //const form = document.getElementById('book-action-form');

        const formUpdateSubmit = button.closest('.submit');
        const currentPagesInput = formUpdateSubmit?.querySelector('input[name="currentPages"]');
        const current_pages = currentPagesInput.value ;
        const action = button.dataset.action; // "delete" or "update" or "add_done"

        // ✅ currentPages のバリデーションチェック
        if(action === "update"){
            if (!currentPagesInput || !currentPagesInput.checkValidity()) {
                currentPagesInput?.reportValidity(); // ブラウザの標準エラーメッセージ表示
                return; // 中断
            }    
        }
        const currentPagesNum = parseInt(current_pages, 10);
        if (isNaN(currentPagesNum) || currentPagesNum <= -1) {
            alert('ページ数を正しく入力、または正の整数で入力してください');
            return;
        }

        /*
        form.action = button.dataset.action;
        form.querySelector('[name="id"]').value = button.dataset.id || '';
        form.querySelector('[name="title"]').value = button.dataset.title || '';
        form.querySelector('[name="author"]').value = button.dataset.author || '';
        form.querySelector('[name="current_pages"]').value = currentPagesInput?.value || '';
        form.querySelector('[name="total_pages"]').value = button.dataset.total_pages || '';
        */
    
    // APIリクエスト

    // 削除処理
    //if(action === "delete"){
        try{
            const res = await fetch(`/api${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: button.dataset.id,
                    title: button.dataset.title,
                    author: button.dataset.author,
                    current_pages: currentPagesNum,
                    total_pages: button.dataset.total_pages
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
    //}
        
        
    // 進捗更新
    /*
    if(action === "update"){
            try{
                const res = await fetch('/api/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: button.dataset.id,
                        current_pages: currentPagesNum
                    })
                });
                
                if (res.ok) {
                    const result = await res.json();
                    // 成功時の処理
                    console.log('進捗更新成功', result);
                    location.reload();
                }else{
                    alert('進捗更新に失敗しました: ' + result.error);
            }
            } catch (error) {
                console.error('進捗更新中にエラーが発生:', error);
            }  
        }
    */
    });
});
