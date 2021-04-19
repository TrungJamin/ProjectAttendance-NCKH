const showStudents = document.querySelector("#list");
const iFrame = document.querySelector(".iFrame");
iFrame.src = "./../screen/ListStudentLeader.html";
const logout = document.querySelector("#btnLogout");
auth.onAuthStateChanged((user) => {
  if (!user) {
    location.assign("./../../index.html");
  } else {
    // homepage.classList.remove("non_active");
  }
  console.log(user);
});

logout.addEventListener("click", (event) => {
  firebase
    .auth()
    .signOut()
    .then(function () {})
    .catch(function (error) {
      // An error happened.
    });
});
