const editProfile = document.querySelector("#editProfile");
var profileTeacher;
var docId = "";
var img = "";
var input;

const inputName = document.querySelector("#myForm #nameInput");
const inputGender = document.querySelector("#myForm #gender");
const inputEmail = document.querySelector("#myForm #inputMail");
const inputDob = document.querySelector("#myForm #dataOfBirth");
const imgProfile = document.querySelector("#myForm #imgAvatarTeacher");

function pushDataToForm(name, gender, mail, dob, imgData) {
  if (imgData == undefined) {
  } else {
    imgProfile.src = imgData;
  }

  inputName.value = name;
  inputGender.value = gender;
  inputEmail.value = mail;
  inputDob.value = dob;
}

// đổ data vào form

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // get all data về
    const result = await db
      .collection("Teachers")
      .where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          profileTeacher = doc.data();
          docId = doc.id;
        });

        input = document.getElementById("inputImg");
        input.addEventListener("change", handleFiles);

        pushDataToForm(
          profileTeacher.name,
          profileTeacher.gender,
          profileTeacher.email,
          profileTeacher.dataOfBirth,
          profileTeacher.img
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
});

// loadingProfile( );

function handleFiles(e) {
  var img = new Image();
  img.src = URL.createObjectURL(e.target.files[0]);
  img.onload = async function () {
    var base64String = resizeImg(img, 300, 300, 0); //HERE IS WHERE THE FUNCTION RESIZE IS CALLED!!!!

    document.querySelector("#imgAvatarTeacher").src = base64String;
    profileTeacher.img = base64String;
  };
}

function saveProfile(e) {
  e.preventDefault();

  profileTeacher.name = inputName.value;
  profileTeacher.gender = inputGender.value;
  profileTeacher.email = inputEmail.value;
  profileTeacher.dataOfBirth = inputDob.value;

  console.log(profileTeacher);
  // // hiện loading upload
  Swal.fire({
    title: "Đang tải dữ liệu lên",
    html: "Vui lòng chờ....",
    timerProgressBar: true,
    position: "top",
    didOpen: () => {
      Swal.showLoading();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });

  db.doc("Teachers/" + docId)
    .set(profileTeacher)
    .then(function (doc) {
      console.log(profileTeacher);
      closeFormInput();

      document.querySelector("#imgAvatar").src = profileTeacher.img;
      Swal.close();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `Chỉnh sửa thành công`,
        showConfirmButton: true,
      });
    })
    .catch(function (error) {});
}

editProfile.addEventListener("click", () => {
  // lalmf mơ
  document.querySelector("#opacityAdd").classList.add("opacityAdd");
  document.querySelector("#formeditprofile").classList.remove("hidden");
  pushDataToForm(
    profileTeacher.name,
    profileTeacher.gender,
    profileTeacher.email,
    profileTeacher.dataOfBirth,
    profileTeacher.img
  );
});

function closeFormInput() {
  document.querySelector("#opacityAdd").classList.remove("opacityAdd");
  document.querySelector("#formeditprofile").classList.add("hidden");
}

function resizeImg(img, maxWidth, maxHeight, degrees) {
  var imgWidth = img.width,
    imgHeight = img.height;

  var ratio = 1,
    ratio1 = 1,
    ratio2 = 1;
  ratio1 = maxWidth / imgWidth;
  ratio2 = maxHeight / imgHeight;

  // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
  if (ratio1 < ratio2) {
    ratio = ratio1;
  } else {
    ratio = ratio2;
  }
  var canvas = document.createElement("canvas");
  var canvasContext = canvas.getContext("2d");
  var canvasCopy = document.createElement("canvas");
  var copyContext = canvasCopy.getContext("2d");
  var canvasCopy2 = document.createElement("canvas");
  var copyContext2 = canvasCopy2.getContext("2d");
  canvasCopy.width = imgWidth;
  canvasCopy.height = imgHeight;
  copyContext.drawImage(img, 0, 0);

  // init
  canvasCopy2.width = imgWidth;
  canvasCopy2.height = imgHeight;
  copyContext2.drawImage(
    canvasCopy,
    0,
    0,
    canvasCopy.width,
    canvasCopy.height,
    0,
    0,
    canvasCopy2.width,
    canvasCopy2.height
  );

  var rounds = 1;
  var roundRatio = ratio * rounds;
  for (var i = 1; i <= rounds; i++) {
    // tmp
    canvasCopy.width = (imgWidth * roundRatio) / i;
    canvasCopy.height = (imgHeight * roundRatio) / i;

    copyContext.drawImage(
      canvasCopy2,
      0,
      0,
      canvasCopy2.width,
      canvasCopy2.height,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height
    );

    // copy back
    canvasCopy2.width = (imgWidth * roundRatio) / i;
    canvasCopy2.height = (imgHeight * roundRatio) / i;
    copyContext2.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      canvasCopy2.width,
      canvasCopy2.height
    );
  } // end for

  canvas.width = (imgWidth * roundRatio) / rounds;
  canvas.height = (imgHeight * roundRatio) / rounds;
  canvasContext.drawImage(
    canvasCopy2,
    0,
    0,
    canvasCopy2.width,
    canvasCopy2.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (degrees == 90 || degrees == 270) {
    canvas.width = canvasCopy2.height;
    canvas.height = canvasCopy2.width;
  } else {
    canvas.width = canvasCopy2.width;
    canvas.height = canvasCopy2.height;
  }

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  if (degrees == 90 || degrees == 270) {
    canvasContext.translate(canvasCopy2.height / 2, canvasCopy2.width / 2);
  } else {
    canvasContext.translate(canvasCopy2.width / 2, canvasCopy2.height / 2);
  }
  canvasContext.rotate((degrees * Math.PI) / 180);
  canvasContext.drawImage(
    canvasCopy2,
    -canvasCopy2.width / 2,
    -canvasCopy2.height / 2
  );

  var dataURL = canvas.toDataURL();
  return dataURL;
}
