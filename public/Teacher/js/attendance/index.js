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
  DOM_Classes.innerHTML = classes
    .map(
      (
        teach
      ) => `   <button class="btn btn-success classes-teach" type="button">
  <i class="fas fa-chalkboard-teacher"></i>
  ${teach.class}  ${teach.subject}
</button>`
    )
    .join(" ");
};
firebase.auth().onAuthStateChanged((user) => {
  ListClassTeaches = [];
  if (user.uid) {
    db.collection("Teachers")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        ListClassTeaches = [...doc.data().subjectsAndClass];
        renderListClassTeach(ListClassTeaches);
      })
      .catch(function (error) {});
  }
});
