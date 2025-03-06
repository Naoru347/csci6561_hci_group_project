document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const modal = new bootstrap.Modal(document.getElementById("assignmentModal"));
  let selectedAssignment = null;

  // Modal elements
  const modalTitle = document.getElementById("assignmentModalLabel");
  const modalAssignmentName = document.getElementById("modalAssignmentName");
  const modalAssignmentPrompt = document.getElementById("modalAssignmentPrompt");
  const modalAssignmentPoints = document.getElementById("modalAssignmentPoints");
  const modalAssignmentMode = document.getElementById("modalAssignmentMode");
  const modalPromptRow = document.getElementById("modalPromptRow");
  const modalPointsRow = document.getElementById("modalPointsRow");
  const modalModeRow = document.getElementById("modalModeRow");
  const continueLink = document.getElementById("continueLink");

  // Listen for selection changes across all radio buttons
  document.querySelectorAll("input[name='assignment']").forEach((radio) => {
      radio.addEventListener("change", function () {
          selectedAssignment = this;
          nextBtn.disabled = false; // Enable Next button once selection is made
      });
  });

  // When "Next" is clicked, determine which modal to show
  nextBtn.addEventListener("click", function () {
      if (!selectedAssignment) return;

      // Get selected assignment's category (available, submitted, or graded)
      const assignmentType = selectedAssignment.value;
      const assignmentName = selectedAssignment.dataset.name || "N/A";
      const assignmentPrompt = selectedAssignment.dataset.prompt || "";
      const assignmentPoints = selectedAssignment.dataset.points || "";
      const assignmentMode = selectedAssignment.dataset.mode || "";

      // Populate modal content
      modalAssignmentName.innerText = assignmentName;
      modalAssignmentPrompt.innerText = assignmentPrompt;
      modalAssignmentPoints.innerText = assignmentPoints;
      modalAssignmentMode.innerText = assignmentMode;

      // Show/hide rows based on assignment type
      modalPromptRow.style.display = assignmentPrompt ? "block" : "none";
      modalPointsRow.style.display = assignmentPoints ? "block" : "none";
      modalModeRow.style.display = assignmentMode ? "block" : "none";

      // Update modal title and continue link based on assignment type
      if (assignmentType === "available") {
          modalTitle.innerText = "Available Assignment";
          continueLink.setAttribute("href", "task.html"); // Update with actual link
      } else if (assignmentType === "submitted") {
          modalTitle.innerText = "Submitted Assignment";
          continueLink.setAttribute("href", "submission_report.html");
      } else if (assignmentType === "graded") {
          modalTitle.innerText = "Graded Assignment";
          continueLink.setAttribute("href", "graded_report.html");
      }

      // Show the modal
      modal.show();
  });
});
