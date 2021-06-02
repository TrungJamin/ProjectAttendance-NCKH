console.log("chay");
const isFaceStudent = firebase
  .functions()
  .httpsCallable("detectedListAttendance");
const addImage = firebase.functions().httpsCallable("addDescriptorsInData");

const imgUpload = document.getElementById("imageUpload");
imgUpload.addEventListener("change", async () => {
  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  toBase64(imgUpload.files[0]).then((result) => {
    console.log(result);
    console.log("loading...");
    // isFaceStudent({
    //   img: result,
    //   class: "10A1",
    // })
    //   .then((res) => {
    //     console.log("success");
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    addImage({
      listBase64: [result],
      id: "201223",
      Class: "10A1",
    }).then((res) => {
      console.log(res);
    });
  });
});
