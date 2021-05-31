window.addEventListener("scroll", (event) => {
  let nav = document.querySelector(".topbar");
  if (window.scrollY > 200) {
    nav.style.position = "fixed";
    nav.style.right = "0";
  } else {
    nav.style.position = "static";
  }
});
document.querySelector("#btnLogout").addEventListener("click", () => {
  document.querySelector(".formLogout").classList.remove("d-none");
});

function closeFormLogout() {
  document.querySelector(".formLogout").classList.add("d-none");
}
document.querySelector("#agreeLogout").addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("TeacherAdmin").onSnapshot(async function (snapshots) {
      snapshots.forEach((teacher) => {
        if (teacher.data().email == user.email)
          document.querySelector(
            ".page-header"
          ).innerHTML = ` <h1>Danh Sách Điểm Danh Lớp ${
            teacher.data().class
          }</h1>`;
      });
    });
  } else {
    location.assign("./../../index.html");
  }
});
