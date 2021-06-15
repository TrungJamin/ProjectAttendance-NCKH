const newListStudent = [];

var input = document.getElementById("inputStudents");
function getGradeByClass(Class) {
  return Class.trim().substring(0, 1);
}

input.addEventListener("change", function () {
  document.querySelector(".loading-table").classList.remove("d-none");
  document.querySelector("#dataTable").classList.add("d-none");
  readXlsxFile(input.files[0]).then(function (rows) {
    let newStudent = {};
    rows[0].forEach(function (field) {
      try {
        switch (field.trim().toLowerCase()) {
          case "Họ Tên Đệm".toLowerCase():
            newStudent["firstName"] = "";
            break;
          case "Tên".toLowerCase():
            newStudent["lastName"] = "";
            break;
          case "Ngày Sinh".toLowerCase():
            newStudent["dateOfBirth"] = "";
            break;
          case "Giới Tính".toLowerCase():
            newStudent["gender"] = "";
            break;
          case "Địa Chỉ".toLowerCase():
            newStudent["address"] = "";
            break;
          case "Lớp".toLowerCase():
            newStudent["class"] = "";
            break;
          case "số điện thoại".toLowerCase():
            newStudent["phone"] = "";
            break;
          default:
            newStudent["error"] = 1;
        }
      } catch (e) {
        console.log(e.message);
      }
    });

    if (newStudent["error"]) {
      swal(
        "Vui Lòng Kiểm Tra Tệp Excel! Hoặc chọn tệp khác",
        "Đúng Chuẩn là các trường : Họ Tên Đệm,Tên,Ngày Sinh,Giới Tính,Lớp,Địa Chỉ,số điện thoại",
        "warning"
      );
      document.querySelector(".loading-table").classList.add("d-none");
      document.querySelector("#dataTable").classList.remove("d-none");
    } else {
      for (var i = 1; i < rows.length; i++) {
        const newStudent = {};
        newStudent.firstName = rows[i][0].split(" ");
        newStudent.lastName = rows[i][1].split(" ");
        let date = new Date(rows[i][2]);
        newStudent.dateOfBirth = moment(date).format("DD/MM/YYYY");
        newStudent.gender = rows[i][3];
        newStudent.class = rows[i][4];
        newStudent.address = rows[i][5];
        newStudent.phone = rows[i][6];
        newStudent.name = newStudent.firstName + " " + newStudent.lastName;
        const grade = getGradeByClass(newStudent.class);
        const year =
          grade === "6"
            ? 2021
            : grade === "7"
            ? 2020
            : grade === "8"
            ? 2019
            : 2018;
        const total = ++getGradeLevel(newStudent.class).total;
        const gender = newStudent.gender === "Nam" ? "1" : "0";
        const id = year + gender + newStudent.class + total;
        newStudent.id = id;
        db.collection("Students")
          .doc(id)
          .set(newStudent)
          .then(async function (querySnapshot) {
            for (let i = 5; i <= 7; i++) {
              await createAttendance(id, i);
            }
            setGradeLevel(newStudent.class).then(() => {
              document.querySelector(".loading-table").classList.add("d-none");
              document.querySelector("#dataTable").classList.remove("d-none");
            });
          })
          .catch(function (error) {});
      }
    }
  });
});
