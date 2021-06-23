const containerLogin = document.querySelector(".containerLogin");
const login = document.getElementsByClassName("login");
const buttonlogin = document.querySelector(".button-login");
const loading = document.querySelector(".loading");
const forgotPassword = document.querySelector("#forgot-password");
const buttonAccept = document.querySelector("#button-accept");
login[0].addEventListener("submit", (event) => {
  event.preventDefault();
  var email = login[0]["email"].value;
  var password = login[0]["password"].value;
  buttonlogin.classList.add("d-none");
  loading.classList.remove("d-none");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      Swal.fire({
        position: "center",
        title: "Mật khẩu hoặc email của bạn không đúng,xin vui lòng nhập lại",
        showConfirmButton: true,
      });
      buttonlogin.classList.remove("d-none");
      loading.classList.add("d-none");
    });
});

forgotPassword.addEventListener("submit", (e) => {
  e.preventDefault();
  let count = 15;
  const email = forgotPassword["forgot-password-input"].value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("email đã gửi thành công , vui lòng kiểm tra email của bạn");
      buttonAccept.setAttribute("class", "disable");
      const resetPassword = setInterval(() => {
        if (count == 0) {
          buttonAccept.value = `Gửi Mã Xác Nhận`;
          buttonAccept.classList.remove("disable");
          clearInterval(resetPassword);
        } else {
          buttonAccept.value = `Gửi Mã Xác Nhận (${count})`;
        }
        count--;
      }, 1000);
    })
    .catch((error) => {
      console.log(error.code);
      alert(
        "Email không tồn tại, bạn vui lòng liên hệ với admin để được cung cấp tài khoản"
      );
    });
});

const screenForgotPassword = document.querySelectorAll(".forgot-password-form");
const backToLogin = document.querySelector(".back-to-login");
const screenLogin = document.querySelectorAll(".login-form");
const nextToForgot = document.querySelector(".next-to-forgot");
backToLogin.addEventListener("click", () => {
  screenForgotPassword.forEach((item) => {
    item.classList.add("non-active");
  });
  screenLogin.forEach((item) => {
    item.classList.remove("non-active");
  });
});
nextToForgot.addEventListener("click", () => {
  screenForgotPassword.forEach((item) => {
    item.classList.remove("non-active");
  });
  screenLogin.forEach((item) => {
    item.classList.add("non-active");
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user
      .getIdTokenResult()
      .then((token) => {
        token.claims.admin
          ? location.assign("./admin")
          : location.assign("./teacher/screen");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
console.log("run-112");
const createAccount = firebase.functions().httpsCallable("createAccount");
createAccount({
  email: "xyaass@gmail.com",
  password: "121212111",
}).then((response) => {
  console.log(response);
});
