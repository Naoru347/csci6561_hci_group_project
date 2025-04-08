document.addEventListener("DOMContentLoaded", async () => {
    // 1. Grab the user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) return alert("No user logged in.");
    
    let userEmail, fullName;
    try {
      const parsedUser = JSON.parse(storedUser);
      userEmail = parsedUser.email;
      fullName = parsedUser.fullName || "User";
    } catch (err) {
      console.error("Failed to parse loggedInUser:", err);
      return alert("Session data corrupted.");
    }
    
    // Display welcome message
    const welcomeEl = document.getElementById("welcomeMessage");
    if (welcomeEl) {
      welcomeEl.textContent = `Logged in as ${fullName}`;
    }
    
  
    // 2. Load the database
    let data;
    try {
      const res = await fetch("../Data/database.json");
      data = await res.json();
    } catch (err) {
      console.error("Failed to fetch database.json:", err);
      return alert("Could not load assignment data.");
    }
  
    const userData = data.users[userEmail];
    if (!userData) return alert("User not found in database.");
    const assignmentsMeta = data.assignments;
  
    // 3. Map of assignment lists by status
    const listMap = {
      available: document.querySelector("ul[data-type='available']"),
      submitted: document.querySelector("ul[data-type='submitted']"),
      graded: document.querySelector("ul[data-type='graded']")
    };
  
    // 4. Clear old content
    Object.values(listMap).forEach(list => list.innerHTML = "");
  
    // 5. Track populated status
    const populated = {
      available: false,
      submitted: false,
      graded: false
    };

    let counter = 1;
    for (const [assignmentId, assignmentData] of Object.entries(userData.assignments)) {
      const status = assignmentData.status;
      const meta = assignmentsMeta[assignmentId] || {};
      const list = listMap[status];
      if (!list) continue;

      populated[status] = true; // Mark that we have at least one item in this category

      const li = document.createElement("li");
      li.classList.add("mb-2");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "assignment";
      input.id = `${status}${counter++}`;
      input.value = status;

      input.setAttribute("data-id", assignmentId);
      input.setAttribute("data-name", meta.name || assignmentId);
      if (meta.prompt) input.setAttribute("data-prompt", meta.prompt);
      if (meta.points) input.setAttribute("data-points", meta.points);
      if (meta.mode) input.setAttribute("data-mode", meta.mode);

      const label = document.createElement("label");
      label.setAttribute("for", input.id);
      label.textContent = meta.name || assignmentId;

      li.appendChild(input);
      li.appendChild(label);
      list.appendChild(li);
    }

    // 5b. Add placeholder messages for empty categories
    Object.entries(listMap).forEach(([status, list]) => {
      if (!populated[status]) {
        const msg = document.createElement("p");
        msg.classList.add("text-muted", "fst-italic", "mb-0");
        msg.textContent = {
          available: "You currently have no assignments to complete.",
          submitted: "You currently have no submitted assignments awaiting grading.",
          graded: "You currently have no graded assignments."
        }[status];
        list.appendChild(msg);
      }
    });


    // 6. Add event listeners to show modal when a radio button is selected
    // and ensure relevant data is stored in local storage
    document.querySelectorAll('input[name="assignment"]').forEach(radio => {
        radio.addEventListener("change", () => {
        const assignmentId = radio.getAttribute("data-id");
        const assignmentName = radio.getAttribute("data-name") || "—";
        const prompt = radio.getAttribute("data-prompt") || "—";
        const points = radio.getAttribute("data-points") || "—";
        const mode = radio.getAttribute("data-mode") || "—";
        const status = radio.value;

        // Save selected assignment to localStorage
        localStorage.setItem("selectedAssignment", JSON.stringify({
            id: assignmentId,
            name: assignmentName,
            prompt,
            points,
            mode,
            status
        }));

        // Populate modal content
        document.getElementById("modalAssignmentName").textContent = assignmentName;
        document.getElementById("modalAssignmentPrompt").textContent = prompt;
        document.getElementById("modalAssignmentPoints").textContent = points;
        document.getElementById("modalAssignmentMode").textContent = mode;

         // Determine redirect target
        let destinationPage = "task.html";
        if (status === "submitted" || status === "in-review" || status === "flagged" || status === "graded") {
        destinationPage = "submission_report.html";
        } 

        // Update "Continue" link
        const continueLink = document.getElementById("continueLink");
        continueLink.href = `${destinationPage}?assignment=${assignmentId}`;

        // Show modal
        const assignmentModal = new bootstrap.Modal(document.getElementById("assignmentModal"));
        assignmentModal.show();
        });
    });

  });
  