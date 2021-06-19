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
  Swal.fire({
    title: "Bạn có chắc muốn đăng xuất?",

    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: " #3085d6",
    confirmButtonText: "Đăng xuất",
    cancelButtonText: "Không",
  }).then((result) => {
    if (result.isConfirmed) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.assign("./../index.html");
        })
        .catch((error) => {
          // An error happened.
        });
    }
  });
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

function setNameOfTeacher(name) {
  // remove @gmail.com
  let nameTmp = "" + name;
  nameTmp = nameTmp.replace("@gmail.com", "");
  document.querySelector("#nameOfTeacher").innerHTML = nameTmp;
  console.log(document.querySelector("#nameOfTeacher"));
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("TeacherAdmin").onSnapshot(async function (snapshots) {
      snapshots.forEach((teacher) => {
        if (teacher.data().email == user.email) {
          document.querySelector(
            ".page-header"
          ).innerHTML = ` <h1>Danh Sách Điểm Danh Lớp ${
            teacher.data().class
          }</h1>`;
          setNameOfTeacher(user.email);

          db.collection("Teachers")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let profileTeacher = doc.data();

                if (profileTeacher.img) {
                  document.querySelector("#imgAvatar").src = profileTeacher.img;
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      });
    });
  } else {
    location.assign("./../../index.html");
  }
});

// attendance Screen
const remoteScreen = document.querySelector("#remoteScreen");
const btnAttendance = document.querySelector("#attendance");
