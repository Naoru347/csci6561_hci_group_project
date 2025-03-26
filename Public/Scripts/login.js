const inputtedEmail = document.getElementById("inputted-email");
const inputtedPassword = document.getElementById("inputted-password");
const btnSubmit = document.getElementById("submit");
const failedAuthMessage = document.getElementById("failed-auth-message");

btnSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = inputtedEmail.value.trim();
  const password = inputtedPassword.value.trim();

  try {
    const response = await fetch("../Data/database.json");
    const data = await response.json();
    const user = data.users[email];

    if (user && user.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify({
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }));    
      failedAuthMessage.classList.add("d-none");
      console.log(`Authenticated: ${user.fullName} (${user.role})`);
      window.location.href = "landing.html";
    } else {
      failedAuthMessage.classList.remove("d-none");
      console.log("Authentication failed. Please try again.");
      inputtedEmail.value = '';
      inputtedPassword.value = '';
    }

  } catch (err) {
    console.error("Error fetching database.json:", err);
    alert("There was an error processing your login. Please try again.");
  }
});
