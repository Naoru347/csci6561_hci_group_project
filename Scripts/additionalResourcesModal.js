// Eventually, the file name should come from localStorage or sessionStorage
const promptFileNamePath = '../SampleFiles/LiteratureReviewPrompt.pdf';



document.getElementById("linkOpenPrompt").addEventListener("click", () => {
  const modalHTML = `
      <div class="modal fade" id="modalPrompt" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">

          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="gradedModalLabel">Assignment Prompt</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <iframe src=${promptFileNamePath} width="100%" height="800"></iframe>
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
  const myModal = new bootstrap.Modal(document.getElementById('modalPrompt'));
  myModal.show();

});