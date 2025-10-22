document.addEventListener("DOMContentLoaded", () => {
  const btnAll = document.getElementById("btnAll");
  const btnCreate = document.getElementById("btnCreate");
  const createSection = document.getElementById("createSection");
  const allSection = document.getElementById("allSection");

  btnAll.addEventListener("click", () => {
    createSection.classList.add("hidden");
    allSection.classList.remove("hidden");
  });

  btnCreate.addEventListener("click", () => {
    allSection.classList.add("hidden");
    createSection.classList.remove("hidden");
  });
});
