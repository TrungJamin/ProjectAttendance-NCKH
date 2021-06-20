// Đầu tiên get dữ liệu các lớp dạy qua userID
// Rồi từ lớp dạy hiển thị danh sách học sinh
// Tham Khảo code RenderStudents của aDay.js rồi render ra theo ngày
// Nhìn cách hoạt động của moblie rồi bắt đầu code

var ListClassTeaches = [];

function getClassByClass(uid) {
  db.collection("Students")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {});
    })
    .catch(function (error) {});
}

const DOM_Classes = document.querySelector(".classes");
const renderListClassTeach = (classes) => {
  DOM_Classes.innerHTML = "";
  classes.forEach((teach) => {
    const buttonChooseClass = document.createElement("button");
    buttonChooseClass.type = "button";
    buttonChooseClass.setAttribute("class", "btn btn-success classes-teach");
    const iTag = document.createElement("i");
    iTag.setAttribute("class", "fas fa-chalkboard-teacher");
    iTag.innerText = teach.class + " " + teach.subject;
    buttonChooseClass.addEventListener("click", (e) => {
      getStudents(teach.class);
      DOM_Classes.classList.add("d-none");
      document.getElementById("content").classList.remove("d-none");
    });
    buttonChooseClass.append(iTag);
    DOM_Classes.append(buttonChooseClass);
  });
};
firebase.auth().onAuthStateChanged((user) => {
  ListClassTeaches = [];
  if (user.uid) {
    db.collection("Teachers")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        console.log("run-1");
        ListClassTeaches = [...doc.data().subjectsAndClass];
        renderListClassTeach(ListClassTeaches);
      })
      .catch(function (error) {});
  }
});
