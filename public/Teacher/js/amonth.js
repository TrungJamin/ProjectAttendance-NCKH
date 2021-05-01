const viewMont = document.querySelector(".view-amonth");
const notes = document.querySelectorAll(".havenote");

for (var i = 0; i < notes.length; i++) {
  notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    viewMont.classList.add("open");
    console.log(viewMont.classList);
  });
}
viewMont.addEventListener("click", (e) => {
  e.preventDefault();
  if (viewMont.classList.contains("open")) {
    viewMont.classList.remove("open");
  }
});

