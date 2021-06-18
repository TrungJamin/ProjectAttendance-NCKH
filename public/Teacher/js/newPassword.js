const formUpdatePassword = document.querySelector("#form-update-password");
const updatePasswordScreen = document.querySelector(".update-password-screen");

const turnOnUpdatePasswordScreen = () => {

  document.querySelector("#opacityAdd").classList.add("opacityAdd");
  
  updatePasswordScreen.classList.remove("d-none");

  // đông form gủi mail
  document
    .querySelector(".form-send-email-all-student")
    .classList.add("d-none");
};

const turnOffScreenUpdatePassWord = () => {
  document.querySelector("#opacityAdd").classList.remove("opacityAdd");
  document.querySelector('#openSendEmail').classList.remove('active');
  document.querySelector('#changerPw').classList.remove('active');
  updatePasswordScreen.classList.add("d-none");
};

formUpdatePassword.addEventListener("submit", async function (event) {
  event.preventDefault();
  Swal.fire({
    title: "Đang Cập Nhật Mật Khẩu",
    html: "Vui lòng chờ....",
    timerProgressBar: true,
    position: "center",
    didOpen: () => {
      Swal.showLoading();
    },
  });
  const oldPassword = formUpdatePassword["old-password"].value;
  const newPassword = formUpdatePassword["new-password"].value;
  const confirmPassword = formUpdatePassword["confirm-password"].value;
  if (newPassword !== confirmPassword) {
    alert("Xác Nhận Mật Khẩu Không Trùng Khớp");
    return;
  }
  const email = profileTeacher.email;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, oldPassword)
    .then(function (response) {
      const user = response.user;
      user
        .updatePassword(newPassword)
        .then(() => {
          Swal.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Cập nhật mật khẩu thành công`,
            showConfirmButton: true,
          });
          turnOffScreenUpdatePassWord();
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `Mật Khẩu Mới phải hơn 6 kí tự`,
            showConfirmButton: true,
          });
        });
    })
    .catch(function (error) {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Mật Khẩu Cũ Không Đúng`,
        showConfirmButton: true,
      });
    });
});
function updatePassword(newPassword) {
  const user = firebase.auth().currentUser;
  user
    .updatePassword(newPassword)
    .then(() => {
      // Update successful.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
}
