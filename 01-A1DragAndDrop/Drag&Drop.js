//Pas 1 i 2. Carrega del array i els arxius del HTML
let fitxers = [];
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');
let form = document.querySelector('form');

//Pas 3. Un arrai que invalida aquests esdeniviments per defecte
let accions = ['dragover', 'dragleave', 'drop']
accions.forEach(function(evt) {
    dropArea.addEventListener(evt, function(e) {
        e.preventDefault();
    })
})
//Pas 4. Fer que si es posa qualsevol arxiu per sobre del div de dropArea fer-ho actiu i canviar-li el text
dropArea.addEventListener('dragover', function() {
    dropArea.classList.add('active')
    dragDropText.textContent = 'Drop to upload files';
});
//Pas 5. Fer que si es treu l'arxiu per sobre del div de dropArea treure-li la clase actiu i canviar-li el text al de abans
dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('active')
    dragDropText.textContent = 'Drag & Drop files'
});
//Pas 6. En cas de deixar el fitxer asobre, afegira la informacio d'aquest arxiu al array de fitxers, li treu la classe actiu i retorna el text al de abans, i crida
//la funcio de showFiles
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    fitxers = fitxers.concat(Array.from(event.dataTransfer.files));
    dropArea.classList.remove('active')
    dragDropText.textContent = 'Drag & Drop files'
    showFiles();
});
//Pas 7. En cas de que array sigui major que 0, fara un for each amb el qual cridara per cada imatge o element del array la funcio processFile.
function showFiles() {
    preview.innerHTML = '';
    if (fitxers.length > 0) {
        fitxers.forEach((fitxer, index) => {
            processFile(fitxer, index);
        })
    }
}
//Pas 8. Primer de tot comprova que l'arxiu afegit sigui una imagte jpeg, jpg, png i gif, i en cas de no ser-ho, ho treu del array i retorna al forEach de showFiles.
// Despres, amb un reader, creara un div amb la informacio de la imatge i el nom del fitxer i un buto per treure'l i l'afegeix al div de preview.
function processFile(fitxer, index) {
    const extensionsValides = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const docType = fitxer.type;
    if (!extensionsValides.includes(docType)) {
        fitxers.splice(index, 1);
        return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(fitxer);
    reader.onload = function(e) {
        let prev = `<div class="previewImage">
            <img src="${e.target.result}"/>
            <span>${fitxer.name}</span>
            <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">c</span>
        </div>`;
        preview.innerHTML += prev;
    }
}
//Pas 9. Amb l'index de la imatge, el treu del array i mostra unaltre vegada els fitxers
function removeBtn(index) {
    if (index > -1) {
        fitxers.splice(index, 1);
    }
    showFiles();
}
//Pas 10. En cas de clicar el boto, fa que l'input sigui cridat per poder afegir imatges
button.addEventListener("click", function(e) {
    e.preventDefault();
    input.click();
});
//Pas 11. Fa que en cas de afegir una imatge, afegeix la informacio al array de fitxers i trucar showFiles
input.addEventListener('change', function() {
    fitxers = fitxers.concat(Array.from(input.files));
    preview.innerHTML = '';
    showFiles();
})
//PHP. No se si funciona perque no tinc PHP al ordinador de casa
form.addEventListener("submit", function(e){
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    fitxers.forEach(file=>{
        dataTransfer.items.add(file);
    })
    input.files = dataTransfer.files;
    form.submit();
});