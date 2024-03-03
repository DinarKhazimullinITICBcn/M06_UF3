// Agafem els elements on posarem la informacio de la base de dades
let category = document.getElementById('categoria');
let subcategory = document.getElementById('subcategoria');
// Funcio que carrega les dades. Fa un fetch del arxiu de php.
function categoria() {
    fetch("FetchSelectCategoria.php")
    .then((response) => response.json())
    .then((data) => {
        // Neteja el div
        category.innerHTML = '';
        // Fa un forEach de cada informacio que es troba en la base de dades y crea un checkbox
        // amb la informacio important, com el value.
        data.forEach(el => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = el.id;
            checkbox.classList.add('check');
            // Posa el text amb el nom per veure-ho millor
            let label = document.createElement('label');
            label.htmlFor = el.nom;
            label.appendChild(document.createTextNode(el.nom));
            // El posa en el div
            category.appendChild(checkbox);
            category.appendChild(label);
            category.appendChild(document.createElement('br'));
        });
        //Fem un query per cadascun dels checkbox en el cual fem un eventListener.
        document.querySelectorAll(".check").forEach(el =>
            el.addEventListener("change", function(){
                if(this.checked === true){
                    console.log(this.value + " check");
                } else {
                    console.log(this.value + " uncheck");
                }
                subCategoria();
            })
        );
    })
    .catch((error) => {
        console.log(error);
    });
}
// Funcio que el que fa es guardar el valor, o sigui la id, de cadascun dels checkbox i el envia al php
// com a opcio
function subCategoria() {
    let checkedCategories = Array.from(document.querySelectorAll('.check:checked')).map(el => el.value);
    let formData = new FormData();
    formData.append('categoria', JSON.stringify(checkedCategories));

    let options = {
        method: 'POST',
        body: formData
    }
    //Agafar tota la informacio amb les opcions i crea informacio en cadascun dels selectors.
    //En cas de seleccionarse 2, mostrara les subcategories de cadascuna de les categories.
    fetch("FetchSelectSubCategoria.php", options)
    .then((response) => response.json())
    .then((data) => {
        subcategory.innerHTML = '';
        data.forEach(el => {
            let opt = document.createElement('option');
            opt.value = el.id;
            opt.text = el.nom;
            subcategory.appendChild(opt);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}
//Truca la funcio per a que comenci la el script
categoria();