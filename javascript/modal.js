document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector('.close');
  const content = document.querySelector('.content');
  const formData = document.querySelectorAll(".formData");
  const firstName = document.querySelector("#first");
  const lastName = document.querySelector("#last");
  const email = document.querySelector("#email");
  const birthDate = document.querySelector("#birthdate");
  const quantity = document.querySelector("#quantity");
  const radios = document.querySelectorAll('input[name="location"]');
  const cGCheckbox = document.querySelector('#checkbox1');
  const form = document.querySelector("form[name='reserve']");
  const confirmField = document.querySelector('#confirm-inscription');
  const confirmModal = document.querySelector('.confirmation_modal');
  const confirmClose = document.querySelector('.btn-close');
  const closeX = document.querySelector('.fa-xmark');

  var errorMessage = "";
  let errorMessageField;

  // function editNav() {
  //   var x = document.getElementById("myTopnav");
  //   if (x.className === "topnav") {
  //     x.className += " responsive";
  //   } else {
  //     x.className = "topnav";
  //   }
  // }
  function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.querySelector('.main-navbar nav .fa-xmark').addEventListener('click', () => {
    document.querySelector('.main-navbar nav').classList.remove('open');
  })

  document.querySelector('.main-navbar .icon').addEventListener('click', () => {
    document.querySelector('.main-navbar nav').classList.add('open');
  })
  
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  //close modal event
  modalClose.addEventListener('click', closeModal);

  //close modal when clicking outside modal body 
  modalbg.addEventListener('click', (event) => {
    if (!content.contains(event.target)) {
      closeModal();
    }
  });

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  
  //close modal form
  function closeModal() {
    content.classList.add("closing");

    content.addEventListener('animationend', () => {
      modalbg.style.display = "none";
      content.classList.remove("closing");
    }, { once: true });
  }


  //First and last name conditions verification
  function verifyNameConditions(input) {
    const name = input.value.trim();
    errorMessageField = document.getElementById(`${input.id}-error`);
    if (name === "" || name.length < 2) {
      errorMessage = "Veuillez remplir ce champ avec un minimum de 2 caractères.";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
    errorMessage = "";
    errorMessageField.style.display = "none";
    return true;
  }

  //Email conditions verification
  function emailVerification(mailAdresse) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    errorMessageField = document.getElementById(`${mailAdresse.id}-error`);
    if(!emailPattern.test(mailAdresse.value.trim())){
      errorMessage = "Veuillez introduire une adresse email valide.";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
    errorMessage = "";
    errorMessageField.style.display = "none";
    return true;
  }

  //Birthdate conditions verrification
  function birthdateVerification(date) {
    errorMessageField = document.getElementById(`${date.id}-error`);
    const userBirthdate = new Date(date.value);
    const today = new Date();
  
    // Date format validation
    if (isNaN(userBirthdate)) {
      errorMessage = "Veuillez entrer une date de naissance valide.";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
  
    // Age calculation
    let age = today.getFullYear() - userBirthdate.getFullYear();
    const monthDiff = today.getMonth() - userBirthdate.getMonth();
    const dayDiff = today.getDate() - userBirthdate.getDate();
  
    // If birthday has not arrived this year, reduce the age by 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    // Validation de l'âge
    if (age < 14) {
      errorMessage = "Vous devez avoir au moins 14 ans.";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
    errorMessage = "";
    errorMessageField.textContent = errorMessage;
    errorMessageField.style.display = "none";
    return true;
  }

  //Tournaments past participations
  function quantityVerification(input) {
    errorMessageField = document.getElementById(`${input.id}-error`);
    pastTournaments = input.value;
    if(pastTournaments === "" || isNaN(pastTournaments)) {
      errorMessage = "Veuillez indiquer à combien de tournois pous avez participé";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
    errorMessage = "";
    errorMessageField.textContent = errorMessage;
    errorMessageField.style.display = "none";
    return true;
  }

  // Radios checked condition verification
  function radioVerification(radioInputs) {
    errorMessageField = document.getElementById('tournament-error');
    var isChecked = false;
    
    for (let radioInput of radioInputs) {
      if (radioInput.checked) {
        isChecked = true;
        break;
      }
    }
    
    if (!isChecked) {
      errorMessage = "Vous devez choisir une option.";
      errorMessageField.textContent = errorMessage;
      errorMessageField.style.display = "block";
      return false;
    }
    errorMessage = "";
    errorMessageField.textContent = errorMessage;
    errorMessageField.style.display = "none";
    return true;
  }
    

  //General conditions check verification
function generalConditionsVerification(checkbox) {
  errorMessageField = document.getElementById('checkbox1-error');
  if(!checkbox.checked) {
    errorMessage = "Vous devez accepter les termes et conditions."
    errorMessageField.textContent = errorMessage;
    errorMessageField.style.display = 'block';
    return false;
  }
  errorMessage = "";
  errorMessageField.textContent = errorMessage;
  errorMessageField.style.display = "none";
  return true;
}

// function clearErrorMessages() {
//   const errorFields = document.querySelectorAll('[id$="-error"]');
//   errorFields.forEach(field => {
//     field.textContent = "";
//     field.style.display = "none";
//   });
// }

if(localStorage.getItem('formValidated') === 'true') {
  confirmModal.style.display = 'flex';
  localStorage.removeItem('formValidated');
}


//Confirmation modal close
confirmClose.addEventListener('click', function() {
  confirmModal.style.display = "none";
});

closeX.addEventListener('click', function() {
  confirmModal.style.display = "none";
})
    
  form.addEventListener('submit', function(event) {
    //clearErrorMessages();
    if(validate()) {
      localStorage.setItem('formValidated', true);
    } else {
      event.preventDefault();
    }
  })

  //validation process
  function validate() {
    let isValid = true;
  

    if (!verifyNameConditions(firstName)) isValid = false;
    if (!verifyNameConditions(lastName)) isValid = false;
    if (!emailVerification(email)) isValid = false;
    if (!birthdateVerification(birthDate)) isValid = false;
    if (!quantityVerification(quantity)) isValid = false;
    if (!radioVerification(radios)) isValid = false;
    if (!generalConditionsVerification(cGCheckbox)) isValid = false;
  
    return isValid;
  }
});