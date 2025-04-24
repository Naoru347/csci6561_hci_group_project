const divConfirmationBlock = document.getElementById("divConfirmationBlock");
const divTextAndLinksBlock = document.getElementById("divTextAndLinksBlock");
const pFullscreenWarning = document.getElementById("fullscreenWarning");
const confirmSubmitModal = new bootstrap.Modal(document.getElementById("confirmSubmitModal"));
const exitedFullscreenModalElement = document.getElementById("exitedFullscreenModal"); // I need this DOM element to listen to whether it is out of focus (blur)
const exitedFullscreenModal = new bootstrap.Modal(exitedFullscreenModalElement); 
//const textareaInput = document.getElementById("textareaInput");
const logoutButton = document.getElementById("logoutButton");
const welcomeEl = document.getElementById("welcomeMessage");
const assignmentNameInConfirmationBlock = document.getElementById("assignmentNameInConfirmationBlock");
const assignmentNameInEditor = document.getElementById("assignmentNameInEditor");

// These are for collecting info to send to database.json
let textareaBuffer = 'None';
let user;
let assignment;
let violations = [];
let pendingPayload = {};

let confirmSubmitClicked = false; // This is necessary to determine if leaving fullscreen is a violation

// Get user and assingment info from localStorage and their names to page
document.addEventListener("DOMContentLoaded", async () => { 

  // User was stored in localStorage on login.js
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) console.log("No user logged in.");
  try {
    user = JSON.parse(storedUser);
    //userNameDisplay.innerText = `Hello, ${user.fullName}!`;
    welcomeEl.innerHTML = `Logged in as ${user.fullName}`;
  } catch (err) {
    console.error("Failed to parse loggedInUser:", err);
    return alert("Session data corrupted.");
  }

  //Assignment was stored to localStorage on landing.js
  const storedAssignment = localStorage.getItem("selectedAssignment");
  if (!storedAssignment) console.log("No assignment selected logged in.");
  try {
    assignment = JSON.parse(storedAssignment);
    //console.log(assignment);
    assignmentNameInConfirmationBlock.innerText = "the " + assignment.name.toLowerCase();
  } catch (err) {
    console.error("Failed to parse storedAssigment:", err);
    return alert("Session data corrupted.");
  }  
});

// User confirms that they want to start assignment
document.getElementById("btnBegin").addEventListener("click", () => {
  // Change display (visibility) to hide confirmation and display textbox and links.
  divConfirmationBlock.classList.add("d-none");
  logoutButton.classList.add("d-none");
  divTextAndLinksBlock.classList.remove("d-none");
  pFullscreenWarning.classList.remove("d-none");
  welcomeEl.classList.add("d-none");

  // Switch to full screen.
  enterFullscreen();

  // Add assignment name to the Editor's head
  assignmentNameInEditor.innerText = assignment.name;

  // Add link to Assignment Prompt, depending on the name of the file with the prompt.
  // This name should come from preceding page.
  // For now I'm hardcoding it.
  const promptFile = ["Annotated_Bibliography.pdf"];
  createLinks(promptFile, "promptLink");

  // Build list of links to Uploaded files.
  // This list should come to this page from the page before (via localStorage or sessionStorage)
  // For now, I'll hard-code an array with the data
  const uploadedFiles = [
    "Gilson_et_al_GAI_and_Medical_Exams.pdf",
    "Warschauer_et_al_Affordances_and_Contradictions.pdf"
  ];
  createLinks(uploadedFiles, "uploadedResourcesLinks");

  // External Resources
  const externalLinks = ["Dictionary"]
  createLinks(externalLinks, "externalLinks");

  addListenersToLinks();
});

function createLinks(resources, elementID) {
  const resourcesUl = document.createElement('ul');
  resources.forEach(resource => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#";
    a.classList.add('resource-link');
    a.id = resource;
    a.textContent = (resource.length < 15) ? resource : resource.substring(0, 14) + "...";
    li.appendChild(a);
    resourcesUl.appendChild(li);
  });
  document.getElementById(elementID).appendChild(resourcesUl);
}

function addListenersToLinks() {
  const resourceLinks = document.querySelectorAll('.resource-link');
  resourceLinks.forEach(link => {
    //console.log(link.id);
    link.addEventListener('click', () => {
      let modalBody;
      let modalId = "modalPrompt" + link.id;
      
      // Not the best way to distinguish betw local and external resources,
      // but it'll do for now.
      if (link.id !== 'Dictionary') {
        modalBody = `<iframe src="../SampleFiles/${link.id}" width="100%" height="800"></iframe>`
        document.getElementById('modalContainer').innerHTML = getModalHTML(modalId, link.id, modalBody); 
      } else {
        modalBody = getDictionaryModalBody();
        document.getElementById('modalContainer').innerHTML = getModalHTML(modalId, link.id, modalBody);
        addDictionaryScript();
      }

      // Initialize and show the modal
      const myModal = new bootstrap.Modal(document.getElementById(modalId));
      myModal.show();
    });
  });
}

