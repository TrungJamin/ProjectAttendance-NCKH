const isFaceStudent = firebase.functions().httpsCallable("getListAttendance");
const addImage = firebase.functions().httpsCallable("addDescriptorsInData");
const formAdd = document.querySelector("#results");
const save = document.querySelector(".save");
let listBase64 = [];
let index = 0;

var valueClass = "";
var idStudent = "";

save.addEventListener("click", (e) => {
  e.preventDefault();

  if (valueClass != "" && idStudent != "") {
    document.querySelector(".container-fluid").classList.add("disabled");
    document.querySelector(".loading").classList.remove("d-none");
    Promise.all(listBase64).then((values) => {
      console.log("loading image");
      console.log(values);
      addImage({
        id: idStudent,
        Class: valueClass,
        listBase64: values,
      })
        .then((values) => {
          // up lên thanh công reset form
          listBase64 = [];
          var listImg = document.querySelector("#results");
          listImg.innerHTML = "";
          valueClass = "";
          idStudent = "";
          var selectionClassLeader = document.querySelector("#classLeader");
          var selectionStudent = document.querySelector("#chooseStudent");
          selectionClassLeader.value = "";
          selectionStudent.value = "";
          swal(
            "Dữ Liệu Đã Cập Nhật Thành Công",
            "Cám Ơn Bạn Rất Nhiều",
            "success"
          );
          document
            .querySelector(".container-fluid")
            .classList.remove("disabled");
          document.querySelector(".loading").classList.add("d-none");
        })
        .catch((error) => {
          swal("Warning!", "Đã Xảy Ra Lỗi , Vui Lòng Thêm lại ", "Tiếp Tục");
          document
            .querySelector(".container-fluid")
            .classList.remove("disabled");
          document.querySelector(".loading").classList.add("d-none");
        });
    });
  } else {
    Swal.fire({
      title: "Mời chọn lớp và mã số học sinh",
      position: "top",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
        timer: 500,
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
        timer: 500,
      },
    });
  }
});
Webcam.set({
  width: 400,
  height: 400,
  image_format: "jpeg",
});
Webcam.attach("#my_camera");

function take_snapshot() {
  // take snapshot and get image data
  if (listBase64.length < 10) {
    Webcam.snap(function (data_uri) {
      document.getElementById("results").insertAdjacentHTML(
        "beforeend",
        `<div class='box-img'> 
          <i class="far fa-times-circle" onclick="removeImg('${index}')"></i>
          <img id=${index} class="albumImg" src="${data_uri}"/> 
         </div>`
      );

      index++;
      listBase64 = [...listBase64, data_uri];
    });
  } else {
    Swal.fire({
      title: "tối đa 10 ảnh",
      position: "top",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
        timer: 500,
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
        timer: 500,
      },
    });
  }
  listBase64.length == 10 ? save.removeAttribute("disabled") : "";
}

///
function removeImg(id) {
  listBase64.splice(id, 1);
  var newData = "";
  listBase64.forEach((e, index) => {
    newData += `<div class='box-img'>
    <i class="far fa-times-circle" onclick="removeImg('${index}')"></i>
    <img id=${index} class="albumImg" src="${e}"/>
      </div>`;
  });
  var listImg = document.querySelector("#results");

  save.setAttribute("disabled", "");

  listImg.innerHTML = newData;
}

// render selectionClassLeader lop hoc

var selectionClassLeader = document.querySelector("#classLeader");

function getListClass() {
  db.collection("Classes").onSnapshot(function (querySnapshot) {
    var arr = [];
    querySnapshot.forEach(function (doc) {
      var tamp = doc.data().classes;
      var gan = [];
      tamp.forEach((e) => {
        gan.push(e);
      });
      arr.push(gan);
    });

    renderChooseClassLeader(arr);
  });
}

getListClass();

//renderChooseClassLeader
function renderChooseClassLeader(arr) {
  var node = `<option value checked > chọn class</option>`;
  arr.forEach((e) => {
    e.forEach((eClass) => {
      node += `<option value='${eClass}' > chủ nhiệm lớp ${eClass}</option>`;
    });
  });
  selectionClassLeader.innerHTML = node;
}

function renderChooseStudent(arr) {
  var selectionStudent = document.querySelector("#chooseStudent");
  var nodeDataStudent = "<option checked >chọn học sinh</option>";
  arr.forEach((e) => {
    nodeDataStudent += `<option value='${e.id}' > ${e.id} - ${e.lastName}</option>`;
  });
  selectionStudent.innerHTML = nodeDataStudent;
}

function onChangeClass(className) {
  // test query student

  valueClass = className;
  const dataStudent = [];
  db.collection("Students")
    .where("class", "==", className)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        dataStudent.push(doc.data());
      });
      renderChooseStudent(dataStudent);
    })
    .catch(function (error) {});
}

function onChangeStudent(id) {
  // test query student
  idStudent = id;
}
