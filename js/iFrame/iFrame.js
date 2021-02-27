const addStudent = document.getElementById("add-Student");
const allStudents = document.getElementById("all-Students");

const iFrame = document.querySelector(".iFrame");

const addTeacher = document.getElementById("add-Teacher");
const listTeacher = document.getElementById("all-Teachers");

addStudent.addEventListener("click", (event) => {
  iFrame.src = "./../html/Student/addStudent.html";
});

allStudents.addEventListener("click", (event) => {
  iFrame.src = "./../html/Student/allStudent.html";
});

addTeacher.addEventListener("click", (event) => {
  iFrame.src = "./../html/Teacher/addTeacher.html";
});
listTeacher.addEventListener("click", (event) => {
  iFrame.src = "./../html/Teacher/allTeacher.html";
});
