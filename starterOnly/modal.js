document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector('.close');
  const formData = document.querySelectorAll(".formData");
  const firstName = document.querySelector("#first");
  const lastName = document.querySelector("#last");
  const email = document.querySelector("#email");
  const birthDate = document.querySelector("#birthdate");
  const quantity = document.querySelector("#quantity");
  const radios = document.querySelectorAll('input[type="radio"]');
  const cGCheckbox = document.querySelector('#checkbox1');
  const form = document.querySelector("form[name='reserve']");
  

  function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  //close modal event
  modalClose.addEventListener('click', closeModal)

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  
  //close modal form
  function closeModal() {
    modalbg.style.display = "none";
  }

  //First and last name conditions verification
  function verifyInputsConditions(name) {
    name = name.value.trim()
    if(name === "" || name.length < 2) {
      return false;
    }
    return true;
  }

  //Email conditions verification
  function emailVerification(mailAdresse) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(mailAdresse.value.trim())){
      console.log("L'adresse email n'est pas valide.")
      return false;
    }
    return true;
  }

 // Radios checked condition verification
 function radioVerification(radioInputs) {
  for (let radioInput of radioInputs) {
    if (radioInput.checked) {
      return true;
    }
  }
  console.log("Veuillez choisir à quel tournoi vous souhaitez participer.");
  return false;
}  

  //General conditions check verification
function generalConditionsVerification(checkbox) {
  if(!checkbox.checked) {
    console.log("Veuillez accepter les conditions générales");
    return false;
  }
  return true;
}

    
  form.addEventListener('submit', function(event) {
    if(!validate()) {
      event.preventDefault();
      console.log('preenche isso direito!!!')
    }
  })
  //validation process
  function validate() {

    if(!verifyInputsConditions(firstName) || !verifyInputsConditions(lastName) || !emailVerification(email) || !radioVerification(radios) || !generalConditionsVerification(cGCheckbox)) {
      return false;

    }
    return true;
  }



});