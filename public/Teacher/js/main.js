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
  asked:"",
  count:0,
  note:""
};

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
    renderADay(listStudents);
    renderWeek(listStudents);
  }, 2000);
});

// render
// for (let i = 3; i <= 31; i++) {
//   db.collection("Students").onSnapshot((snapshots) => {
//     snapshots.forEach((snapshot) => {
//       let student = snapshot.data();
//       let date = new Date(`5-${i}-2021`);
//       db.collection(`Students`)
//         .doc(snapshot.id)
//         .collection("attendance")
//         .doc(`5-${i}-2021`)
//         .set({
//           ...demo,
//           week: getWeekNow(date),
//           status: true,
//           asked: false,
//           note: "",
//         })
//         .then(() => {
//           console.log("success");
//         });
//     });
//   });
// }
