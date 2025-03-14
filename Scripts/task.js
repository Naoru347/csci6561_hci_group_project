const divConfirmationBlock = document.getElementById("divConfirmationBlock");
const divTextAndLinksBlock = document.getElementById("divTextAndLinksBlock");
const btnLogout = document.getElementById("btnLogout");

document.getElementById("btnBegin").addEventListener("click", () => {
  // Change display (visibility) to hide confirmation and display textbox and links.
  divConfirmationBlock.classList.add("d-none");
  btnLogout.classList.add("d-none");
  divTextAndLinksBlock.classList.remove("d-none");

  // Switch to full screen.
  let elem = document.documentElement; // This selects the entire HTML document              
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
  }

  // Add link to Assignment Prompt, depending on the name of the file with the prompt.
  // This name should come from preceding page.
  // For now I'm hardcoding it.
  const promptFile = ["LiteratureReviewPrompt.pdf"];
  createLinks(promptFile, "promptLink");

  // Build list of links to Uploaded files.
  // This list should come to this page from the page before (via localStorage or sessionStorage)
  // For now, I'll hard-code an array with the data
  const uploadedFiles = [
    "Gilson_et_al_GAI_and_Medical_Exams.pdf",
    "Warschauer_et_al_Affordances_and_Contradictions.pdf"
  ];
  createLinks(uploadedFiles, "uploadedResourcesLinks");

  addListenersToLinks();
});

function createLinks(resources, elementID) {
  const resourcesUl = document.createElement('ul');
  resources.forEach(resource => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#";
    a.classList.add("resource-link");
    a.id = resource;
    a.textContent = resource.substring(0, 14) + "...";
    li.appendChild(a);
    resourcesUl.appendChild(li);
  });
  document.getElementById(elementID).appendChild(resourcesUl);
}

function addListenersToLinks() {
  const resourceLinks = document.querySelectorAll('.resource-link');
  resourceLinks.forEach(link => {
    console.log(link.id);
    link.addEventListener('click', () => {
      const linkSrc = "../SampleFiles/" + link.id;
      const modalId = "modalPrompt" + link.id;
      const modalHTML = `
        <div class="modal fade" id=${modalId} tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-scrollable">

            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="gradedModalLabel">${link.id}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <iframe src=${linkSrc} width="100%" height="800"></iframe>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      `;
      document.getElementById('modalContainer').innerHTML = modalHTML;

      // Initialize and show the modal
      const myModal = new bootstrap.Modal(document.getElementById(modalId));
      myModal.show();
    });
  });
}

// Listen for attempts to switch out of full screen.
// In Chrome, this works with esc button, but not with Chrome's enter/exit full screen button.
// In Safari, it works fine.
document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("mozfullscreenchange", onFullscreenChange);
document.addEventListener("MSFullscreenChange", onFullscreenChange);

function onFullscreenChange(event) {
    console.log("Fullscreen change event fired");
    if (document.fullscreenElement) {
        console.log("Entered fullscreen mode");
    } else {
        console.log("Exited fullscreen mode");
    }

}



// Close fullscreen.
// Note: Disable Submit if not in full screen. 
// If not in full screen, offer to get back to full screen
document.getElementById("btnLeaveFullscreen").addEventListener("click", () => {
  exitFullscreen();
});

document.getElementById("btnSubmit").addEventListener("click", () => {
  exitFullscreen();
});

function exitFullscreen() {
  if (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  } 
}

// List to whether the mouse is clicked inside or outside the window.
window.addEventListener('blur', function() {
  console.log('Window lost focus');
});

window.addEventListener('focus', function() {
  console.log('Window gained focus');
});