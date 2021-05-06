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
    // let date = new Date("5-29-2021");
    db.collection(`Students`)
      .doc(snapshot.id)
      .collection("attendance")
      .onSnapshot((snapshots) => {
        snapshots.forEach((doc) => {
          listStudents.push({
            ...student,
            attendance: doc.data(),
          });
        });
      });
  });
  setTimeout(() => {
    console.log(listStudents);
    // renderADay(listStudents);
    // renderWeek(listStudents);
  }, 1000);
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
//         })
//         .then(() => {
//           console.log("success");
//         });
//     });
//   });
// }
