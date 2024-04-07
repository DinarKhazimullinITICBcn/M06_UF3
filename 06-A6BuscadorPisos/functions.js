//Funcio treta del enunciat del exercici
function phonenumber(inputtxt) {
  var phoneno = /^\d{3} \d{3} \d{4}$/;
  if(inputtxt.match(phoneno)) {
    return true;
  } else {
    alert("message");
    return false;
  }
}
//Funcio que ja venia per defecte
  function validateNIF_NIE(value){
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
  }
//Funcio que ja venia per defecte
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return true
  }
  return false;
}
//Funcio de validacio de nom. Quan es fa un focus out, fara aquesta funcio que el que fa es agafar
//el valor del input amb aquesta idd (validationNom). Fa una condicional que si no esta buida,
//li posara les clases valides amb un text de Perfecte, en cas de que si estigui buida fara
//el mateix pero amb clases invalides i text de incorrecte
$('#validationNom').focusout(function() {
  var nom = $('#validationNom').val();
  if (nom === '') {
    $('#validationNom').removeClass('is-valid').addClass('is-invalid');
    $('#feedbackNom').removeClass('valid-feedback').addClass('invalid-feedback').html('Si us plau, introdueix el teu nom.');
  } else {
    $('#validationNom').removeClass('is-invalid').addClass('is-valid');
    $('#feedbackNom').removeClass('invalid-feedback').addClass('valid-feedback').html('Perfecte!');
  }
})
//Funcio de validacio de cognom. Fa el mateix que la funcio de adalt, comprova que en focusout
//amb el valor del input si esta buida o no, i afegira les clases i text pertinent.
$('#validationCognoms').focusout(function() {
  var cognoms = $('#validationCognoms').val();
  if (cognoms === '') {
    $('#validationCognoms').removeClass('is-valid').addClass('is-invalid');
    $('#feedbackCognoms').removeClass('valid-feedback').addClass('invalid-feedback').html('Si us plau, introdueix els teus cognoms.');
  } else {
    $('#validationCognoms').removeClass('is-invalid').addClass('is-valid');
    $('#feedbackCognoms').removeClass('invalid-feedback').addClass('valid-feedback').html('Perfecte!');
  }
})
//Aquesta funcio fa el mateix pero aquesta vegada comprovara que no estigui buid i que tingui
//la estructura adient amb la funcio validateNIF_NIE.
$('#validationDNI').focusout(function() {
  var dni = $('#validationDNI').val();
  if (dni === '') {
    $('#validationDNI').removeClass('is-valid').addClass('is-invalid');
    $('#feedbackDni').removeClass('valid-feedback').addClass('invalid-feedback').html('Si us plau, introdueix el teu DNI.');
  } else {
    if (validateNIF_NIE(dni)) {
        $('#validationDNI').removeClass('is-invalid').addClass('is-valid');
        $('#feedbackDni').removeClass('invalid-feedback').addClass('valid-feedback').html('Perfecte!');
    } else {
        $('#validationDNI').removeClass('is-valid').addClass('is-invalid');
        $('#feedbackDni').removeClass('valid-feedback').addClass('invalid-feedback').html('El DNI introduït no és vàlid.');
    }
  }
})
//El mateix, comprovem al fer un focusout que no estigui buit el email i despres que estigui
//dins de les regles establertes per la funcio validateEmail
$('#validationEmail').focusout(function() {
  var email = $('#validationEmail').val();
  if (email === '') {
    $('#validationEmail').removeClass('is-valid').addClass('is-invalid');
    $('#feedbackEmail').removeClass('valid-feedback').addClass('invalid-feedback').html('Si us plau, introdueix el teu correu electrònic.');
} else {
    if (validateEmail(email)) {
        $('#validationEmail').removeClass('is-invalid').addClass('is-valid');
        $('#feedbackEmail').removeClass('invalid-feedback').addClass('valid-feedback').html('Perfecte!');
    } else {
        $('#validationEmail').removeClass('is-valid').addClass('is-invalid');
        $('#feedbackEmail').removeClass('valid-feedback').addClass('invalid-feedback').html('El correu electrònic introduït no és vàlid.');
    }
}
})
//El mateix que la funcio d'adalt, comprover que al fer un focusout el valor no estigui buit y despres
//que sigui correcte amb la funcio phonenumber
$('#validationTelf').focusout(function() {
  var telf = $('#validationTelf').val();
  if (telf === '') {
    $('#validationTelf').removeClass('is-valid').addClass('is-invalid');
    $('#feedbackTelf').removeClass('valid-feedback').addClass('invalid-feedback').html('Si us plau, introdueix el teu telèfon.');
  } else {
    if (phonenumber(telf)) {
        $('#validationTelf').removeClass('is-invalid').addClass('is-valid');
        $('#feedbackTelf').removeClass('invalid-feedback').addClass('valid-feedback').html('Perfecte!');
    } else {
        $('#validationTelf').removeClass('is-valid').addClass('is-invalid');
        $('#feedbackTelf').removeClass('valid-feedback').addClass('invalid-feedback').html('El telèfon introduït no és vàlid.');
    }
  }
});
//Funcio que en cas de clicar el btnUsername, creei un nom d'usuari adient al enunciat del exercici
$(document).ready(function() {
  $('#btnUsername').on('click', function() {
      var nom = $('#validationNom').val();
      var cognoms = $('#validationCognoms').val().replace(' ', '').toLowerCase();
      var dni = $('#validationDNI').val();

      if (cognoms.length < 4 && cognoms.indexOf(' ') !== -1) {
          cognoms = cognoms.split(' ')[1];
      }

      cognoms = cognoms.charAt(0).toUpperCase() + cognoms.slice(1, 4); 

      var dniOddNumbers = '';
      for (var i = 0; i < dni.length; i++) {
          if (i % 2 === 0 && !isNaN(parseInt(dni[i]))) {
              dniOddNumbers += dni[i];
          }
      }

      var username = nom.charAt(0).toLowerCase() + cognoms + dniOddNumbers;

      $('#validationUsername').val(username);
  });
});
//Form registrePisos
//Deshabilitar el select
$('#barri-select').prop('disabled', true);
//Carregar tota la informacio de la base de dades de districtes.sql que esta pujada a phpmyadmin
//al selector de districte.
$.ajax({
  url: 'form_consultaDistricte.php',
  type: 'GET',
  success: function(data) {
    var districtes = JSON.parse(data);
    var $districteSelect = $('#districte-select');
    $districteSelect.empty();
    $.each(districtes, function(index, districte) {
      $districteSelect.append('<option value="' + districte.id + '">' + districte.name + '</option>');
    });
  }
});
//Depenent del primer selector, carregar les dades de barris.sql amb el id de districte enviat per data amb
//tipus POST
$('#districte-select').change(function() {
  var id_districte = $(this).val();
  $.ajax({
    url: 'form_consultaBarris.php',
    type: 'POST',
    data: "id_districte=" + id_districte,
    success: function(data) {
      var barris = JSON.parse(data);
      var $barriSelect = $('#barri-select');
      $barriSelect.empty();
      $.each(barris, function(index, barri) {
        $barriSelect.append('<option value="' + barri.id + '">' + barri.name + '</option>');
      });
      $('#barri-select').prop('disabled', false);
    }
  });
});

