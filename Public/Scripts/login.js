const inputtedEmail = document.getElementById("inputted-email");
const inputtedPassword = document.getElementById("inputted-password");
const btnSubmit = document.getElementById("submit");
const failedAuthMessage = document.getElementById("failed-auth-message");

btnSubmit.addEventListener('click', async (e) => {
  // Prevent default form submission behavior
  e.preventDefault();
  // Clean and retrieve text input values
  const email = inputtedEmail.value.trim();
  const password = inputtedPassword.value.trim();

  try {
    // Grab data from file database.json
    const response = await fetch("../Data/database.json");
    const data = await response.json();
    // Read users by email
    const user = data.users[email];
    // Compare user email and password for a match
    if (user && user.password === password) {
      //Store use details in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify({
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }));
      // Set failed message to hidden    
      failedAuthMessage.classList.add("d-none");
      console.log(`Authenticated: ${user.fullName} (${user.role})`);
      // Redirect to landing.html
      window.location.href = "landing.html";
    } else {
      // Show the failed message
      failedAuthMessage.classList.remove("d-none");
      console.log("Authentication failed. Please try again.");
      // Clear text inputs
      inputtedEmail.value = '';
      inputtedPassword.value = '';
    }

  } catch (err) {
    console.error("Error fetching database.json:", err);
    alert("There was an error processing your login. Please try again.");
  }
});
