const isFaceStudent = firebase.functions().httpsCallable("getListAttendance");
const addImage = firebase.functions().httpsCallable("addDescriptorsInData");
const formAdd = document.querySelector("#results");
const save = document.querySelector(".save");
const upLoadFile = document.querySelector(".custom-file-upload");
let listBase64 = [];
let index = 0;

var valueClass = "";
var idStudent = "";

const viewNotice = (res) => {
  if (res <= 5) {
    swal(
      "Nhận Diện Ảnh Không Thành Công",
      `Số Ảnh Thành Công ${res}/10 ,
    Bạn Vui Lòng Làm Lại
    `,
      "error"
    );
  } else {
    if (res < 8) {
      swal(
        "Cảnh Báo",
        `Số Ảnh Thành Công ${res}/10 ,
      `,
        "warning"
      );
    } else {
      swal(
        "Cập Nhật Ảnh Thành Công",
        `Số Ảnh Thành Công ${res}/10 ,
      `,
        "success"
      );
    }
  }
};
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
        .then((res) => {
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

          viewNotice(res.data);
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

const file = document.getElementById("file-upload");
file.addEventListener("change", function (event) {
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  toBase64(file.files[0]).then((result) => {
    insertImage(result);
  });
});
// them anh vao Khung
function insertImage(uri) {
  document.getElementById("results").insertAdjacentHTML(
    "beforeend",
    `<div class='box-img'> 
      <i class="far fa-times-circle" onclick="removeImg('${index}')"></i>
      <img id=${index} class="albumImg" src="${uri}"/> 
     </div>`
  );

  index++;
  listBase64 = [...listBase64, uri];
  listBase64.length == 10 ? save.removeAttribute("disabled") : "";
}
// kiem tra xem co vuot gian han qua 10 anh k
function checkExpireImg() {
  return listBase64.length < 10;
}

// chup anh qua webcam
function take_snapshot() {
  // take snapshot and get image data
  if (checkExpireImg()) {
    Webcam.snap(function (data_uri) {
      insertImage(data_uri);
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
}

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
  var node = `<option value checked > chọn lớp </option>`;
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
const video = document.getElementsByTagName("video")[0];
