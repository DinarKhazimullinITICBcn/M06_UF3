let inputs = document.querySelectorAll('input');
let email = document.getElementById('email');
inputs.forEach(input => {
    input.addEventListener('focusout', function() {
        if (input.value === "") {
            input.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        } else {
            input.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
        }
    });
});
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }else{
        return false;
    }
}
email.addEventListener('focusout', function() {
    if (validateEmail(email.value)) {
        email.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
    } else {
        email.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    }
})