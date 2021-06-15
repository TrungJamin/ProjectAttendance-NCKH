let listStudents = [];

const loadingData = document.querySelector(".loading-table");
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("TeacherAdmin").onSnapshot(async function (snapshots) {
      snapshots.forEach((teacher) => {
        if (teacher.data().email == user.email) {
          getStudents(teacher.data().class);
        }
      });
    });
  } else {
    // User is signed out.
  }
});
let state = 0;
function getStudents(className) {
  db.collection("Students").onSnapshot(async (snapshots) => {
    listStudents = [];
    await snapshots.forEach((snapshot) => {
      let student = snapshot.data();
      if (student.class == className) {
        db.collection(`Students`)
          .doc(snapshot.id)
          .collection("attendance")
          .onSnapshot((snapshots) => {
            let attendance = [];
            snapshots.forEach((doc) => {
              attendance.push({
                day: doc.id,
                data: doc.data(),
              });
            });
            listStudents.push({ ...student, attendance: attendance });
          });
      }
      setTimeout(() => {
        renderDatabase(listStudents);
        state++;
      }, 2000);
    });
  });
}
async function getData(Promise) {
  return Promise;
}

async function renderDatabase(listStudents) {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  renderDay(listStudents, day, month, year);
  // renderWeek(listStudents);
  // renderMonth(listStudents);
  // renderSemester(listStudents);
  let dataBase = document.querySelectorAll(".database");
  dataBase.forEach((data) => {
    data.classList.remove("d-none");
  });
  loadingData.classList.add("d-none");
  return true;
}

const exportExcel = document.getElementById("export-excel");
exportExcel.addEventListener("change", () => {
  if (exportExcel.value != "Export Excel") {
    doit(exportExcel.value);
  }
});
