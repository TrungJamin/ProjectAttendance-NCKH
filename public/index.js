const containerLogin = document.querySelector(".containerLogin");
const login = document.getElementsByClassName("login");

login[0].addEventListener("submit", (event) => {
  event.preventDefault();
  var email = login[0]["email"].value;
  var password = login[0]["password"].value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async function (response) {
      // check admin
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
        });
    });
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    location.assign("./Admin/admin.html");
    console.log(user);
  } else {
    const login = document.querySelector(".login");

    const spinner = document.querySelector(".icon-spinner");
    const row = document.querySelector(".row");
    login.addEventListener("click", (event) => {
      event.preventDefault();
      var email = document.getElementById("inputEmail").value;
      var password = document.getElementById("inputPassword").value;
      // hiện icon spinner và làm mờ toàn màn hình
      spinner.classList.remove("d-none");
      row.classList.add("opacity");

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async function (response) {
          // check admin
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
                ? location.assign("./Admin/admin.html")
                : location.assign("./Teacher/screen/HompageTeacher.html");

              // css biến mất icon spinner
              spinner.classList.add("d-none");
              row.classList.remove("opacity");
            })
            .catch(function (error) {
              alert("sai tài khoản or mật khẩu");
              spinner.classList.add("d-none");
              row.classList.remove("opacity");
            });
        });
    });
  }
});
