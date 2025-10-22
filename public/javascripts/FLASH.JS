document.addEventListener("DOMContentLoaded", () => {
  const flash = document.getElementById("flashMessage");
  if(flash){
    // Hide after 3 seconds (3000 ms)
    setTimeout(() => {
      flash.style.transition = "opacity 0.5s";
      flash.style.opacity = "0";
      // Optional: remove from DOM after fade
      setTimeout(() => flash.remove(), 200);
    }, 3000);
  }
})