function getModalHTML(modalId, linkId, modalBody) {
  const modalHTML = `
        <div class="modal fade" id=${modalId} tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-scrollable">

            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="gradedModalLabel">${linkId}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ${modalBody}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      `;
      return modalHTML;
}


function getDictionaryModalBody() {
  //console.log("Entered getDcMdl")
  const modalBody = 
  `
    <input type="text" id="input" placeholder="Type a word">
    <div style="margin-top:10pt;">
      <button type="button" id="searchBtn">Search</button>
    </div>
    <div style="margin-top:10pt;"><hr></div>
    <div id="outputDiv" style="margin-top:10pt;"></div>
    <div style="margin-top:10pt;"><hr></div>
    <p>Powered by Free Dictionary API</p>
    
  `
  return modalBody

}

// Script for Dictionary Modal
function addDictionaryScript() {
  const input = document.getElementById('input')
  const outputDiv = document.getElementById('outputDiv')
  
  document.getElementById('searchBtn').addEventListener('click', ()=> {
    const apiCall = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ input.value.toLowerCase().trim();
    console.log(apiCall)
    fetch(apiCall)
      .then(res => {
        if (!res.ok) {
          throw new Error("No Definition Found");
        }
        return res.json();
      })
      .then(data => displayDictionarydata(data))
      .catch(error => {
        if (error.message === "No Definition Found") {
          outputDiv.innerHTML = "<p>No Definition Found</p>";
        } else {
          outputDiv.innerHTML = "<p>Connection Failure</p>";
        }
      });

      function displayDictionarydata(data) {
        console.log(data)
        let outputString = '';
        data.forEach((element, index) => {
          outputString = outputString + `<h2>${element.word}<sup>${index+1}</sup></h2>`;
          if (element.meanings) {
            element.meanings.forEach(meaning => {
              outputString = outputString + `<p><i>${meaning.partOfSpeech}: </i></p>`;
              if (meaning.definitions) {
                  meaning.definitions.forEach(definition => {
                  outputString = outputString + `<p> - ${definition.definition}</i></p>`;
                })
              }
            })
          }
        })
        outputDiv.innerHTML = outputString;
      }

  })
    
}


// In different browsers, listen for attempts to switch out of full screen.
// In Chrome on Mac, this works with esc button, but not with Chrome's enter/exit full screen button.
// In Safari, it works fine.
document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("mozfullscreenchange", onFullscreenChange);
document.addEventListener("MSFullscreenChange", onFullscreenChange);

async function onFullscreenChange(event) {
    console.log("Fullscreen change event fired");
    if (document.fullscreenElement || document.webkitfullscreenchange || document.mozfullscreenchange || document.MSFullscreenChange) {
        console.log("Entered fullscreen mode");
    } else {
        console.log("Exited fullscreen mode");
        console.log("confirmSubmitClicked " + confirmSubmitClicked )
        if ( !confirmSubmitClicked ) {
          exitedFullscreenModal.show();
        }
    }
}

// Inside exitedFullscreenModal, if No is chosen, re-enter fullscreen
document.getElementById("backToFullscreen").addEventListener("click", () => {
  // backToFullscreenClicked = true;
  enterFullscreen();
});
// Inside exitedFullscreenModal, if Yes, is chosen, record violation, submit current assignment, and redirect to landing.html
document.getElementById("leaveWithoutSubmission").addEventListener("click", async () => {
  submitWithViolation();
});
// In case user click outside modal, show exitedFullscreenModal again (until user choses yes or no)
exitedFullscreenModalElement.addEventListener('blur', async () => {
  console.log("exitedFullscreenModalElement lost focus");
  exitedFullscreenModal.show();
});

async function submitWithViolation() {
  const violation = {
    id: "violation3",
    type: "Fullscreen exited before submission",
    timestamp: new Date().toISOString(),
    description: "Fullscreen mode was left before submission.",
    teacherNote: "Please remember that exiting fullscreen mode before clicking Submit is not allowed.",
    studentComment: "NONE"
  };
  violations.push(violation);
  await saveToLocalStorage();
  await sendToDb();
  
  //alert("Assignment saved with a violation");
  // Submit current text with a violoation and then navigate to landing.html
  window.location.href = "./landing.html";
}  
  


