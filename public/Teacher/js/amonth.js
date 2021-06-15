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
  return " Tháng " + (d.getMonth() + 1 + next - pre) + "/" + d.getFullYear();
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

const notification = document.querySelector(".container-date-off");
const nameStudentOfDayOff = document.querySelector(".panel-name-notice");
const listDayOff = document.querySelector("#list-date-off");
function renderMonth(listStudents) {
  tableMonth.innerHTML = "";
  let d = new Date();
  countHAbsent = 0;
  countAbsent = 0;
  let list = listMonth(listStudents, d.getMonth() + 1 + next - pre);

  list.forEach((student, index) => {
    const tr = document.createElement("tr");
    countNotAbsent = 0;
    countAbsent = 0;
    const listAsked = [];
    const listNotAsked = [];
    student.attendance.forEach((att) => {
      if (!att.data.status) {
        if (att.data.asked) {
          listAsked.push(att.day);
          countAbsent++;
        } else {
          listNotAsked.push(att.day);
          countNotAbsent++;
        }
      }
    });
    const content = `
    <td>${index + 1}</td>
    <td>${student.id}</td>
    <td>${String(student.firstName).replaceAll(",", " ")}</td>
    <td>${student.lastName}</td>
    `;

    tr.innerHTML = content;
    const notAbsent = document.createElement("td");
    notAbsent.innerText = countNotAbsent;
    notAbsent.style.cursor = "pointer";
    const absent = document.createElement("td");
    absent.innerText = countAbsent;
    absent.style.cursor = "pointer";
    tr.append(absent);
    tr.append(notAbsent);

    notAbsent.addEventListener("click", (e) => {
      notification.classList.remove("d-none");
      nameStudentOfDayOff.innerText = "Họ Và Tên :" + student.name;
      document.querySelector(".month-title-date-off").innerText =
        "Danh Sách Các Ngày Vắng Không Phép";
      listDayOff.innerHTML = "";
      listNotAsked.forEach((date) => {
        const tr = document.createElement("tr");
        tr.setAttribute("id", "date-off");
        const tmpDate = new Date(date);
        const month = tmpDate.getMonth() + 1;
        const day = tmpDate.getDate() + 1;
        const year = tmpDate.getFullYear();
        tr.addEventListener("click", (e) => {
          activeDate();
          document.querySelector(".container-date-off").classList.add("d-none");
          renderDay(listStudents, day, month, year);
        });
        tr.innerText = DateNowFormat(day, month, year);
        tr.style.cursor = "pointer";
        listDayOff.append(tr);
      });
    });
    absent.addEventListener("click", (e) => {
      notification.classList.remove("d-none");
      nameStudentOfDayOff.innerText = "Họ Và Tên :" + student.name;
      document.querySelector(".month-title-date-off").innerText =
        "Danh Sách Các Ngày Vắng Có Phép";
      listDayOff.innerHTML = "";
      listAsked.forEach((date) => {
        const tr = document.createElement("tr");
        const tmpDate = new Date(date);
        const month = tmpDate.getMonth() + 1;
        const day = tmpDate.getDate() + 1;
        const year = tmpDate.getFullYear();
        tr.addEventListener("click", (e) => {
          activeDate();
          document.querySelector(".container-date-off").classList.add("d-none");
          renderDay(listStudents, day, month, year);
        });
        tr.innerText = DateNowFormat(day, month, year);
        tr.style.cursor = "pointer";
        listDayOff.append(tr);
      });
    });
    tableMonth.append(tr);
  });
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
    renderMonth(tmp);
  } else {
    renderMonth(listStudents);
  }
});
const resetTableMonth = document.querySelector("#btn-refresh-month");
resetTableMonth.addEventListener("click", () => {
  renderMonth(listStudents);
  searchMonth.value = "";
});
