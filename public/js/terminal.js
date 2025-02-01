const textarea = document.getElementById('text-area');

textarea.addEventListener('focus', function() {
    // Clear the textarea content when it gains focus
    if (this.value === 'Some text...') {
        this.value = '';
    }
});

textarea.addEventListener('blur', function() {
    // Restore placeholder text if the textarea is empty
    if (this.value === '') {
        this.value = 'Some text...';
    }
});