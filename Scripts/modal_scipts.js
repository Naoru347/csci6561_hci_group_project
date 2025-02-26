document.addEventListener("DOMContentLoaded", () => {
    // 1) Get references to relevant elements
    const assignmentRadios = document.querySelectorAll('input[name="submittedAssignment"]');
    const viewBtn = document.getElementById("viewSubmittedBtn");
    const modalAssignmentName = document.getElementById("modalAssignmentName");
  
    // 2) Enable the button once a radio is checked
    assignmentRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        viewBtn.disabled = false;
      });
    });
  
    // 3) When the button is clicked, find which radio is checked
    //    and set the modal text accordingly
    viewBtn.addEventListener("click", () => {
      const selected = document.querySelector('input[name="submittedAssignment"]:checked');
      if (selected) {
        // Insert the chosen assignment name into the modal
        modalAssignmentName.textContent = selected.value;
      }
    });
  });
  