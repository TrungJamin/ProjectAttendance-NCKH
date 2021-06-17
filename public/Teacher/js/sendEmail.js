const formSendMail = document.querySelector("#form-send-mail");
const btnSendMail = document.querySelector("#openSendEmail");
const sendMailFromTeacher = firebase
  .functions()
  .httpsCallable("sendMailFromTeacher");
var myClass = "9A";
var listStudents = [];
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("TeacherAdmin").onSnapshot(async function (snapshots) {
      snapshots.forEach((teacher) => {
        if (teacher.data().email == user.email) {
          getStudents(teacher.data().class);
          myClass = teacher.data().class;
          return;
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
    });
  });
}
const loadingSendEmail = document.querySelector(".loading-send-mail");
btnSendMail.addEventListener("click", (e) => {
  document
    .querySelector(".form-send-email-all-student")
    .classList.remove("d-none");
});
turnOffFormEmail = () => {
  document
    .querySelector(".form-send-email-all-student")
    .classList.add("d-none");
};
formSendMail.addEventListener("submit", async function (event) {
  event.preventDefault();
  turnOffFormEmail();
  const title = formSendMail["title-send-email"].value;
  const content = formSendMail["content-send-mail"].value;
  const profile = profileTeacher;
  loadingSendEmail.classList.remove("d-none");
  const results = await listStudents.map(async (student) => {
    return await sendMailFromTeacher({
      mailTeacher: profile.email,
      mailStudent: student.mail,
      name: profile.name + "  Tiêu Đề:" + title,
      content: content,
    }).then((response) => {
      document.querySelector(".send-to").innerText =
        "Đang Gửi Mail Cho " + student.name;
    });
  });
  Promise.all(results).then((results) => {
    loadingSendEmail.classList.add("d-none");
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Đã Gửi Thành Công ${listStudents.length} Học Sinh`,
      showConfirmButton: true,
    });
  });
});
