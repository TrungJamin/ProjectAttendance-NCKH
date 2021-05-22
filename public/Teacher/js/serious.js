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
let demo = {
  morning: [
    { status: false, note: "", asked: false },
    { status: false, note: "", asked: false },
    { status: false, note: "", asked: false },
    { status: false, note: "", asked: false },
    { status: false, note: "", asked: false },
  ],
  afternoon: [
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
    { status: true, note: "", asked: true },
  ],
  // status: true,
  // asked: "",
  // note: "",
};

// add Student database
// for (let i = 1; i <= 15; i++) {
//   let student = {
//     firstName: "Nguyen Van ",
//     lastName: "Anh",
//     name: "Nguyen Van Anh",
//     address: "Quang Tri",
//     dateOfBirth: "2004-05-19",
//     gender: "male",
//     id:  "20211"+i,
//     phone: "0848492852",
//     class: "10A1",
//   };
//   db.collection("Students2")
//     .add(student)
//     .then(() => {
//       console.log("add success");
//     });
// }
// db.collection(`Students2`).onSnapshot((snapshot) => {
//   snapshot.forEach((doc) => {
//     for (let i = 1; i <= 30; i++) {
//       let date = new Date(`6-${i}-2021`);
//       if(i<10){
//         db.collection("Students2")
//         .doc(doc.id)
//         .collection("attendance")
//         .doc(`6-0${i}-2021`)
//         .set({
//           ...demo,
//           week: getWeekNow(date),
//           status: false,
//           asked: true,
//           note: "không lí do",
          
//         })
//         .then(() => {
//           console.log("success");
//         });
//       }else{
//         db.collection("Students2")
//         .doc(doc.id)
//         .collection("attendance")
//         .doc(`6-${i}-2021`)
//         .set({
         
//           ...demo, 
//           week: getWeekNow(date),
//           status: true,
//           asked: true,
//           note: "",
//         })
//         .then(() => {
//           console.log("success");
//         });
//       }
      
//     }
//   });
// });
