// JS to handle graded assignment button selection logic
// and to handle data pass through
document.addEventListener("DOMContentLoaded", () => {
    const assignmentRadios = document.querySelectorAll('input[name="submittedAssignment"]');
    const viewBtn = document.getElementById("viewSubmittedBtn");
    const modalAssignmentName = document.getElementById("modalAssignmentName");
  
    // Enable the "See Selected Submitted Assignment" button once a radio is checked
    assignmentRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        viewBtn.disabled = false;
      });
    });
  
    // On button click, find which radio is checked and set the modal text accordingly
    viewBtn.addEventListener("click", () => {
      const selected = document.querySelector('input[name="submittedAssignment"]:checked');
      if (selected) {
        modalAssignmentName.textContent = selected.value;
      }
    });
  
    // JS to handle graded assignment button selection logic
    // and to handle data pass through
    const gradedRadios = document.querySelectorAll('input[name="gradedAssignment"]');
    const viewGradedBtn = document.getElementById("viewGradedBtn");
    const modalGradedAssignmentName = document.getElementById("modalGradedAssignmentName");
  
    // Only proceed if elements exist on this page
    if (gradedRadios && viewGradedBtn && modalGradedAssignmentName) {
      // Enable the "See Selected Graded Assignment" button once a radio is checked
      gradedRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
          viewGradedBtn.disabled = false;
        });
      });
  
      // On button click, populate the graded modal with the chosen assignment
      viewGradedBtn.addEventListener("click", () => {
        const selected = document.querySelector('input[name="gradedAssignment"]:checked');
        if (selected) {
          modalGradedAssignmentName.textContent = selected.value;
        }
      });
    }
  });
  