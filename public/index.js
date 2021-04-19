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
        })
        .then((res) => {
          res
            ? location.assign("./Admin/admin.html")
            : location.assign("./Teacher/screen/HompageTeacher.html");
        });
    })
    .catch(function (error) {
      alert(error.massages);
    });
});
