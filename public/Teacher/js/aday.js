const note = document.querySelector(".note");

const aDay = document.querySelector(".day-now");
const tableDay = document.querySelector(".table-list-day");



function DateNowFormat(date) {
  let tmp =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  return tmp;
}
function getDate(date) {
  let tmp =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
  return tmp;
}
aDay.innerText = "Ngày "+ DateNowFormat(new Date());

// for (var i = 0; i < links.length; i++) {
//   links[i].addEventListener("click", (e) => {
//     e.preventDefault();
//     note.classList.add("open");
//     console.log(note.classList);
//   });
// }
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
  console.log(attendance);
  return attendance;
}
function renderDay(listStudents) {
  let content = listStudents.map((student) => {
    let att = getAttendanceOfDay(student.attendance, getDate(new Date()));
    const renderMorning = ()=>{
      return att.data.morning.map((item)=>{
        return `<td> ${item.status ? "": item.asked ? "p" : "k"}</td>
        `
      })
    };
    const renderAfternoon = ()=>{
      return att.data.afternoon.map((item)=>{
        return `<td> ${item.status ? "": item.asked ? "p" : "k"}</td>
        `
      })
    };
    return `
    <tr>
        <td> ${student.id} </td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        ${renderMorning().join("")}
        ${renderAfternoon().join("")}
        <td class ='noted'> ${att.data.note}</td>
        </tr>`;
  });
  tableDay.innerHTML = content.join(" ");
}
