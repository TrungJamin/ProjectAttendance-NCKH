const viewMonth = document.querySelector(".view-aweek");
const Notes = document.querySelectorAll(".noted");

for (var i = 0; i < Notes.length; i++) {
  Notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    console.log("chay");
    viewMonth.classList.add("open");
    console.log(viewMonth.classList);
  });
}
viewMonth.addEventListener("click", (e) => {
  e.preventDefault();
  if (viewMonth.classList.contains("open")) {
    viewMonth.classList.remove("open");
  }
});
const listStudents = [];
db.collection("Students")
  .orderBy("lastName")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      listStudents.push(doc.data());
    });
  })
  .catch(function (error) {});
