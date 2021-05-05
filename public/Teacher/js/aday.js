const note = document.querySelector(".note");
const links = document.querySelectorAll(".alink");


for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    e.preventDefault();
    note.classList.add("open");
    console.log(note.classList);
  });
}
note.addEventListener("click", (e) => {
  e.preventDefault();
  if (note.classList.contains("open")) {
    note.classList.remove("open");
  }
});

function render(listStudents) {
  let content = listStudents.map((student) => {
    return `
      <tr>
      <td > <a class="alink"href="#">${student.id}</a> </td>
      <td >${student.firstName}</td>
      <td >${student.lastName}</td>
      <td>
          <div class="comat"></div>
      </td>
      <td>
          <div class="comat"></div>
      </td>
      <td>
          <div class="vangphep"></div>
      </td >
      <td >
          <div class="comat"><span class="noted">n</span></div>
      </td>
      <td >
          <div class="comat"></div>
      </td>
  </tr>
      `;
  });
}
