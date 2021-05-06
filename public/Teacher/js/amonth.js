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

function getTypeDay(zeller) {
  switch (zeller) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
  }
}
