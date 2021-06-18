const formSendMail = document.querySelector("#form-send-mail");
const btnSendMail = document.querySelector("#openSendEmail");
var listFiles = [];
const btnFile = document.querySelector("#file-send-mail");
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

  console.log(document.querySelector("#opacityAdd").classList)
  document.querySelector("#opacityAdd").classList.add("opacityAdd");

  document.querySelector('#openSendEmail').classList.add('active');
        document.querySelector('#changerPw').classList.remove('active');
  document
    .querySelector(".form-send-email-all-student")
    .classList.remove("d-none");

  turnOffScreenUpdatePassWord();
});
turnOffFormEmail = () => {
  document.querySelector("#opacityAdd").classList.remove("opacityAdd");
  document.querySelector('#openSendEmail').classList.remove('active');
  document.querySelector('#changerPw').classList.remove('active');
  renderListFiles.innerHTML = "";
  document
    .querySelector(".form-send-email-all-student")
    .classList.add("d-none");
};

const renderListFiles = document.querySelector("#list-file");
btnFile.addEventListener("change", () => {
  listFiles.push(btnFile.files[0]);
  renderListFiles.innerHTML = "";
  listFiles.forEach((file, index) => {
    const tr = document.createElement("tr");
    const filename = document.createElement("td");
    filename.innerText = file.name;
    const i_trash = document.createElement("i");
    i_trash.setAttribute("class", "ml-5 fas fa-trash");
    i_trash.setAttribute("style", "color: Tomato;");
    i_trash.addEventListener("click", function (e) {
      listFiles = listFiles.filter((item, i) => i !== index);
      tr.removeChild(filename);
    });
    filename.append(i_trash);
    tr.append(filename);
    renderListFiles.append(tr);
  });
});
formSendMail.addEventListener("submit", async function (event) {
  event.preventDefault();
  turnOffFormEmail();
  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  loadingSendEmail.classList.remove("d-none");
  document.querySelector(".send-to").innerText = "Đang Thiết Lập Gửi email ";
  const title = formSendMail["title-send-email"].value;
  const content = formSendMail["content-send-mail"].value;
  const profile = profileTeacher;
  const convertBase64 = await listFiles.map(async (file) => {
    return {
      filename: file.name,
      path: await toBase64(file),
    };
  });
  const results = await listStudents.map(async (student) => {
    return Promise.all(convertBase64).then(async function (files) {
      console.log(files);
      return await sendMailFromTeacher({
        mailTeacher: profile.email,
        mailStudent: student.email,
        name: profile.name,
        title: title,
        content: content,
        files: files,
      })
        .then(() => {
          document.querySelector(".send-to").innerText =
            "Đang Gửi Mail Cho " + student.name;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
  Promise.all(results).then((results) => {
    document.querySelector("#opacityAdd").classList.remove("opacityAdd");
    loadingSendEmail.classList.add("d-none");
    formSendMail.reset();
    listFiles = [];
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Đã Gửi Thành Công ${listStudents.length} Học Sinh`,
      showConfirmButton: true,
    });
  });
});
