const getAttendances = firebase.functions().httpsCallable("getAttendances");
const formAdd = document.querySelector("#results");
const save = document.querySelector(".save");
const setDatabase = firebase.functions().httpsCallable("setDescriptorsInData");
let listBase64 = [];
let index = 0;
save.addEventListener("click", (e) => {
  e.preventDefault();

  Promise.all(listBase64).then((values) => {
    setDatabase({
      class: "6A",
      listBase64: values,
      id: "201906A2",
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
const upload = document.querySelector(".upload");
const upload1 = document.querySelector(".upload1");
upload1.addEventListener("change", (e) => {
  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  Promise.all([toBase64(upload1.files[0])]).then((values) => {
    // console.log(upload1.files[0]);
    // console.log("loading...");
    // console.log(values[0]);
    getAttendances({
      listBase64: values,
      class: "10A1",
    }).then((result) => {
      console.log(result);
    });
  });
});
