var type = true; // xac dinh kieu  (true )add or  (false)edit
var teacherEdit = {};
var db = firebase.firestore();

// render subjectTeach

function renderSubjectTeach() {
  var sub = [
    "Toán",
    "Ngữ văn",
    "Sinh học",
    "Vật lý",
    "Hóa học",
    "Lịch sử",
    "Địa lý",
    "Ngoại ngữ",
    "Giáo dục công dân",
    "Giáo dục Quốc phòng",
    "Thể dục",
    "Công nghệ",
    "Tin học",
    "Hoạt động trải nghiệm",
  ];

  var selectionClassLeader = document.querySelector("#subjectTeach");
  var node = `<option > môn dạy</option>`;
  sub.forEach((e) => {
    node += `<div class="form-check">
             <label class="form-check-label">
                 <input type="checkbox" class="form-check-input" value='${e}'>${e}
             </label>
             </div>`;
  });
  selectionClassLeader.innerHTML = node;
}
renderSubjectTeach();

// render selectionClassLeader lop hoc
function getListClass() {
  db.collection("Classes")
    .get()
    .then(function (querySnapshot) {
      var arr = [];
      querySnapshot.forEach(function (doc) {
        var tamp = doc.data().class;
        var gan = [];
        tamp.forEach((e) => {
          gan.push(e);
        });
        arr.push(gan);
      });

      renderChooseClassLeader(arr);
      renderChooseClassTeach(arr);
    })
    .catch(function (error) {});
}

getListClass();

// render choose classTeach
function renderChooseClassTeach(classTeachs) {
  var classTeach = document.querySelectorAll("#classTeach .col-xs-4-12");

  // có 3 lớp // for chay 3 lần
  // mỗi lần chạy add input checked book cho từng lớp
  classTeachs.forEach((e, index) => {
    let node = `<h6 class="text-center">lớp ${"1" + index}</h6>`;
    e.forEach((eClass) => {
      node += `<div class="form-check">
            <label class="form-check-label">
                <input type="checkbox" class="form-check-input" value='${eClass}'>${eClass}
            </label>
            </div>`;
    });
    classTeach[index].innerHTML = node;
  });
}

//renderChooseClassLeader
function renderChooseClassLeader(arr) {
  var selectionClassLeader = document.querySelector("#classLeader");
  var node = `<option > chọn class leader</option>`;
  arr.forEach((e) => {
    e.forEach((eClass) => {
      node += `<option value='${eClass}' > chủ nhiệm lớp ${eClass}</option>`;
    });
  });
  selectionClassLeader.innerHTML = node;
}

// edit teacher
function editTeacher(id, obj) {
    reNewForm();
  closeFormInput("cover-caption");

  db.collection("Teachers")
    .doc(id)
    .set(obj)
    .then(function () {
      console.log("Document successfully written!");
      type = true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

//// deleteById
function deleteById(id) {
  console.log(id);
  db.collection("Teachers")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

// tao them form input de get data nhap cho phan nay
function addTeacher(obj) {
    reNewForm();
  db.collection("Teachers")
    .add(obj)
    .then(function (response) {})
    .catch(function (error) {});
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

  // lấy về sự lựa chọn lớp dạy
  var classTeach = document.querySelectorAll("#classTeach .col-xs-4-12  input");
  let arrClassTeach = [];
  classTeach.forEach((e) => {
    if (e.checked == true) {
      arrClassTeach.push(e.value);
    }
  });
  // console.log(arrClassTeach);
  teacher.classTeach = arrClassTeach;

  // lấy về sự lựa chọn môn dạy
  var classTeach = document.querySelectorAll("#subjectTeach input");
  let arrSubjectTeach = [];
  classTeach.forEach((e) => {
    if (e.checked == true) {
      arrSubjectTeach.push(e.value);
    }
  });
  console.log(arrSubjectTeach);
  teacher.subjectTeach = arrSubjectTeach;
  // teacher.classTeach=arrClassTeach;

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

  console.log(type, "==================");
  if (type == true) {
    teacher.id = createId();
    addTeacher(teacher);
  }

  if (type == false) {
    teacher.id = teacherEdit.id;
    console.log(teacherEdit.docId, teacher);
    editTeacher(teacherEdit.docId, teacher);
  }
}

function closeFormInput(idOfHtml) {
    reNewForm();
  document.getElementById(idOfHtml).classList.add("hide");
}

function openFormInput(idOfHtml, teacher) {
  document.getElementById(idOfHtml).classList.remove("hide");

  console.log(teacher);
  if (teacher != "") {
    type = false;
    console.log(teacher);
    teacherEdit = teacher;

    //  // đổ data form input chọn lớp dạy
    var classTeach = document.querySelectorAll(
      "#classTeach .col-xs-4-12  input"
    );
    teacher.classTeach.forEach((eClass) => {
      classTeach.forEach((e) => {
        if (e.value == eClass) {
          e.checked = true;
        }
      });
    });

    // đổ data vao from chọn môn dạy
    var SubjectTeach = document.querySelectorAll("#subjectTeach input");

    teacher.subjectTeach.forEach((eSubject) => {
      SubjectTeach.forEach((e) => {
        if (e.value == eSubject) {
          e.checked = true;
        }
      });
    });

    var myForm = document.querySelectorAll("#myForm .form-group");

    myForm[0].children[1].setAttribute("value", teacher.name);
    myForm[1].children[0].value = teacher.group;
    myForm[2].children[0].value = teacher.gender;
    myForm[3].children[0].value = teacher.classLeader;
    myForm[4].children[1].setAttribute("value", teacher.dataOfBirth);
    myForm[5].children[1].setAttribute("value", teacher.address);
  }
}

function reNewForm() {
  document.getElementById("myForm").reset();
}

function mySubmitFunction(e) {
  e.preventDefault();

  getInfoTeacher();
}
