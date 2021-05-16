// const showStudents = document.querySelector("#list");

// const logout = document.querySelector("#btnLogout");
// auth.onAuthStateChanged((user) => {
//   if (!user) {
//     location.assign("./../../index.html");
//   } else {
//     // homepage.classList.remove("non_active");
//   }
//   console.log(user);
// });
// // get students

// logout.addEventListener("click", (event) => {
//   firebase
//     .auth()
//     .signOut()
//     .then(function () {})
//     .catch(function (error) {});
// });
const test = firebase.functions().httpsCallable("onCallTest");
test({
  name: "Function-oke",
})
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {});
