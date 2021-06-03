console.log("chay");
const isFaceStudent = firebase.functions().httpsCallable("getListAttendance");
const addImage = firebase.functions().httpsCallable("detectedListAttendance");
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
  Webcam.snap(function (data_uri) {
    document
      .getElementById("results")
      .insertAdjacentHTML("beforeend", `<img id=${index} src="${data_uri}"/>`);
    index++;
    listBase64 = [...listBase64, data_uri];
  });
}
