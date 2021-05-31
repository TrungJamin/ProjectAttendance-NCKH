const viewMont = document.querySelector(".view-amonth");
const notes = document.querySelectorAll(".havenote");
const monthNow = document.querySelector(".month-now");
const tableMonth = document.querySelector(".table-list-month");
const nextmonth = document.querySelector(".next-month");
const backmonth = document.querySelector(".previous-month");
const nowMonth = document.querySelector(".now-month");
const searchMonth = document.getElementById("month-search");

let pre = 0;
let next = 0;
function MonthNow() {
  let d = new Date();
  return " Tháng " + (d.getMonth() + 1+ next - pre) + "/" + d.getFullYear();
}
monthNow.innerText = MonthNow();

let countHAbsent = 0;
let countAbsent = 0;
function listMonth(listStudents, aMonth) {
  let listMonth = [];

  listStudents.forEach((student) => {
    let att = student.attendance.filter((atd) => {
      let month = atd.day.split("-");
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
  let d = new Date();
  countHAbsent = 0;
  countAbsent = 0;
  let list = listMonth(listStudents, d.getMonth() + 1 + next - pre);
  let table = list.map((student, index) => {
    countHAbsent = 0;
      countAbsent = 0;
    student.attendance.forEach((att) => {
      if (!att.data.status) {
        att.data.asked ? countHAbsent++ : countAbsent++;
      }
    });
    return `
    <tr>
    <td>${index + 1}</td>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${countHAbsent}</td>
    <td>${countAbsent}</td>
</tr>
    `;
  });
  tableMonth.innerHTML = table.join(" ");
}

nextmonth.addEventListener("click", (e) => {
  e.preventDefault();
  next++;
  monthNow.innerText = MonthNow();
  renderMonth(listStudents);
});
backmonth.addEventListener("click", (e) => {
  e.preventDefault();
  pre++;
  monthNow.innerText = MonthNow();
  renderMonth(listStudents);
});
nowMonth.addEventListener("click", (e) => {
  e.preventDefault();
  pre = 0;
  next = 0;
  monthNow.innerText = MonthNow();
  renderMonth(listStudents);
});


searchMonth.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value
      .split(" ")
      .filter((item) => item != "")
      .join(" ")
      .toLowerCase();
    let tmp = listStudents.filter((student) => {
      return (
        student.name.toLowerCase().includes(value) ||
        student.id.toString().toLowerCase().includes(value) ||
        student.gender.toLowerCase().includes(value) ||
        student.phone.toLowerCase().includes(value) ||
        student.address.toLowerCase().includes(value)
      );
    });
    renderMonth(listStudents);
  } else {
    renderMonth(listStudents);
  }
});
