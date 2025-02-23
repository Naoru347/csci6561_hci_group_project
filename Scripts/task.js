const divConfirmationBlock = document.getElementById("divConfirmationBlock");
const divTextAndLinksBlock = document.getElementById("divTextAndLinksBlock");

document.getElementById("btnBegin").addEventListener("click", () => {
  // Change display (visibility) to hide confirmation and display textbox and links.
  divConfirmationBlock.classList.add("d-none");
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
});

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
document.getElementById("btnSubmit").addEventListener("click", () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
});

// List to whether the mouse is clicked inside or outside the window.
window.addEventListener('blur', function() {
  console.log('Window lost focus');
});

window.addEventListener('focus', function() {
  console.log('Window gained focus');
});