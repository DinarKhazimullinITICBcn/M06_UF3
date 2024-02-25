//Trucada a totes les variables necesarias del html
let form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
let email = document.getElementById('email');
let password = document.getElementById('password');
let passwordConfirmation = document.getElementById('passwordConfirmation');
var address = document.getElementById('address');
let pPasswordConfirmation = document.getElementById('passwordConfirmationP');
let divPassword = document.getElementById('passwordRequirements');
//Recorre tots els inputs i fa que si el input te la id password, passwordConfirmation o submit, que no canvii els colors. Aixo perque els passwords canvien de color
//amb les seves condicions i submit perque canvia el color del buto.
inputs.forEach(input => {
    if (input.id === 'password' || input.id === 'passwordConfirmation' || input.id === 'submit') {
        return;
    }
    input.addEventListener('focusout', function() {
        if (input.value === '') {
            input.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        } else {
            input.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
        }
    });
});
//Amb una condicio que comprova que el password sigui text@text.te, i retorna true o false
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }else{
        return false;
    }
}
//Una vegada clickem a fora del input, canviara el color del input si es valida o no es valida.
email.addEventListener('focusout', function() {
    if (validateEmail(email.value)) {
        email.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
    } else {
        email.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    }
})
//Fa que cada vegada que es fagi un input al password, comprovi amb la fuincio de validatePassword que cumpleixi totes les regles.
password.addEventListener('input', function() {
    let password = this.value;
    divPassword.style.display = 'block';
    if (validatePassword(password)) {
        this.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
    } else {
        this.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    }
});
//En cas de complir, els paragrafs que sortiran es posaran en verd, i retornara un true, en cas de no, retornara un false.
function validatePassword(passwordValue) {
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    document.getElementById('length').style.color = (passwordValue.length >= 8 && passwordValue.length <= 15) ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';
    document.getElementById('lowerCase').style.color = lowerCaseLetters.test(passwordValue) ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';
    document.getElementById('upperCase').style.color = upperCaseLetters.test(passwordValue) ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';
    document.getElementById('number').style.color = numbers.test(passwordValue) ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';
    document.getElementById('specialCharacter').style.color = specialChars.test(passwordValue) ? 'rgba(0, 128, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';

    if (passwordValue.length < 8 || passwordValue.length > 15) {
        return false;
    }
    if (!lowerCaseLetters.test(passwordValue)) {
        return false;
    }
    if (!upperCaseLetters.test(passwordValue)) {
        return false;
    }
    if (!numbers.test(passwordValue)) {
        return false;
    }
    if (!specialChars.test(passwordValue)) {
        return false;
    }
    return true;
}
//Quan clickem a fora del input de la confirmacio de contrasentya, comprovara que els dos valors siguin iguals, i si no ho son, mostrara un missatge de error fins que siguin iguals.
passwordConfirmation.addEventListener('focusout', function() {
    if(password.value === this.value) {
        this.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
        pPasswordConfirmation.style.display = 'none';
    } else {
        this.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        pPasswordConfirmation.style.display = 'block';
    }
});
//Comprova que tots els valors siguin o escrits o dins de les regles estrablertes.
form.addEventListener('submit', function(event) {
    let isValid = true;
    if (!document.getElementById('name').value) {
        isValid = false;
    }
    if(address.value === '') {
        event.preventDefault();
        document.getElementById('addressRequired').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('addressRequired').style.display = 'none';
    }
    if (!validateEmail(email.value)) {
        event.preventDefault();
        isValid = false;
    }
    if (!validatePassword(password.value)) {
        event.preventDefault();
        isValid = false;
    }
    if (password.value !== passwordConfirmation.value) {
        event.preventDefault();
        isValid = false;
    }
    if (isValid) {
        form.submit(); 
    } else {
        event.preventDefault();
    }
});


