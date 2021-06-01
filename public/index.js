const containerLogin = document.querySelector(".containerLogin");
const login = document.getElementsByClassName("login");
const buttonlogin = document.querySelector(".button-login");
const loading = document.querySelector(".loading");

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
            ? location.assign("./Admin/")
            : location.assign("./Teacher/screen/");
          buttonlogin.classList.remove("d-none");
          loading.classList.add("d-none");
        });
    })
    .catch(function (error) {
      alert("Password is wrong ");
      buttonlogin.classList.remove("d-none");
      loading.classList.add("d-none");
    });
});
