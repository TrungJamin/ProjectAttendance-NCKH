const note = document.querySelector(".note");
const links = document.querySelectorAll(".alink");
const studentsMorning = document.querySelector(".students-morning");
const studentsAfternoon = document.querySelector(".students-afternoon");

const DateNowMorning = document.querySelector(".date-now-morning");
const DateNowAfternoon = document.querySelector(".date-now-afternoon");

function getDateNow() {
  let d = new Date();
  let tmp = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
  return tmp;
}

function getDate(date) {
  let tmp =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
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

function getAttendanceOfDay(attendances, date, id) {
  let attendance = {};
  attendance = attendances.find((att) => {
    return att.day == date;
  });

  return attendance;
}
function renderMorning(listStudents) {
  let content = listStudents.map((student) => {
    let att = getAttendanceOfDay(student.attendance, getDate(new Date()));
    const renderAttendance = () => {
      return att.data.morning.map((item) => {
        return `<td>
       <div class=${
         item.status ? "comat" : item.asked ? "vangphep" : "vangkhongphep"
       }>${item.note ? `<span class="noted">n</span>` : ""}
       </div>
   </td>
  `;
      });
    };
    return `
        <tr>
        <td> <a class="alink" href="#">${student.id}</a> </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        ${renderAttendance().join("")}
        <tr>`;
  });
  studentsMorning.innerHTML = content.join(" ");
}
function renderAfternoon(listStudents) {
  let content = listStudents.map((student) => {
    let att = getAttendanceOfDay(student.attendance, getDate(new Date()));
    const renderAttendance = () => {
      return att.data.afternoon.map((item) => {
        return `<td>
       <div class=${
         item.status ? "comat" : item.asked ? "vangphep" : "vangkhongphep"
       }>${item.note ? `<span class="noted">n</span>` : ""}
       </div>
   </td>
  `;
      });
    };
    return `
        <tr>
        <td> <a class="alink" href="#">${student.id}</a> </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        ${renderAttendance().join("")}
        <tr>`;
  });
  studentsAfternoon.innerHTML = content.join("");
}
function renderADay(listStudents) {
  renderMorning(listStudents);
  renderAfternoon(listStudents);
}
