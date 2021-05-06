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
  
};


db.collection("Students").onSnapshot((snapshots) => {
  snapshots.forEach((snapshot) => {
    let student = snapshot.data();

    db.collection(`Students`)
      .doc(snapshot.id)
      .collection("attendance")
      .doc(getDateNow())
      .onSnapshot((doc) => {
        setTimeout(() => {
          listStudents.push({
            ...student,
            attendanceDate: doc.data(),
          });
        });
      });
  });
  setTimeout(() => renderADay(listStudents), 1000);
});

