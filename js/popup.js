const overlay = document.querySelector(".overlay");

document.addEventListener("click", (e) => {
  if (e.target === overlay) {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  }
});

function openModal(modal, taskValue) {
  if (modal == null) return;
  modal.classList.add("active");
  modal.querySelector("input").value = taskValue;
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
