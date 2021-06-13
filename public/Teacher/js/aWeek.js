const viewMonth = document.querySelector(".view-aweek");
const Notes = document.querySelectorAll(".noted");
const weekNow = document.querySelector(".week-now");
const fieldOnTable = document.querySelector(".field-one-table");
const tableWeek = document.querySelector(".table-list-week");

const nextweek = document.querySelector(".next-week");
const backweek = document.querySelector(".previous-week");
const nowweek = document.querySelector(".now-week");
const searchWeek = document.getElementById("week-search");

let preW = 0;
let nextW = 0;

function WeekNow(day1, day2) {
  return (
    "Tuần Học Thứ " +
    (getWeekNow(new Date()) + nextW - preW) +
    "        : " +
    day1 +
    " đến " +
    day2
  );
}

for (var i = 0; i < Notes.length; i++) {
  Notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    viewMonth.classList.add("open");
  });
}

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
  try {
    let database = dateOfWeek(
      listStudents,
      getWeekNow(new Date()) + nextW - preW
    );

    weekNow.innerText = WeekNow(
      database[0].attendance[0].day,
      database[0].attendance[6].day
    );
    let content = database[0].attendance.map((date) => {
      let d = new Date(date.day);
      const dayNow = new Date();
      const isDayNow = d.getDate() === dayNow.getDate();
      const styleDayNow = isDayNow ? `background-color:rgb(119,171,89)` : "";
      return `
        <th class= "typeDay" id ="${
          date.day
        }" isday=${isDayNow} style=${styleDayNow}> ${getTypeDay(
        d.getDay()
      )} , ${d.getDate()} </th>
        `;
    });

    const field = `<th>STT</th>
    <th>MÃ HS</th>
    <th>Họ tên đệm</th>
    <th>Tên</th>`;
    fieldOnTable.innerHTML = field + content.join(" ");

    let table = database.map((student, index) => {
      let atd = student.attendance.map((date) => {
        const style = date.data.status
          ? ""
          : date.data.asked
          ? "color:orange"
          : "color:red";
        return `
        <td>
        <div style=${style} >${
          date.data.status ? "" : date.data.asked ? "Có Phép" : "Vắng"
        }</div>
    </td>
        `;
      });
      return `
      <tr>
      <td>${index + 1}</td>
      <td>${student.id}</td>
      <td>${String(student.firstName).replaceAll(",", " ")}</td>
      <td>${student.lastName}</td>
      ${atd.join(" ")}
  </tr>
      `;
    });
    tableWeek.innerHTML = table.join(" ");
    database[1].attendance.map((date) => {
      document.getElementById(date.day).addEventListener("click", (e) => {
        e.preventDefault();
        renderDay(
          listStudents,
          new Date(date.day).getDate(),
          new Date(date.day).getMonth() + 1,
          new Date(date.day).getFullYear()
        );
        const open = document.querySelectorAll(".open");
        open.forEach((op) => {
          op.classList.remove("open");
        });
        tableADay.classList.add("open");
        document.querySelector(".active-link").classList.remove("active-link");
        linksDay.classList.add("active-link");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

nextweek.addEventListener("click", (e) => {
  e.preventDefault();
  nextW++;

  renderWeek(listStudents);
});
backweek.addEventListener("click", (e) => {
  e.preventDefault();
  preW++;

  renderWeek(listStudents);
});
nowweek.addEventListener("click", (e) => {
  e.preventDefault();
  preW = 0;
  nextW = 0;
  renderWeek(listStudents);
});

searchWeek.addEventListener("input", (e) => {
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
    renderWeek(tmp);
  } else {
    renderWeek(listStudents);
  }
});
const resetTableWeek = document.querySelector("#btn-refresh-week");
resetTableWeek.addEventListener("click", () => {
  renderWeek(listStudents);
  searchWeek.value = "";
});
