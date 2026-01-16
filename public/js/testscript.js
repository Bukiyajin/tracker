document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        const form = document.getElementById('book-action-form');
        form.action = button.dataset.action;

        form.querySelector('[name="id"]').value = button.dataset.id || '';
        //form.querySelector('[name="title"]').value = button.dataset.title || '';

        // current_pages は input の値を取得
        const currentPagesInput = document.querySelector('input[name="current_pages"]');
        form.querySelector('[name="current_pages"]').value = currentPagesInput?.value || '';

        form.submit();
    });
});