const dataOfDay = document.querySelector(".table-day");
const aDay = document.querySelector(".day-now");
const tableDay = document.querySelector(".table-list-day");

const nextday = document.querySelector(".next-day");
const backday = document.querySelector(".previous-day");
const nowday = document.querySelector(".now-day");

const searchDay = document.getElementById("day-search");

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

function getAttendanceOfDay(attendances, date, id) {
  let attendance = {};
  attendance = attendances.find((att) => {
    return att.day == date;
  });
  return attendance;
}
function createArrayAttendance(array) {
  const newArray = [];
  const item = {
    status: true,
    asked: true,
  };
  for (let i = 0; i < 5 - array.length; i++) {
    newArray.push(item);
  }
  return newArray;
}
function renderDay(listStudents, d, m, y) {
  console.table(listStudents);
  aDay.innerText = "Ngày " + DateNowFormat(d, m, y);
  tableDay.innerHTML = "";
  listStudents.map((student, index) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    let att = getAttendanceOfDay(student.attendance, getDate(d, m, y));
    const renderMorning = () => {
      let renderAtt = att.data.morning.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
      let renderTmp = createArrayAttendance(att.data.morning).map(
        (item) => `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>`
      );
      return renderAtt.concat(renderTmp);
    };

    const renderAfternoon = () => {
      let renderAtt = att.data.afternoon.map((item) => {
        return `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>
        `;
      });
      let renderTmp = createArrayAttendance(att.data.afternoon).map(
        (item) => `<td> ${item.status ? "" : item.asked ? "p" : "k"}</td>`
      );
      return renderAtt.concat(renderTmp);
    };
    let contentTr = `
    <td>${index + 1}</td>
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

    let contextNote = att.data.note + " ";
    note.innerText = `"${contextNote}"`;

    note.addEventListener("click", (e) => {
      document.querySelector(".panel-name").innerText =
        "Họ Tên: " + student.name;
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
  renderDay(listStudents, day, month, year);
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
  renderDay(listStudents, day, month, year);
});
nowday.addEventListener("click", (e) => {
  e.preventDefault();
  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  renderDay(listStudents, day, month, year);
});

document.querySelector(".delete").addEventListener("click", (e) => {
  document.querySelector(".note-date").classList.add("d-none");
});

searchDay.addEventListener("input", (e) => {
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
    renderDay(tmp, day, month, year);
  } else {
    renderDay(listStudents, day, month, year);
  }
});
