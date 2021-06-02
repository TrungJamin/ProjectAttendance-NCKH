console.log("chay");
const isFaceStudent = firebase
  .functions()
  .httpsCallable("detectedListAttendance");
const addImage = firebase.functions().httpsCallable("addDescriptorsInData");
const formAdd = document.querySelector("#results");
const save = document.querySelector(".save");
console.log(save);
let listBase64 = [];
let index = 0;
save.addEventListener("click", (e) => {
  e.preventDefault();

  Promise.all(listBase64).then((values) => {
    console.log("loading image");
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
  width: 240,
  height: 240,
  image_format: "jpeg",
  jpeg_quality: 90,
});
Webcam.attach("#my_camera");

function take_snapshot() {
  // take snapshot and get image data
  Webcam.snap(function (data_uri) {
    // display results in page

    document
      .getElementById("results")
      .insertAdjacentHTML("beforeend", `<img id=${index} src="${data_uri}"/>`);
    listBase64 = [...listBase64, data_uri];
  });
}
