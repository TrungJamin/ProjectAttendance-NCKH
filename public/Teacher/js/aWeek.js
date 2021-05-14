const viewMonth = document.querySelector(".view-aweek");
const Notes = document.querySelectorAll(".noted");
const weekNow = document.querySelector(".week-now");
const viewDayInWeek = document.querySelector(".last");
const tableWeek = document.querySelector(".table-week");

const nextWeek = document.querySelector(".next-week");
const backWeek = document.querySelector(".back-week");

function WeekNow() {
  let d = new Date();
  return (
    "Week " +
    getWeekNow(new Date()) +
    ", Month :" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
}
weekNow.innerText = WeekNow();

for (var i = 0; i < Notes.length; i++) {
  Notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    console.log("chay");
    viewMonth.classList.add("open");
    console.log(viewMonth.classList);
  });
}
viewMonth.addEventListener("click", (e) => {
  e.preventDefault();
  if (viewMonth.classList.contains("open")) {
    viewMonth.classList.remove("open");
  }
});
function getTypeDay(zeller) {
  switch (zeller) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 0:
      return "Sun";
  }
}

function dateOfWeek(listStudents, weekNow) {
  let listWeek = [];
  console.log(listStudents);
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
renderWeek = (listStudents) => {
  let database = dateOfWeek(listStudents, getWeekNow(new Date()));

  let content = database[1].attendance.map((date) => {
    let d = new Date(date.day);
    return `
      <th> ${getTypeDay(d.getDay())} , ${d.getDate()} </th>
      `;
  });

  viewDayInWeek.innerHTML = content.join(" ");

  let table = database.map((student, index) => {
    let atd = student.attendance.map((date) => {
      return `
      <td>
      <div class=${
        date.data.status ? "comat" : date.data.asked ? "vang" : "vangkhongphep"
      }><a class="noted" href="">n</a></div>
  </td>
      `;
    });
    return `
    <tr>
    <td>${index + 1}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    ${atd.join(" ")}
</tr>
    `;
  });
  tableWeek.innerHTML = table.join(" ");
};
// const = document.querySelector("#dataTable");

function exportTableToExcel(tableID, filename = "") {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById("dataTable");
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

  // Specify file name
  filename = filename ? filename + ".xlsx" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  // document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;
    console.log(filename);
    //triggering the function
    downloadLink.click();
  }
}
var excelIO = new GC.Spread.Excel.IO();
function exportExcel() {
  var workbook = new GC.Spread.Sheets.Workbook(
    document.getElementById("dataTable")
  );
  let json = workbook.toJSON();
  console.log(json);
  // excelIO.save(
  //   json,
  //   function (blob) {
  //     saveAs(blob, "test");
  //   },
  //   function (e) {
  //     if (e.errorCode === 1) {
  //       alert(e.errorMessage);
  //     }
  //   }
  // );
}
// exportExcel();
console.log(nextWeek);
nextWeek.addEventListener("click", function (e) {
  weekNow.innerText = WeekNow() + 1;
  renderWeek(listStudents, getWeekNow(new Date()) + 1);
});
