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
function renderSemester(listStudents) {
  let content = dateOfSemester(listStudents).map((student, index) => {
    let absentNotAsked;
    let absentAsked = (absentNotAsked = 0);
    student.attendance.forEach((date) => {
      if (!date.data.status) {
        date.data.asked ? absentAsked++ : absentNotAsked++;
      }
    });
    return `
    <tr>
    <td class="serial">${index + 1}</td>
    <td>${student.id}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${absentAsked}</td>
    <td>${absentNotAsked}</td>
    </tr>`;
  });
  bodySemester.innerHTML = content.join(" ");
}

document.querySelector(".semester-now").innerText = `Học Kì ${getSemester(
  getWeekNow(new Date())
)}`;
