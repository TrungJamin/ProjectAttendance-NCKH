const homepage = document.getElementById("homepage");
const allStudents = document.getElementById("all-Students");

const iFrame = document.querySelector(".iFrame");

const addTeacher = document.getElementById("add-Teacher");
const listTeacher = document.getElementById("all-Teachers");

let url = "home";
const formLogout = document.querySelector(".formLogout"); // form hien thi log out
const btnLogout = document.querySelector("#btnLogout"); // button hien thi form
const agreeLogout = document.querySelector("#agreeLogout"); // dong y dang xuat
const auth = firebase.auth();
const makeAdmin = document.querySelector(".makeAdmin");

btnLogout.addEventListener("click", (event) => {
  formLogout.classList.add("open"); // hien thi forms
  console.log();
});

function closeFormLogout() {
  // dong forms
  formLogout.classList.remove("open");
}

agreeLogout.addEventListener("click", (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.assign("./../index.html");
    })
    .catch((error) => {
      // An error happened.
    });
});
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.assign("./../index.html");
  } else {
    homepage.classList.remove("non_active");
  }
  console.log(user);
});

// doạn này khi vào trang se vao trang all teache dung 1 l

function refresh() {
  if (sessionStorage.getItem("url")) {
    console.log("run1");
    // neu co di theo url cu
    iFrame.src = sessionStorage.getItem("url");
  } else {
    iFrame.src = "./mangeTecher/testNewTables.html";
  }
}
refresh();

allStudents.addEventListener("click", (event) => {
  sessionStorage.setItem("url", "./mangeStudent/allStudent.html");
  iFrame.src = "./mangeStudent/allStudent.html";
});

addTeacher.addEventListener("click", (event) => {
  sessionStorage.setItem("url", "./mangeTecher/addTeacher.html");
  iFrame.src = "./mangeTecher/addTeacher.html";
});
listTeacher.addEventListener("click", (event) => {
  sessionStorage.setItem("url", "./mangeTecher/allTeacher.html");

  iFrame.src = "./mangeTecher/allTeacher.html";
});

/// log ui user
