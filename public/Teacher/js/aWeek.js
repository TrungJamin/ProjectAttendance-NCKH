const viewMonth = document.querySelector(".view-aweek");
const Notes = document.querySelectorAll(".noted");
const weekNow = document.querySelector(".week-now");
const fieldOnTable = document.querySelector(".field-one-table");
const tableWeek = document.querySelector(".table-list-week");

const nextWeek = document.querySelector(".next-week");
const backWeek = document.querySelector(".back-week");

function WeekNow() {
  let d = new Date();
  return (
    "Week " +
    getWeekNow(new Date()) +
    ", Month :" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
}
weekNow.innerText = WeekNow();

for (var i = 0; i < Notes.length; i++) {
  Notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    viewMonth.classList.add("open");
  });
}
// viewMonth.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (viewMonth.classList.contains("open")) {
//     viewMonth.classList.remove("open");
//   }
// });
function getTypeDay(zeller) {
  switch (zeller) {
    case 1:
      return "T2";
    case 2:
      return "T3";
    case 3:
      return "T4";
    case 4:
      return "T5";
    case 5:
      return "T6";
    case 6:
      return "T7";
    case 0:
      return "CN";
  }
}

function dateOfWeek(listStudents, weekNow) {
  let listWeek = [];
  listStudents.forEach((student) => {
    let attendance = student.attendance.filter((att) => {
      return att.data.week == weekNow;
    });
    listWeek.push({
      ...student,
      attendance: attendance,
    });
  });
  return listWeek;
}
function renderWeek(listStudents) {
  let database = dateOfWeek(listStudents, getWeekNow(new Date()));

  let content = database[1].attendance.map((date) => {
    let d = new Date(date.day);
    return `
      <th> ${getTypeDay(d.getDay())} , ${d.getDate()} </th>
      `;
  });
  const field = `<th>STT</th>
  <th>ID</th>
  <th>First Name</th>
  <th>Last Name</th>`;
  fieldOnTable.innerHTML = field + content.join(" ");

  let table = database.map((student, index) => {
    let atd = student.attendance.map((date) => {
      return `
      <td>
      <div class=${
        date.data.status ? "comat" : date.data.asked ? "vang" : "vangkhongphep"
      }><a class="noted" href="">n</a></div>
  </td>
      `;
    });
    return `
    <tr>
    <td>${index + 1}</td>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    ${atd.join(" ")}
</tr>
    `;
  });
  tableWeek.innerHTML = table.join(" ");
}
// const = document.querySelector("#dataTable");

// nextWeek.addEventListener("click", function (e) {
//   weekNow.innerText = WeekNow() + 1;
//   renderWeek(listStudents, getWeekNow(new Date()) + 1);
// });
