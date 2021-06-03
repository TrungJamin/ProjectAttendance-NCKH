console.log("chay");
const isFaceStudent = firebase.functions().httpsCallable("getListAttendance");
const addImage = firebase.functions().httpsCallable("addDescriptorsInData");
const formAdd = document.querySelector("#results");
const save = document.querySelector(".save");
let listBase64 = [];
let index = 0;

save.addEventListener("click", (e) => {
  e.preventDefault();

  Promise.all(listBase64).then((values) => {
    console.log("loading image");
    console.log(values);
    addImage({
      id: "10001",
      Class: "10A1",
      listBase64: values,
    }).then((values) => {
      console.log(values);
    });
  });
});
Webcam.set({
  width: 400,
  height: 400,
  image_format: "jpeg",
});
Webcam.attach("#my_camera");

function take_snapshot() {
  // take snapshot and get image data
  if (index < 5) {
    Webcam.snap(function (data_uri) {
      document
        .getElementById("results")
        .insertAdjacentHTML(
          "beforeend",
          `<div class='box-img'> <i class="far fa-times-circle" onclick="removeImg('${index}')"></i> <img id=${index} class="albumImg" src="${data_uri}"/>  </div>`
        );
      index++;
      listBase64 = [...listBase64, data_uri];
    });
  } else {
    alert("max is 5 photo");
  }
}

///

function removeImg(id) {
  listBase64.splice(id, 1);

  var newData = "";

  listBase64.forEach((e, index) => {
    newData += `<div class='box-img'> <i class="far fa-times-circle" onclick="removeImg('${index}')"></i> <img id=${index} class="albumImg" src="${e}"/>  </div>`;
  });

  var listImg = document.querySelector("#results");

  listImg.innerHTML = newData;
}



// con chuc nang mai add img lên data base mai làm 