let fitxers = [];
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');

let accions = ['dragover', 'dragleave', 'drop']
accions.forEach(function(evt) {
    dropArea.addEventListener(evt, function(e) {
        e.preventDefault();
    })
})

dropArea.addEventListener('dragover', function() {
    dropArea.classList.add('active')
    dragDropText.textContent = 'Drop to upload files';
});

dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('active')
    dragDropText.textContent = 'Drag & Drop files'
});

dropArea.addEventListener('drop', (event) => {
    let fileList = fitxers.concat(Array.from(event.dataTransfer.files));
});