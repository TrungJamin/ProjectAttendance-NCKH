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
function resetNote() {
  for (let i = 0; i < 10; i++) {
    console.log("running");
    document.getElementById(i.toString()).innerText = "";
  }
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

const formatNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};
const formatDateSearch = (y, m, d) => {
  return `${y}-${formatNumber(m)}-${formatNumber(d)}`;
};
function renderDay(listStudents, d, m, y) {
  aDay.innerText = "Ngày " + DateNowFormat(d, m, y);
  inputSearchDate.value = formatDateSearch(y, m, d);
  tableDay.innerHTML = "";
  listStudents.map((student, index) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    let att = getAttendanceOfDay(student.attendance, getDate(d, m, y));
    const renderMorning = () => {
      let renderAtt = att.data.morning.map((item) => {
        const style = item.status
          ? ""
          : item.asked
          ? "color:#06ad35"
          : "color:red";
        return `<td id="attendance" style=${style}> ${
          item.status ? "" : item.asked ? "P" : "V"
        }</td>
      `;
      });
      let renderTmp = createArrayAttendance(att.data.morning).map(
        (item) => `<td> ${item.status ? "" : item.asked ? "P" : "V"}</td>`
      );
      return renderAtt.concat(renderTmp);
    };

    const renderAfternoon = () => {
      let renderAtt = att.data.afternoon.map((item) => {
        const style = item.status
          ? ""
          : item.asked
          ? "color:#06ad35"
          : "color:red";
        return `<td id="attendance" style=${style}> ${
          item.status ? "" : item.asked ? "P" : "V"
        }</td>
        `;
      });
      let renderTmp = createArrayAttendance(att.data.afternoon).map((item) => {
        const style = item.status
          ? ""
          : item.asked
          ? "color:#06ad35"
          : "color:red";
        return `<td style=${style}> ${
          item.status ? "" : item.asked ? "P" : "V"
        }</td>`;
      });
      return renderAtt.concat(renderTmp);
    };

    let contentTr = `
    <td>${index + 1}</td>
    <td> ${student.id} </td>
    <td>${String(student.firstName).replaceAll(",", " ")}</td>
    <td>${student.lastName}</td>
    ${renderMorning().join("")}
    ${renderAfternoon().join("")}
    `;
    tr.innerHTML = contentTr;
    const note = document.createElement("p");
    note.setAttribute("class", "noted");
    note.setAttribute("id", student.id);

    let contextNote = att.data.note + " ";
    note.innerText = `"${String(contextNote).replace(",", "")}"`;
    note.addEventListener("click", (e) => {
      resetNote();
      document.querySelector(".panel-name-note").innerText =
        "Họ Tên: " + student.name;
      let length = 0;
      att.data.morning.forEach((item, index) => {
        const subject = item.code.split("-")[1];
        document.getElementById(index).innerText = "";
        document.getElementById(index).innerText =
          subject.toUpperCase() + " : " + item.note;
        length++;
      });
      att.data.afternoon.forEach((item) => {
        const subject = item.code.split("-")[1];
        document.getElementById(length.toString()).innerText =
          subject.toUpperCase() + " : " + item.note;
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

const cancel = document.querySelectorAll(".panel-cancel");
cancel.forEach((e) => {
  e.addEventListener("click", (e) => {
    document.querySelectorAll(".box-screen").forEach((e) => {
      e.classList.add("d-none");
    });
  });
});
// document.querySelector(".panel-cancel").addEventListener("click", (e) => {
//   document.querySelector(".note-date").classList.add("d-none");
// });

searchDay.addEventListener("input", (e) => {
  e.preventDefault();
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
const resetTableDay = document.querySelector("#btn-refresh-day");
resetTableDay.addEventListener("click", () => {
  renderDay(listStudents, day, month, year);
  searchDay.value = "";
});

const inputSearchDate = document.querySelector("#input-search-date");

inputSearchDate.addEventListener("change", (e) => {
  const date = new Date(inputSearchDate.value);
  if (date.getDate() && date.getMonth() && date.getFullYear())
    renderDay(
      listStudents,
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear()
    );
});
