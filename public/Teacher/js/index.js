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

let emailTeacher ;
firebase.auth().onAuthStateChanged((user)=>{
  emailTeacher = user.email;
  console.log(emailTeacher);
}
);


