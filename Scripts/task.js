const divConfirmationBlock = document.getElementById("divConfirmationBlock");
const divTextAndLinksBlock = document.getElementById("divTextAndLinksBlock");
const pFullscreenWarning = document.getElementById("fullscreenWarning");
const confirmSubmitModal = new bootstrap.Modal(document.getElementById("confirmSubmitModal"));
const textareaInput = document.getElementById("textareaInput");

// Save the typed text in this buffer.
// Upload it periodically to the json storage file; I guess there could be 
// an unsubmitted field.
// On submit, uplod to the same file but in a submitted areaa.
let textareaBuffer;

// User confirms that they want to start assignment
document.getElementById("btnBegin").addEventListener("click", () => {
  // Change display (visibility) to hide confirmation and display textbox and links.
  divConfirmationBlock.classList.add("d-none");
  btnLogout.classList.add("d-none");
  divTextAndLinksBlock.classList.remove("d-none");
  pFullscreenWarning.classList.remove("d-none");


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
    console.log(link.id);
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
  console.log("Entered getDcMdl")
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


// Listen for attempts to switch out of full screen.
// In Chrome on Mac, this works with esc button, but not with Chrome's enter/exit full screen button.
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

        // Commented out for development.
        //window.open("./login.html", "_self");
    }
}

// Save type text automatically via the global editor saved in tinymce.init (in the hmtl file)
// The editorInitialized event is created in tiny.init and dispatched to document.
document.addEventListener('editorInitialized', function () {
  // Ensure the editor is initialized
  if (window.myEditor) {
      console.log('Editor initialized');
      // Add an event listener for the 'change' event
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

// Submit is confirmed inside the confirmation modal
document.getElementById("confirmSubmitBtn").addEventListener("click", () => {
  console.log(textareaBuffer);
  

  exitFullscreen();
});

// To prevent back button once this page is left.
// If user leaves Full Screen w/o submitting, 
// they are directed to Login where they can't use the back button to get back here.
window.history.forward();
function noBack() {
    window.history.forward();
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

// List to whether the mouse is clicked inside or outside the window.
// Note: When inside the tinymce editor, the mouse is registered as being outside the window
window.addEventListener('blur', function() {
  console.log('Window lost focus');
});

window.addEventListener('focus', function() {
  console.log('Window gained focus');
});

