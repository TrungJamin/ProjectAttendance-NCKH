console.log("chay");
const isFaceStudent = firebase.functions().httpsCallable("isFaceStudent");
const testFunction = firebase.functions().httpsCallable("testFunction");
const imgUpload = document.getElementById("imageUpload");
imgUpload.addEventListener("change", async () => {
  console.log("chay");
  
  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  toBase64(imgUpload.files[0]).then((result) => {
    console.log(result);
    isFaceStudent({
      img: result,
      class: "10A1",
    }).then((res) => {
      console.log(res);
    });
  });
});
