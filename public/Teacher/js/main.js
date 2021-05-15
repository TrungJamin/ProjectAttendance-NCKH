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

const loadingData = document.querySelector(".loading-table");
db.collection("Students").onSnapshot((snapshots) => {
  snapshots.forEach((snapshot) => {
    let student = snapshot.data();
    db.collection(`Students`)
      .doc(snapshot.id)
      .collection("attendance")
      .onSnapshot(async (snapshots) => {
        let attendance = await [];
        await snapshots.forEach(async (doc) => {
          await attendance.push({
            day: doc.id,
            data: doc.data(),
          });
        });
        await listStudents.push({ ...student, attendance: attendance });
      });
  });
  setTimeout(() => {
    // renderADay(listStudents);
    renderWeek(listStudents);
    // renderAMonth(listStudents);
    document.querySelector(".database").classList.remove("d-none");
    loadingData.classList.add("d-none");
  }, 2000);
});
