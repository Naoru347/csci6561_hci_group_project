document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const assignment = JSON.parse(localStorage.getItem("selectedAssignment"));
  
    if (!user || !assignment) {
      alert("Missing session data.");
      return;
    }
  
    try {
      const res = await fetch("/api/database");
      const data = await res.json();
  
      const userData = data.users[user.email];
      const assignmentData = userData.assignments[assignment.id];
      const meta = data.assignments[assignment.id];
      const grading = assignmentData.grading || {};
  
      // Update assignment name
      document.getElementById("assignmentName").textContent = `Assignment: ${meta.name}`;
  
      // Update teacher feedback
      document.getElementById("teacherFeedback").textContent =
        grading.teacherFeedback || "No feedback provided yet.";
  
      // Update score
      const scoreDisplay = document.getElementById("scoreDisplay");
      if (grading.score !== null && grading.score !== undefined) {
        scoreDisplay.textContent = `${grading.score} / ${meta.points}`;
      } else if (meta.points) {
        scoreDisplay.textContent = `-- / ${meta.points}`;
      }
  
      // Update grading status badge
      const statusBadge = document.getElementById("gradingStatusBadge");
      statusBadge.textContent = grading.status || "—";
      statusBadge.classList.remove("text-bg-warning", "text-bg-success", "text-bg-danger");
      switch (grading.status) {
        case "graded":
          statusBadge.classList.add("text-bg-success");
          break;
        case "in-review":
          statusBadge.classList.add("text-bg-warning");
          break;
        case "flagged":
          statusBadge.classList.add("text-bg-danger");
          break;
        default:
          statusBadge.classList.add("text-bg-secondary");
      }
  
      // Render violations
      const accordion = document.getElementById("violationAccordion");
      accordion.innerHTML = "";
  
      (assignmentData.violations || []).forEach((v, idx) => {
        const hasComment = v.studentComment && v.studentComment !== "NONE";
        const html = `
          <div class="accordion-item">
            <h3 class="accordion-header" id="violation${idx}Header">
              <button
                class="accordion-button ${idx === 0 ? "" : "collapsed"}"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#violation${idx}Body"
                aria-expanded="${idx === 0}"
                aria-controls="violation${idx}Body"
              >
                Violation #${idx + 1}: ${v.type} — 
                <small class="text-muted">${new Date(v.timestamp).toLocaleString()}</small>
              </button>
            </h3>
            <div
              id="violation${idx}Body"
              class="accordion-collapse collapse ${idx === 0 ? "show" : ""}"
              aria-labelledby="violation${idx}Header"
              data-bs-parent="#violationAccordion"
            >
              <div class="accordion-body">
                <p>${v.description}</p>
                ${v.teacherNote ? `<div class="alert alert-secondary p-2"><strong>Teacher’s note:</strong><br>${v.teacherNote}</div>` : ""}
                ${hasComment ? `
                  <div class="alert alert-info p-2">
                    <strong>Your Comment:</strong><br>${v.studentComment}
                  </div>` : `
                  <label for="comment-${v.id}" class="form-label">Your Comment (optional):</label>
                  <textarea class="form-control mb-2" id="comment-${v.id}" rows="2" placeholder="Explain or clarify what happened..."></textarea>
                  <button class="btn btn-primary" data-id="${v.id}">Submit Comment</button>
                `}
              </div>
            </div>
          </div>
        `;
        accordion.insertAdjacentHTML("beforeend", html);
      });
  
      // Submit button logic
      document.querySelectorAll("button[data-id]").forEach(button => {
        button.addEventListener("click", async () => {
          const violationId = button.dataset.id;
          const textarea = document.getElementById(`comment-${violationId}`);
          const comment = textarea.value.trim();
  
          if (!comment) return alert("Please enter a comment before submitting.");
  
          const payload = {
            email: user.email,
            assignmentId: assignment.id,
            violationId,
            studentComment: comment
          };
  
          try {
            const response = await fetch("/api/violation-comment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
  
            if (response.ok) {
              // Replace textarea + button with static comment display
              const container = textarea.closest(".accordion-body");
              textarea.remove();
              button.remove();
              const commentDisplay = document.createElement("div");
              commentDisplay.classList.add("alert", "alert-info", "p-2");
              commentDisplay.innerHTML = `<strong>Your Comment:</strong><br>${comment}`;
              container.appendChild(commentDisplay);
            } else {
              throw new Error("Failed to save comment.");
            }
          } catch (err) {
            console.error(err);
            alert("Error saving comment.");
          }
        });
      });
  
    } catch (err) {
      console.error("Error loading report data:", err);
      alert("Unable to load report details.");
    }
  });
  