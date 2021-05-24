const listStudents = [];

// let demo = {
//   morning: [
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//   ],
//   afternoon: [
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//     { status: true, note: "", asked: true },
//   ],
//   status: true,
//   asked: "",
//   note: "",
// };

const loadingData = document.querySelector(".loading-table");
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("TeacherAdmin").onSnapshot(async function (snapshots) {
      snapshots.forEach((teacher) => {
        if (teacher.data().email == user.email)
          getStudents(teacher.data().class);
      });
    });
  } else {
    // User is signed out.
  }
});
function getStudents(className) {
  db.collection("Students2").onSnapshot(async (snapshots) => {
    getData(
      new Promise(async (resolve, reject) => {
        setTimeout(
          await snapshots.forEach((snapshot) => {
            let student = snapshot.data();
            if (student.class == className) {
              db.collection(`Students2`)
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
          }, 500)
        );
        return resolve(listStudents);
      })
    ).then((result) => {
      setTimeout(() => {
        renderDatabase(result);
      }, 2000);
    });
  });
}

async function getData(Promise) {
  return Promise;
}

async function renderDatabase(listStudents) {
  renderDay(listStudents);
  renderWeek(listStudents);
  renderMonth(listStudents);
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
