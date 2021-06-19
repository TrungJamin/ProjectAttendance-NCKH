// next and previous semester
const previousSemester = document.querySelector(".previous-semester");
const nextSemester = document.querySelector(".next-semester");
const semesterNow = document.querySelector(".semester-now");
const exportSemester = document.querySelector("#data-semester-export");
nextSemester.addEventListener("click", () => {
  semesterNow.innerHTML = "Học kỳ 2";
  renderSemester(listStudents, 2);
});
previousSemester.addEventListener("click", () => {
  semesterNow.innerHTML = "Học kỳ 1";
  renderSemester(listStudents, 1);
});

const bodySemester = document.querySelector(".table-list-semester");
function dateOfSemester(listStudents, semester = 1) {
  let listSemester = [];
  listStudents.forEach((student) => {
    let attendance = student.attendance.filter((att) => {
      return getSemester(att.data.week) == semester;
    });
    listSemester.push({
      ...student,
      attendance: attendance,
    });
  });
  return listSemester;
}
function renderSemester(listStudents, semester = 1) {
  bodySemester.innerHTML = "";
  exportSemester.setAttribute(
    "export",
    "Học Kỳ " + semester + " " + new Date().getFullYear()
  );
  dateOfSemester(listStudents, semester).forEach((student, index) => {
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
        const day = tmpDate.getDate();
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
        const day = tmpDate.getDate();
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
    bodySemester.append(tr);
  });
}

document.querySelector(".semester-now").innerText = `Học Kì ${getSemester(
  getWeekNow(new Date())
)}`;
const search = document.querySelector("#semester-search");
search.addEventListener("input", (e) => {
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
    renderSemester(tmp);
  } else {
    renderSemester(listStudents);
  }
});
const restTable = document.querySelector("#btn-search-semester");

restTable.addEventListener("click", (e) => {
  renderSemester(listStudents);
  search.value = "";
});
