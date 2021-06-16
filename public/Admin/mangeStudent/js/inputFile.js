const newListStudent = [];

const inputFileExcel = document.getElementById("inputStudents");
const labelInputFile = document.getElementById("label-input-file");
function getGradeByClass(Class) {
  return Class.trim().substring(0, 1);
}

inputFileExcel.addEventListener("change", function () {
  document.querySelector(".loading-table").classList.remove("d-none");
  document.querySelector("#dataTable").classList.add("d-none");
  labelInputFile.innerHTML = "Loading file...";
  readXlsxFile(inputFileExcel.files[0]).then(function (rows) {
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
      const list = [];
      let count = 0;
      for (var i = 1; i < rows.length; i++) {
        try {
          const newStudent = {};
          newStudent.firstName = rows[i][0].split(" ");
          newStudent.lastName = rows[i][1].split(" ");
          let date = new Date(rows[i][2]);
          newStudent.dateOfBirth = moment(date).format("DD/MM/YYYY");
          newStudent.gender = rows[i][3];
          newStudent.class = rows[i][4];
          newStudent.address = rows[i][5];
          newStudent.phone = rows[i][6].toString();
          newStudent.name =
            newStudent.firstName.join(" ") + " " + newStudent.lastName.join("");
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
          list.push(newStudent);
          db.collection("Students")
            .doc(id)
            .set(newStudent)
            .then(async function (querySnapshot) {
              for (let i = 5; i <= 7; i++) {
                await createAttendance(id, i);
              }
              setGradeLevel(newStudent.class).then(() => {
                document
                  .querySelector(".loading-table")
                  .classList.add("d-none");
                swal(
                  "Thêm Dữ Liệu Từ File Thành Công",
                  "Với Tổng Số Lượng " +
                    list.length +
                    "/" +
                    (rows.length - 1) +
                    " học sinh",
                  "success"
                );
                document.querySelector("#dataTable").classList.remove("d-none");
                labelInputFile.innerHTML = "Thêm Dữ Liệu Từ File";
              });
            })
            .then(() => {})
            .catch(function (error) {});
        } catch (error) {
          count++;
          swal(
            "Vui Lòng Kiểm Tra File Excel",
            `Có ${count} Học Sinh sai dữ liệu ví dự như 9D không có trong danh sách trường , hãy kiểm tra kĩ`,
            "warning"
          );
        }
      }
    }
  });
});
