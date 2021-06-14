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
    .then(async function (response) {
      // check admin
      console.log(response);
      await db
        .collection("admin")
        .get()

        .then(function (querySnapshot) {
          let check = false;
          querySnapshot.forEach(function (doc) {
            if (doc.id === response.user.uid) {
              check = true;
            }
          });

          return check; // can suy nghi
        })
        .then((res) => {
          res
            ? location.assign("./admin")
            : location.assign("./Teacher/screen");
          buttonlogin.classList.remove("d-none");
          loading.classList.add("d-none");
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch(function (error) {
      Swal.fire({
        position: "center",
        title: "mật khẩu hoặc email của bạn không đúng,xin vui lòng nhập lại",
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
