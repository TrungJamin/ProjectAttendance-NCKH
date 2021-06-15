// import for teacher

var inititalTeacher = {
  classLeader: "",
  dataOfBirth: "",
  email: "",
  gender: "",
  group: "",
  id: "",
  name: "",
  subjectsAndClass: [],
};

function createId(year) {
  let tamp = year + "NA";
  for (let i = 0; i < 5; i++) {
    tamp += "" + Math.floor(Math.random() * 10);
  }
  return tamp;
}

async function addATeacher(obj) {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(obj.email, "123456")
    .then(async function (response) {
      // tạo 1 giáo viên
      return await db
        .collection("Teachers")
        .doc(response.user.uid)
        .set(obj)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          return error;
        });

      //
    })
    .catch(function (error) {
      console.log(error);
      return { ...error, email: obj.email };
    });
}

var listTeacher = [];
var input = document.getElementById("inputTeacher");
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(async function (e) {
    // `rows` is an array of rows
    // each row being an array of cells.

    for (var i = 1; i < e.length; i++) {
      let tampTeacher = {};

      for (let j = 0; j < e[0].length; j++) {
        if (e[0][j] == "gender") {
          try {
            let check = e[i][j].toLowerCase() == "nam" ? "true" : "false";
            tampTeacher[e[0][j]] = check;
          } catch (error) {
            tampTeacher[e[0][j]] = "true";
          }
        } else {
          if (e[0][j] == "dataOfBirth") {
            var date = new Date(e[i][j]);
            if (date == "Invalid Date") {
            } else {
              var date1 = moment(date).format("YYYY-MM-DD");
              tampTeacher[e[0][j]] = date1;

              tampTeacher.id = createId(
                new Date().getFullYear() + "0" + date.getMonth()
              );
            }
          } else {
            if (e[0][j] == "classLeader") {
              try {
                let check = e[i][j].toLowerCase();
                tampTeacher[e[0][j]] = check;
              } catch (error) {
                tampTeacher[e[0][j]] = "";
              }
            } else {
              try {
                tampTeacher[e[0][j]] = e[i][j];
              } catch (error) {
                tampTeacher[e[0][j]] = "";
              }
            }
          }
        }
      }

      if (tampTeacher.id) {
      } else {
        tampTeacher.id = createId("2020006");
      }
      listTeacher.push({ ...inititalTeacher, ...tampTeacher });
    }

    console.log(listTeacher);

    const result = await listTeacher.map(async (e) => {
      return await addATeacher(e);
    });

    Swal.fire({
      title: "Đang tải dữ liệu từ file lên",
      html: "Vui lòng chờ....",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();

        Promise.all(result).then((e) => {
          // xu ly dem so luong loi

          var arrArr = [];
          var addSuccess = 0;

          e.forEach((e) => {
            if (e) {
              // có lỗi
              arrArr.push(e.email);
            } else {
              addSuccess++;
              // add thành công
            }
          });

          Swal.close();
          Swal.fire({
            position: "top",
            icon: "success",
            title: `File có ${
              listTeacher.length
            } học sinh đã thêm thành công ${addSuccess}
            và có ${arrArr.length} giảng viên bị lỗi do mail bị trùng
            danh sánh email: ${arrArr.join(" <br> ")}`,
            showConfirmButton: true,
          });
        });
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  });
});
