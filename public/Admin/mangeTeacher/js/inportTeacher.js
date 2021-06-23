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

var checkTypeEn = [
  "classLeader",
  "dataOfBirth",
  "email",
  "gender",
  "group",
  "name",
  "classAndSubject",
  "phone",
  "address",
];
var checkTypeVn = [
  "họ và tên",
  "giới tính",
  "nhóm",
  "lớp chủ nhiệm",
  "lớp và môn dạy",
  "ngày sinh",
  "email",
  "số điện thoại",
  "địa chỉ",
];

function createId(year) {
  let tamp = year + "NA";
  for (let i = 0; i < 5; i++) {
    tamp += "" + Math.floor(Math.random() * 10);
  }
  return tamp;
}

var input = document.getElementById("inputTeacher");
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(async function (e) {
    // `rows` is an array of rows
    // each row being an array of cells.
    var listTeacher = [];

    // đoạn này bắt lỗi
    console.log(e[0]);
    var err = false;

    try {
      e[0].forEach((elem) => {
        console.log(checkTypeVn.find((check) => check == elem));
        if (checkTypeVn.find((check) => check == elem) == undefined) {
          err = true;
        }
      });
    } catch (error) {
      err = true;
    }

    if (err) {
      // co lỗi
      Swal.fire({
        position: "top",
        title: "File của bạn chưa đúng định dạng mới nhập file khác !",
        showConfirmButton: true,
      });
    } else {
      // ko lỗi
      for (var i = 1; i < e.length; i++) {
        let tampTeacher = {};

        for (let j = 0; j < e[0].length; j++) {
          switch (e[0][j]) {
            case "giới tính":
              {
                try {
                  let check = e[i][j].toLowerCase() == "nam" ? "true" : "false";
                  tampTeacher.gender = check;
                } catch (error) {
                  tampTeacher.gender = "true";
                }
              }
              break;
            case "ngày sinh":
              {
                var date = new Date(e[i][j]);
                if (date == "Invalid Date") {
                } else {
                  var date1 = moment(date).format("YYYY-MM-DD");
                  tampTeacher.dataOfBirth = date1;

                  tampTeacher.id = createId(
                    new Date().getFullYear() + "0" + date.getMonth()
                  );
                }
              }
              break;
            case "lớp chủ nhiệm":
              {
                tampTeacher.classLeader = e[i][j];
              }
              break;

            case "lớp và môn dạy":
              {
                var res = e[i][j].replace(" ", "").split(";");
                var subjectsAndClass = [];
                res.forEach((e) => {
                  const el = e.split(":");
                  console.log(el[0], el[1].split(","));
                  el[1].split(",").forEach((e) => {
                    subjectsAndClass.push({ class: el[0], subject: e });
                  });
                });

                tampTeacher.subjectsAndClass = subjectsAndClass;
              }
              break;
            case "họ và tên":
              {
                tampTeacher.name = e[i][j];
              }
              break;
            case "địa chỉ":
              {
                tampTeacher.address = e[i][j];
              }
              break;
            case "số điện thoại":
              {
                tampTeacher.phone = e[i][j];
              }
              break;
            case "nhóm":
              {
                let check = e[i][j] == "tự nhiên" ? "nation" : "sociocultural";
                tampTeacher.group = check;
              }
              break;
            case "email":
              {
                let check = e[i][j];
                tampTeacher.email = check;
              }
              break;

            default:
              break;
          }
        }

        if (tampTeacher.id) {
        } else {
          tampTeacher.id = createId("2020006");
        }
        listTeacher.push({ ...inititalTeacher, ...tampTeacher });
      }

      console.log(listTeacher);

      const result = await listTeacher.map(async (obj) => {
        return await 
        createAccount({email: obj.email,
          password: "12456",})
          .then(async function (response) {
            // tạo 1 giáo viên
            if(response.data){
              return response.data.uid;
            }
            else{
              return {error:'err', email: obj.email };
            }
            //
          })
      });

      ShowNotification();
     
       await Promise.all(result).then(async (id) => {
        console.log( id)
        // var addSuccess = 0;
        // var arrArr = [];
        // const addTeacher = await id.map((id, index) => {
        //   if (typeof id == "string") {
        //     // add teacher
        //     addSuccess++;
        //     setTimeout(() => {
        //       db.collection("Teachers")
        //         .doc(id)
        //         .set(listTeacher[index])
        //         .then(function (response) {
        //           console.log(response, " add oke ", listTeacher[index]);
        //         })
        //         .catch(function (error) {
        //           return error;
        //         });
        //     }, 200);
        //   } else {
        //     // bị lỗi ko làm gì
        //     arrArr.push(id.email);
        //   }
        // });

      //    await Promise.all(addTeacher).then((teacher) => {
      //   Swal.close();
      //   Swal.fire({
      //     position: "top",
      //     icon: "success",
      //     title: `File có ${
      //       listTeacher.length
      //     }giáo viên đã thêm thành công ${addSuccess}
      //     và có ${
      //       listTeacher.length - addSuccess
      //     } giảng viên bị lỗi do mail bị trùng
      //     danh sánh email: ${arrArr.join(" <br> ")}`,
      //     showConfirmButton: true,
      //   });
      //  });

      });

     

      
    }
  });
});

function ShowNotification() {
  Swal.fire({
    title: "Đang tải dữ liệu từ file lên",
    html: "Vui lòng chờ....",
    timerProgressBar: true,
    position: "top",
    didOpen: () => {
      Swal.showLoading();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}
