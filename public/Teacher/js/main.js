const listStudents = [];

let demo = {
  morning: [
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
  ],
  afternoon: [
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
  ],
  status: true,
  asked: "",
  note: "",
};

let classL ;
let emailTeacher ;




db
    .collection("Teachers")
    .get()
    .then( (querySnapshot) => {
        let obj = querySnapshot.docs.find( (doc)=> {
          return doc.data().address == "taccin03@gmail.com"
        });
        classL = obj.data().classLeader;
        
    })
    

const loadingData = document.querySelector(".loading-table");
db.collection("Students").onSnapshot(async (snapshots) => {
  getData(
    new Promise(async (resolve, reject) => {
      setTimeout(
        await snapshots.forEach((snapshot) => {
          let student = snapshot.data();
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
              // console.log("chay-push");
              if(student.class == classL){
                listStudents.push({ ...student, attendance: attendance });
              }
              
            });
        }, 500)
      );
      return resolve(listStudents);
    })
  ).then((result) => {
    setTimeout(() => {
      renderDatabase(result);
    }, 5000);
  });
});
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
// renderDatabase(listStudents);
const exportExcel = document.getElementById("export-excel");
exportExcel.addEventListener("change", () => {
  if (exportExcel.value != "Export Excel") {
    doit(exportExcel.value, exportExcel.value);
    exportExcel.value = "Export Excel";
  }
});
