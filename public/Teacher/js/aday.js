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



function getAttendanceOfDay(attendances, date, id) {
  let attendance = {};
  attendance = attendances.find((att) => {
    return att.day == date;
  });
  return attendance;
}



function renderDay(listStudents) {
  let listID = [];
  let content = listStudents.map((student) => {
    listID.push(student.id);

    let att = getAttendanceOfDay(student.attendance, getDate(day, month, year));
    const renderMorning = () => {
      return att.data.morning.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
    };
 
    const renderAfternoon = () => {
      return att.data.afternoon.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
    };
    return `
    <tr>
        <td> ${student.id} </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        ${renderMorning().join("")}
        ${renderAfternoon().join("")}
        <td > <a class ="noted" id = "${student.id}">${att.data.note}</a></td>
        </tr>`;
  });
  tableDay.innerHTML = content.join(" ");

  listID.forEach((id) => {
    document.getElementById(id).addEventListener("click", (e) => {
      let noteStudent;
      let i = 0;
      for (let i = 0; id != listStudents[i].id; i++);
      document.querySelector(".panel-heading").innerText = "Họ & Tên : "+listStudents[i].name;
      noteStudent = getAttendanceOfDay(
        listStudents[i].attendance,
        getDate(day, month, year)
      );
      let length = 0;
      noteStudent.data.morning.forEach((item, index) => {
        document.getElementById(index).innerText = item.note;
        length++;
      });
      noteStudent.data.afternoon.forEach((item) => {
        document.getElementById(length.toString()).innerText = item.note;
        length++;
      });
      document.querySelector(".note-date").classList.remove("d-none");
    });
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
