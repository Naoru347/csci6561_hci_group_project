document.addEventListener("DOMContentLoaded", async () => {
    // 1. Grab the user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) return alert("No user logged in.");
  
    let userEmail;
    try {
      const parsedUser = JSON.parse(storedUser);
      userEmail = parsedUser.email;
    } catch (err) {
      console.error("Failed to parse loggedInUser:", err);
      return alert("Session data corrupted.");
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
  
    // 5. Loop over user assignments and populate the right section
    let counter = 1;
    for (const [assignmentId, assignmentData] of Object.entries(userData.assignments)) {
      const status = assignmentData.status;
      const meta = assignmentsMeta[assignmentId] || {};
      const list = listMap[status];
      if (!list) continue;
  
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
  });
  