const divConfirmationBlock = document.getElementById("divConfirmationBlock");
const divTextAndLinksBlock = document.getElementById("divTextAndLinksBlock");

const btnBegin = document.getElementById("btnBegin");
btnBegin.addEventListener("click", () => {
  divConfirmationBlock.classList.add("d-none");
  divTextAndLinksBlock.classList.remove("d-none");
});