// Save typed text automatically via the global editor saved in tinymce.init (in the hmtl file)
// The editorInitialized event is created in tiny.init and dispatched to document.
document.addEventListener('editorInitialized', function () {
  // Ensure the editor is initialized
  if (window.myEditor) {
      console.log('Editor initialized');
      // Add an event listener for the 'input' event
      window.myEditor.on('input', function () {
          // Log the current content of the editor to the console
          //console.log(window.myEditor.getContent());

          // Save the current content of the editor to the textareaBuffer
          // getContent() w/o parameters saves the text and the html tags
          // To save text only, use getContent({format: "text"})
          textareaBuffer = window.myEditor.getContent();

      });
  } else {
      console.error('Editor not initialized');
  }
});

// Submit button gets confirmation modal
document.getElementById("btnSubmit").addEventListener("click", () => {
  confirmSubmitModal.show();
});

// Back to assignment button clicked inside confirmation modal
document.getElementById("continueLink").addEventListener("click", () => {
  confirmSubmitModal.hide();
});

// Submit is confirmed inside the confirmation modal
document.getElementById("confirmSubmitBtn").addEventListener("click", async () => {
  confirmSubmitClicked = true; // Make sure exiting fullscreen with submit doesn't generate a violation
  await saveToLocalStorage();
  await sendToDb();

  // I'm replacing alert with modal; without one of them there is not enough time to save to DB
  const confirmCorrectSubmissionModal = new bootstrap.Modal(document.getElementById("confirmCorrectSubmissionModal"));
  confirmCorrectSubmissionModal.show();
  document.getElementById("goToAssignmentsAfterSubmit").addEventListener("click", () => {
    window.location.href = "./landing.html";
  });
  
  
  //alert("Assignment submitted"); // This alert is needed so that the saving to DB has enought time (despite await)
  
  // The delay is needed for saving to DB (despite await?). Not very graceful: shows broken link page for a while
  //setTimeout(() => {window.location.href = "./landing.html";}, 50 );
});


async function saveToLocalStorage() {
  localStorage.setItem("selectedAssignment", JSON.stringify({
    id: assignment.id,
    name: assignment.name,
    prompt: assignment.prompt,
    points: assignment.points,
    mode: "Unlocked Composition",
    status: "submitted"
  }));
};

async function sendToDb() {
  // Send the text of textareaBuffer to server
  pendingPayload = {
    email: user.email,
    submitted: confirmSubmitClicked,
    assignmentId: assignment.id,
    submittedAt: new Date().toISOString(),
    points: assignment.points,
    finalText: textareaBuffer,
    violations: violations
  }

  if (!pendingPayload) return;
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingPayload),
    });

    if (response.ok) {
      console.log('Submitted to database.json')
    } else {
      throw new Error("Failed to save comment.");
    }
  } catch (err) {
    console.error(err);
    //alert("Error submitting assignment.");
  }
}

// Back to landing page button logic
document.getElementById("btnBackHome").addEventListener("click", () => {
  window.location.href = "./landing.html";
});
// To prevent back button once this page is left.
// If user leaves Full Screen w/o submitting, 
// they are directed to Login where they can't use the back button to get back here.
window.history.forward();
function noBack() {
    window.history.forward();
}

function enterFullscreen() {
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
}

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


// Listen to whether TinyMCE editor has bee clicked or left.
// If TinyMCE editor is clicked, window loses focus, but the user has not not commited a violation.
// NOTE: These custom events are dispatched from the TinyMCE script on task.html.
let insideEditor = false;
document.addEventListener('clickInsideEditor', function (){
  insideEditor = true;
  console.log("insideEditor: " + insideEditor);
})

document.addEventListener('clickOutsideEditor', function (){
  insideEditor = false;
  console.log("insideEditor: " + insideEditor);
})

// Function to create a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// List to whether the mouse is clicked inside or outside the window.
// Note: When inside the tinymce editor, the mouse is registered as being outside the window
window.addEventListener('blur', async function() {
  console.log('Window lost focus');

  await delay(500);

  console.log("As windwon lost focus and after delay, insideEditor = " + insideEditor);

  if (!insideEditor) {
    const violation = {
      id: "violation1",
      type: "Window focus lost",
      timestamp: new Date().toISOString(),
      description: "The system detected that you clicked outside of the locked browser window.",
      teacherNote: "Please remember that clicking outside the lockdown area is not allowed.",
      studentComment: "NONE"
    };
    violations.push(violation);
    console.log(violations);
  }  

});

window.addEventListener('focus', function() {
  console.log('Window gained focus');
  insideEditor = false;
  console.log("insideEditor: " + insideEditor);
});





