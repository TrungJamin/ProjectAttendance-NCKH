// Đầu tiên get dữ liệu các lớp dạy qua userID
// Rồi từ lớp dạy hiển thị danh sách học sinh
// Tham Khảo code RenderStudents của aDay.js rồi render ra theo ngày
// Nhìn cách hoạt động của moblie rồi bắt đầu code

firebase.auth().onAuthStateChanged((user) => {
  if (user.uid) {
    db.collection("Teachers")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        console.log(doc.data());
      })
      .catch(function (error) {});
  }
});
