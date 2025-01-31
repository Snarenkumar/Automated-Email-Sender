const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.querySelector('.btn-outline-primary');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropArea.addEventListener(event, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when file is dragged over
dropArea.addEventListener('dragover', () => dropArea.classList.add('border-primary'));
dropArea.addEventListener('dragleave', () => dropArea.classList.remove('border-primary'));

// Handle dropped files
dropArea.addEventListener('drop', (e) => {
    dropArea.classList.remove('border-primary');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        document.getElementById('upload-form').submit();
    }
});

// Open file dialog when "Choose a file" button is clicked
chooseFileBtn.addEventListener('click', () => fileInput.click());

// Open file dialog when drop area is clicked
dropArea.addEventListener('click', () => fileInput.click());