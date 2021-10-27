let demo = {
  morning: [],
  afternoon: [],

  status: true,
  asked: '',
  note: '',
};

// add Student database
// for (let i = 1; i <= 20; i++) {
// for (let i = 1; i <= 5; i++) {
//   let student = {
//     firstName: "Nguyen Van ",
//     lastName: "Anh",
//     name: "Nguyen Van Anh",
//     address: "Quang Tri",
//     dateOfBirth: "2004-05-19",
//     gender: "male",
//     id: "20211" + i,
//     phone: "0848492852",
//     class: "10A1",
//   };
//   db.collection("Students")
//     .add(student)
//     .then(() => {
//       console.log("add success");
//     });
// }
db.collection(`Students`).onSnapshot((snapshot) => {
  const date = new Date();
  const month = 5;
  const year = date.getFullYear();
  const maxDay = new Date(year, month, 0).getDate();

  snapshot.forEach((doc) => {
    for (let i = 3; i <= maxDay; i++) {
      let date = new Date(`${month}-${i}-${year}`);
      if (i < 10) {
        db.collection('Students')
          .doc(doc.id)
          .collection('attendance')
          .doc(`0${month}-0${i}-${year}`)
          .set({
            ...demo,
            week: getWeekNow(date),
            status: true,
            asked: true,
            note: '',
          })
          .then(() => {
            console.log('success');
          });
      } else {
        db.collection('Students')
          .doc(doc.id)
          .collection('attendance')
          .doc(`0${month}-${i}-${year}`)
          .set({
            ...demo,
            week: getWeekNow(date),
            status: true,
            asked: true,
            note: '',
          })
          .then(() => {
            console.log('success');
          });
      }
    }
  });
});
