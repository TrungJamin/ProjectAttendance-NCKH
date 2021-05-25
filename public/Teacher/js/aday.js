const dataOfDay = document.querySelector(".table-day");
const aDay = document.querySelector(".day-now");
const tableDay = document.querySelector(".table-list-day");

const nextday = document.querySelector(".next-day");
const backday = document.querySelector(".previous-day");
const nowday = document.querySelector(".now-day");

let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();

function DateNowFormat(day, month, year) {
  let tmp = day + "-" + month + "-" + year;
  return tmp;
}
function getDate(day, month, year) {
  let tmp;
  if (day < 10) tmp = month + "-0" + day + "-" + year;
  else tmp = month + "-" + day + "-" + year;
  return tmp;
}

aDay.innerText = "Ngày " + DateNowFormat(day, month, year);

// note.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (note.classList.contains("open")) {
//     note.classList.remove("open");
//   }
// });

function getAttendanceOfDay(attendances, date, id) {
  let attendance = {};
  attendance = attendances.find((att) => {
    return att.day == date;
  });
  // console.log(attendance);
  return attendance;
}

// function addEventListenerNode(id) {
//   const note = document.querySelector(".")
// }

function renderDay(listStudents) {
  tableDay.innerHTML = "";
  listStudents.map((student) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    let att = getAttendanceOfDay(student.attendance, getDate(day, month, year));
    const renderMorning = () => {
      return att.data.morning.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
    };
    console.log(att);
    // addEventListenerNode(student.id);
    const renderAfternoon = () => {
      return att.data.afternoon.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
    };
    let contentTr = `
    <td> ${student.id} </td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    ${renderMorning().join("")}
    ${renderAfternoon().join("")}
    `;
    tr.innerHTML = contentTr;
    let note = document.createElement("p");
    note.setAttribute("class", "noted");
    note.setAttribute("id", student.id);
    console.log("data", typeof att.data.note);
    let contextNote = att.data.note + " ";
    note.innerText = `"${contextNote}"`;
    console.log(note.innerText);

    note.addEventListener("click", (e) => {

      let length = 0;
      att.data.morning.forEach((item, index) => {
        document.getElementById(index).innerText = item.note;
        length++;
      });
      att.data.afternoon.forEach((item) => {
        document.getElementById(length.toString()).innerText = item.note;
        length++;
      });
      document.querySelector(".note-date").classList.remove("d-none");
    });
    td.insertAdjacentElement("beforeend", note);
    tr.append(td);
    tableDay.append(tr);
  });
}
nextday.addEventListener("click", (e) => {
  e.preventDefault();
  day++;
  if (day > maxDay(month, year)) {
    day = 1;
    if (month == 12) {
      month = 1;
      year++;
    } else {
      month++;
    }
  }
  aDay.innerText = "Ngày " + DateNowFormat(day, month, year);
  renderDay(listStudents);
});
backday.addEventListener("click", (e) => {
  e.preventDefault();
  day--;
  if (day < 1) {
    if (month == 1) {
      day = 31;
      month = 12;
      year--;
    } else {
      month--;
      day = maxDay(month, year);
    }
  }
  aDay.innerText = "Ngày " + DateNowFormat(day, month, year);
  renderDay(listStudents);
});
nowday.addEventListener("click", (e) => {
  e.preventDefault();
  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  aDay.innerText = "Ngày " + DateNowFormat(day, month, year);
  renderDay(listStudents);
});
