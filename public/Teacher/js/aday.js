const note = document.querySelector(".note");
const links = document.querySelectorAll(".alink");
const studentsMorning = document.querySelector(".students-morning");
const studentsAfternoon = document.querySelector(".students-afternoon");

const DateNowMorning = document.querySelector(".date-now-morning");
const DateNowAfternoon = document.querySelector(".date-now-afternoon");

function getDateNow() {
  let d = new Date();
  let tmp = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  return tmp;
}
DateNowMorning.innerText = "Sáng " + getDateNow();
DateNowAfternoon.innerText = "Chiều " + getDateNow();
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

function renderMorning(listStudents) {
  let content = listStudents.map((student) => {
    return `
        <tr>
        <td> <a class="alink" href="#">${student.id}</a> </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>
            <div class="comat"><span class="noted">n</span></div>
        </td>
        <td>
            <div class="comat"></div>
        </td>
        <td>
            <div class="vangphep"><span class="noted">n</span></div>
        </td>
        <td>
            <div class="comat"></div>
        </td>
        <td>
            <div class="comat"></div>
        </td>
    </tr>
      `;
  });
  studentsMorning.innerHTML = content.join("");
}
function renderAfternoon() {
  console.log(listStudents);
  let content = listStudents.map((student) => {
    let attendance = student.attendanceDate.afternoon.map((item) => {
      return `<td> <div class=${
        item.status ? "comat" : item.asked ? "vangphep" : "vang"
      }>
      </div> </td>`;
    });
    console.log(console.log(listStudents));
    return `
     <tr>
        <td> <a class="alink" href="#">${student.id}</a> </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        ${attendance.join(" ")}
    
    </tr>
      `;
  });
  studentsAfternoon.innerHTML = content.join("");
}
function renderADay(listStudents) {
  renderMorning(listStudents);
  renderAfternoon(listStudents);
}
