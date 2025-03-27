document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function(event) {
        // Prevent the default link behavior (if any)
        event.preventDefault(); 

        // Clear all items from localStorage
        localStorage.clear();

        // Redirect the user to index.html
        window.location.href = 'index.html';
    });
  });