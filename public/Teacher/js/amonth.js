const viewMont = document.querySelector(".view-amonth");
const notes = document.querySelectorAll(".havenote");

// for (var i = 0; i < notes.length; i++) {
//   notes[i].addEventListener("click", (e) => {
//     e.preventDefault();
//     viewMont.classList.add("open");
//     console.log(viewMont.classList);
//   });
// }
// viewMont.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (viewMont.classList.contains("open")) {
//     viewMont.classList.remove("open");
//   }
// });

// const renderListOfMonth = document.querySelector(".month-list-student");
// const renderAMonth = (listStudents) => {
//   console.log(renderListOfMonth);
// };
const monthNow = document.querySelector(".month-now");

const tableMonth = document.querySelector(".table-list-month");

const nextmonth = document.querySelector(".next-month");
const backmonth = document.querySelector(".back-month");

function MonthNow() {
  let d = new Date();
  return (
    " Month :" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
}
monthNow.innerText = MonthNow();
 
let countHAbsent = 0;
let countAbsent = 0;
function listMonth(listStudents, aMonth) {
  
  let listMonth = [];
  console.log(listStudents);
  listStudents.forEach((student) => {
    let att = student.attendance.filter((atd)=>{
      
      let month = atd.day.split('-');
      console.log(month+"   "+aMonth);
       return month[0] == aMonth;
    });
  
    listMonth.push({
      ...student,
      attendance: att,
    });
  });
  return listMonth;
}
function renderMonth(listStudents) {
  let d  = new Date();
 let list = listMonth(listStudents,d.getMonth()+1 );
  let table = list.map((student, index) => {
    
    return `
    <tr>
    <td>${index + 1}</td>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${3}</td>
    <td>${3}</td>
</tr>
    `;
  });
  tableMonth.innerHTML = table.join(" ");
};
