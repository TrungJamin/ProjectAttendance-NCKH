var type = true; // xac dinh kieu  (true )add or  (false)edit
var teacherEdit = {};
const typeAdd = "Thêm giáo viên";
const typeEdit = "Chỉnh sửa giáo viên";
var oldEmail = "";
var btnAddTeacher = document.querySelector("#addTeacher");
var spinnerAddTeacher = document.querySelector("#loadingAddTeacher");
const updateEmailAuth = firebase.functions().httpsCallable("updateEmailAuth");
const deleteUserByUID = firebase.functions().httpsCallable("deleteUserByUID");
const createAccount = firebase.functions().httpsCallable("createAccount");
btnAddTeacher.addEventListener("click", () => {
  openFormInput("cover-caption", "");
});

const isAccountExist = (email) => {
  let isAdmin = false;
  return db
    .collection("TeacherAdmin")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((teacher) => {
        if (teacher.data().email === email) {
          isAdmin = {
            isAdmin: true,
            id: teacher.id,
          };
          return;
        }
      });
      return isAdmin;
    })
    .catch(function (error) {
      return false;
    });
};

const setClassTeacherAdmin = (newLeader) => {
  const { classLeader, id, email } = newLeader;
  return db
    .collection("TeacherAdmin")
    .doc(id)
    .set({
      email: email,
      class: classLeader,
    })
    .then((res) => {
      // console.log("success");
    });
};

