
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
  if(day<10)
    tmp = month + "-0" + day + "-" + year;
  else
    tmp = month + "-" + day + "-" + year;
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

function renderNote(node) {
  console.log(node);
}

function renderDay(listStudents) {
  let content = listStudents.map((student) => {
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
  const note = document.querySelectorAll(".noted");
  for(var i = 0 ; i < note.length; i++){
    console.log(note[i]);
    note[i].addEventListener("click",(e)=>{
        e.preventDefault();
        renderNote(note[i]);
    })
    
}
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


