const testEmail = "test@test.com";
const testPassword = "test";

const inputtedEmail = document.getElementById("inputted-email");
const inputtedPassword = document.getElementById("inputted-password");
const btnSubmit = document.getElementById("submit");
const failedAuthMessage = document.getElementById("failed-auth-message");

btnSubmit.addEventListener('click', () => {
  console.log(inputtedEmail.value.trim());
  console.log(inputtedPassword.value.trim());

  if (inputtedEmail.value.trim() !== testEmail && inputtedPassword.value.trim() !== testPassword) {
    failedAuthMessage.classList.remove("d-none");
    inputtedEmail.value = '';
    inputtedPassword.value = '';

  } else {
    console.log("authenticated");
    failedAuthMessage.classList.add("d-none");
  }

});