// render selectionClassLeader lop hoc
function getListClass() {
  db.collection("Classes")
    .get()
    .then(function (querySnapshot) {
      var arr = [];
      querySnapshot.forEach(function (doc) {
        var tamp = doc.data().classes;
        var gan = [];
        tamp.forEach((e) => {
          gan.push(e);
        });
        arr.push(gan);
      });

      // console.log("run -----")
      renderChooseClassLeader(arr);

      renderMuntilChoose(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListClass();

// new code
function renderMuntilChoose(listClass) {
  // console.log("run")
  // console.log(`listClass`, listClass)
  const renderMuntilchooseHtml = document.querySelector("#renderMuntilChoose");

  var node = "";

  listClass.forEach((e) => {
    e.forEach((element) => {
      node += `<div class="form-check">
        <label class="form-check-label">
            <input type="checkbox" class="form-check-input" value='${element}'>${element}
        </label>
        <div class="renderMuntilChooseSubjects">
        </div>
      </div>`;
    });
  });

  renderMuntilchooseHtml.innerHTML = node;
  renderMuntilChooseSubjects();
}

function renderMuntilChooseSubjects() {
  var sub = ["Toán", "văn", "S.Học", "lý", "H.Học", "L.Sử", "Đ.lý", "N.Ngữ"];

  var node = ` `;
  sub.forEach((e) => {
    node += `<label class="form-check-label ml-3">
          <input type="checkbox"  class="form-check-input  " value='${e}'> ${e}
      </label>`;
  });

  const renderMuntilChooseSubjectsHtml = document.querySelectorAll(
    ".renderMuntilChooseSubjects"
  );

  renderMuntilChooseSubjectsHtml.forEach((e) => {
    e.innerHTML = node;
  });
}

//renderChooseClassLeader
function renderChooseClassLeader(arr) {
  var selectionClassLeader = document.querySelector("#classLeader");
  var node = `<option value checked > chọn lớp chủ nhiệm</option> <option value=""> Không chủ nhiệm</option>`;
  arr.forEach((e) => {
    e.forEach((eClass) => {
      node += `<option value='${eClass}' > chủ nhiệm lớp ${eClass}</option>`;
    });
  });
  selectionClassLeader.innerHTML = node;
}

// edit teacher
function editTeacher(id, obj) {
  if (obj.subjectsAndClass.length === 0) {
    Swal.fire({
      position: "top",
      title: "mời nhập thêm danh sách môn dạy",
    });
    spinnerAddTeacher.classList.add("d-none");
  } else {
    // lam loading de cap nhat email nha
    if (oldEmail.trim() != obj.email.trim()) {
      updateEmailAuth({ oldEmail: oldEmail, NewEmail: obj.email }).then(
        (res) => {}
      );
    }

    let dateNow = new Date().getFullYear();
    let dateInput = new Date(obj.dataOfBirth).getFullYear();

    if (Number(dateNow) - Number(dateInput) < 18) {
      spinnerAddTeacher.classList.add("d-none");
      Swal.fire({
        position: "top",
        title: "mời nhập lại năm sinh vì không phù hợp",
      });
    } else {
      // kiểm tra class leader có bị trùng hay không
      db.collection("TeacherAdmin")
        .get()
        .then(function (querySnapshot) {
          let checkClass = false;

          let check = false;
          querySnapshot.forEach(function (doc) {
            if (doc.data().class == "") {
            } else {
              if (doc.data().class == obj.classLeader) {
                checkClass = true;
              }
            }

            if (
              doc.data().email == obj.email &&
              doc.data().class == obj.classLeader
            ) {
              check = true;
            }
          });

          if (check) {
            // chac chan là giáo viên đó vào lớp đó
            db.collection("Teachers")
              .doc(id)
              .set(obj)
              .then(function () {
                type = true;
                db.collection("TeacherAdmin")
                  .doc(id)
                  .set({ class: obj.classLeader, email: obj.email })
                  .then((res) => {
                    reNewForm();
                    closeFormInput("cover-caption");
                    Swal.fire({
                      position: "top",
                      icon: "success",
                      title: "Sửa thàng công",
                      showConfirmButton: false,
                      timer: 500,
                    });
                  });
              })
              .catch(function (error) {
                // console.error("Error writing document: ", error);
              });
          } else {
            if (checkClass == true) {
              // da trung class
              // chon laij class leader
              Swal.fire({
                title:
                  "Lớp chủ nhiệm này đã bị trùng , bạn có chắc là chủ nhiệm thứ hai của lớp ?",
                position: "top",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: " #3085d6",
                confirmButtonText: "Đúng",
                cancelButtonText: "Không",
              }).then((result) => {
                if (result.isConfirmed) {
                  db.collection("Teachers")
                    .doc(id)
                    .set(obj)
                    .then(function () {
                      type = true;
                      db.collection("TeacherAdmin")
                        .doc(id)
                        .set({ class: obj.classLeader, email: obj.email })
                        .then((res) => {
                          reNewForm();
                          closeFormInput("cover-caption");
                          Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Sửa thàng công",
                            showConfirmButton: false,
                            timer: 500,
                          });
                        });
                    })
                    .catch(function (error) {
                      // console.error("Error writing document: ", error);
                    });
                }
              });

              spinnerAddTeacher.classList.add("d-none");
            } else {
              // chinh sưa giao vien
              db.collection("Teachers")
                .doc(id)
                .set(obj)
                .then(function () {
                  type = true;
                  db.collection("TeacherAdmin")
                    .doc(id)
                    .set({ class: obj.classLeader, email: obj.email })
                    .then((res) => {
                      reNewForm();
                      closeFormInput("cover-caption");
                      Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Sửa thàng công",
                        showConfirmButton: false,
                        timer: 500,
                      });
                    });
                })
                .catch(function (error) {
                  // console.error("Error writing document: ", error);
                });
            }
          }
        })
        .catch(function (error) {});
    }
  }
}

//// deleteById
function deleteById(id, idTeacher, name) {
  Swal.fire({
    position: "top",
    title: "Bạn có chắc xóa ?",
    text: ` Giáo viên : ${name}  - id:${idTeacher} `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "hủy",
    confirmButtonText: "Xóa",
  }).then((result) => {
    if (result.isConfirmed) {
      //bo them hieu ung loading khi xoa luon nha
      deleteUserByUID({ uid: id });
      db.collection("Teachers")
        .doc(id)
        .delete()
        .then(async function () {
          await db.collection("TeacherAdmin").doc(id).delete();
          awai;
        })
        .catch(function (error) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "xóa thành công",
            showConfirmButton: false,
            timer: 500,
          });
        });
    }
  });
}

