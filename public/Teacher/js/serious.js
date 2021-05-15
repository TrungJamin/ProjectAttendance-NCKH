// db.collection(`Students`).onSnapshot((snapshot) => {
//   snapshot.forEach((doc) => {
//     for (let i = 3; i <= 31; i++) {
//       let date = new Date(`5-${i}-2021`);
//       db.collection("Students")
//         .doc(doc.id)
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
//     }
//   });
// });
// add Student database
// for (let i = 3; i <= 31; i++) {
//   let student = {
//     firstName: "Nguyen Van ",
//     lastName: "Anh",
//     name: "Nguyen Van Anh",
//     address: "Quang Tri",
//     dateOfBirth: "2004-05-19",
//     gender: "male",
//     id: i + "2001",
//     phone: "0848492852",
//     class: "10A1",
//   };
//   db.collection("Students")
//     .add(student)
//     .then(() => {
//       console.log("add success");
//     });
// }
// db.collection(`Students`).onSnapshot((snapshot) => {
//   snapshot.forEach((doc) => {
//     for (let i = 3; i <= 31; i++) {
//       let date = new Date(`5-${i}-2021`);
//       db.collection("Students")
//         .doc(doc.id)
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
//     }
//   });
// });