// tao them form input de get data nhap cho phan nay
function addTeacher(obj) {
  // kiểm tra xem email đã dd cấp account chưa

  spinnerAddTeacher.classList.remove("d-none");

  // so sanhs ngayf

  let dateNow = new Date().getFullYear();
  let dateInput = new Date(obj.dataOfBirth).getFullYear();
  if (Number(dateNow) - Number(dateInput) < 18) {
    spinnerAddTeacher.classList.add("d-none");
    Swal.fire({
      position: "top",
      title: "mời nhập lại năm sinh vì không phù hợp",
    });
  } else {
    if (obj.subjectsAndClass.length === 0) {
      Swal.fire({
        position: "top",
        title: "mời nhập thêm danh sách môn dạy",
      });
      spinnerAddTeacher.classList.add("d-none");
    } else {
      // kiểm tra class leader có bị trùng hay không

      db.collection("TeacherAdmin")
        .get()
        .then(function (querySnapshot) {
          let check = false;
          querySnapshot.forEach(function (doc) {
            if (doc.data().class == obj.classLeader) check = true;
          });

          if (obj.classLeader == "") {
            check = false;
          }

          if (check == true) {
            // da trung class

            // chon laij class leader
            Swal.fire({
              title:
                "Lớp chủ nhiệm này đã bị trùng , bạn có chắc là chủ nhiệm thứ hai của lớp ?",
              position: "top",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: " #3085d6",
              confirmButtonText: "Đúng",
              cancelButtonText: "Không",
            }).then((result) => {
              if (result.isConfirmed) {
                createAccount({
                  email: obj.email,
                  password: "123456",
                }).then((res) => {
                  if (res.data) {
                    db.collection("Teachers")
                      .doc(res.data.uid)
                      .set(obj)
                      .then(function (response) {
                        reNewForm();
                        closeFormInput("cover-caption");
                        spinnerAddTeacher.classList.add("d-none");
                        Swal.fire({
                          position: "top",
                          icon: "success",
                          title: "Thêm thàng công",
                          showConfirmButton: false,
                          timer: 500,
                        });
                      })
                      .catch(function (error) {});
                    if (obj.classLeader !== "") {
                      // make addmin
                      const classLeader = obj.classLeader;
                      const id = response.user.uid;
                      let email = obj.email;
                      setClassTeacherAdmin({ classLeader, id, email });
                    }
                  } else {
                    Swal.fire({
                      title: "mời nhập lại mail",
                      position: "top",

                      showCancelButton: true,
                    });
                    spinnerAddTeacher.classList.add("d-none");
                  }
                });
              }
            });
            spinnerAddTeacher.classList.add("d-none");
          } else {
            // thêm giáo viên
            createAccount({
              email: obj.email,
              password: "123456",
            }).then((res) => {
              if (res.data) {
                db.collection("Teachers")
                  .doc(res.data.uid)
                  .set(obj)
                  .then(function (response) {
                    reNewForm();
                    closeFormInput("cover-caption");
                    spinnerAddTeacher.classList.add("d-none");
                    Swal.fire({
                      position: "top",
                      icon: "success",
                      title: "Thêm thàng công",
                      showConfirmButton: false,
                      timer: 500,
                    });
                  })
                  .catch(function (error) {});
                if (obj.classLeader !== "") {
                  // make addmin
                  const classLeader = obj.classLeader;
                  const id = response.user.uid;
                  let email = obj.email;
                  setClassTeacherAdmin({ classLeader, id, email });
                }
              } else {
                Swal.fire({
                  title: "mời nhập lại mail",
                  position: "top",

                  showCancelButton: true,
                });
                spinnerAddTeacher.classList.add("d-none");
              }
            });
          }
        })
        .catch(function (error) {});
    }
  }
}

// get input  to add or edit
function getInfoTeacher() {
  function createId() {
    let tamp = "2003NA";
    for (let i = 0; i < 5; i++) {
      tamp += "" + Math.floor(Math.random() * 10);
    }
    return tamp;
  }

  var teacher = {};

  var myForm = document.querySelectorAll("#myForm .form-group");
  myForm.forEach((e) => {
    if (e.children[1] != undefined) {
      let name = e.children[1].name;
      teacher[name] = e.children[1].value;
    } else {
      let name = e.children[0].name;
      teacher[name] = e.children[0].value;
    }
  });

  const renderMuntilChoose = document.querySelector("#renderMuntilChoose");

  // console.log(renderMuntilChoose);

  const subjectsAndClass = [];

  let i = 0;
  while (renderMuntilChoose.children[i] != undefined) {
    if (
      renderMuntilChoose.children[i].children[0].children[0].checked == true
    ) {
      let j = 0;
      while (renderMuntilChoose.children[i].children[1].children[j]) {
        if (
          renderMuntilChoose.children[i].children[1].children[j].children[0]
            .checked == true
        ) {
          const tmp = {
            class: renderMuntilChoose.children[i].children[0].children[0].value,
            subject:
              renderMuntilChoose.children[i].children[1].children[j].children[0]
                .value,
          };

          subjectsAndClass.push(tmp);
        }

        j++;
      }
    }

    i++;
  }

  teacher.subjectsAndClass = subjectsAndClass;

  // console.log(type, "==================");
  if (type == true) {
    teacher.id = createId();
    // console.log(teacher,"--------------");

    delete teacher.undefined;
    teacher.name = converStringName(teacher.name);

    addTeacher(teacher);
  }

  if (type == false) {
    teacher.id = teacherEdit.id;
    if (teacherEdit.img) {
      teacher.img = teacherEdit.img;
    }
    delete teacher.undefined;
    editTeacher(teacherEdit.docId, teacher);
  }
}

function closeFormInput(idOfHtml) {
  // console.log("huy edit form ")
  document.querySelector("#typeFormTeacher").innerHTML = typeAdd;
  teacherEdit = {};
  document.getElementById("myForm").reset();
  reNewForm();
  document.getElementById(idOfHtml).classList.add("hide");
  document.querySelector("#allViewPage").style.opacity = "1";
}

function openFormInput(idOfHtml, teacher) {
  document.getElementById(idOfHtml).classList.remove("hide");
  document.querySelector("#allViewPage").style.opacity = "0.2";

  // console.log(teacher);
  if (teacher != "") {
    document.querySelector("#typeFormTeacher").innerHTML = typeEdit;

    type = false;
    // console.log(teacher);
    teacherEdit = teacher;

    var myForm = document.querySelectorAll("#myForm .form-group");

    myForm[0].children[1].setAttribute("value", teacher.name);
    myForm[1].children[1].value = teacher.group;
    myForm[2].children[1].value = teacher.gender;
    myForm[4].children[1].value = teacher.classLeader;
    myForm[5].children[1].setAttribute("value", teacher.email);
    myForm[6].children[1].setAttribute("value", teacher.dataOfBirth);
    myForm[7].children[1].setAttribute("value", teacher.phone || "");
    myForm[8].children[1].setAttribute("value", teacher.address || "");
    oldEmail = teacher.email;
    // giai lap co data

    const dataClassTeachSubjects = teacher.subjectsAndClass;

    // myForm[3].children[1].children[1].children[0].children[0] tung lop 1
    // myForm[3].children[1].children[1].children[0].children[0].children[0] tung phhan chon 1 trong 1 lop
    // myForm[3].children[1].children[1].children[0].children[0].children[1].children[0]  input value trong 1 thành phan
    // console.log(`object`,  myForm[3].children[1].children[1].children[0].children[1].children[0].children[0].value , );

    var i = 0;

    var tmpForm = myForm[3].children[1].children[1];

    while (tmpForm.children[0].children[i] != undefined) {
      // neu thang class dc chon thi di tiep tim nhung thang dc chon

      dataClassTeachSubjects.forEach((e) => {
        if (
          e.class ==
          tmpForm.children[0].children[i].children[0].children[0].value
        ) {
          tmpForm.children[0].children[
            i
          ].children[0].children[0].checked = true;

          let j = 0;
          while (
            tmpForm.children[0].children[i].children[1].children[j] != undefined
          ) {
            if (
              e.class ==
                tmpForm.children[0].children[i].children[0].children[0].value &&
              e.subject ==
                tmpForm.children[0].children[1].children[1].children[j]
                  .children[0].value
            ) {
              tmpForm.children[0].children[i].children[1].children[
                j
              ].children[0].checked = true;
            }
            j++;
          }
        }
      });

      i++;
    }
  }
}

function reNewForm() {
  var myForm = document.querySelectorAll("#myForm .form-group");
  myForm[0].children[1].setAttribute("value", "");
  myForm[5].children[1].setAttribute("value", "");
  myForm[6].children[1].setAttribute("value", "");
  myForm[7].children[1].setAttribute("value", "");
  myForm[8].children[1].setAttribute("value", "");
  document.getElementById("myForm").reset();
  teacherEdit = {};
}

function mySubmitFunction(e) {
  e.preventDefault();

  getInfoTeacher();
}
