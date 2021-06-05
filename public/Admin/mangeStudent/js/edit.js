//EDIT
const cancelEdit = document.getElementById("cancel");
const edit = document.querySelector(".edit");
const renderTypeBox = document.querySelector(".type-name-box");
const edit_form = document.querySelector("#edit-form");
let typeBoxEdit = true;
// Add event listener for Edit Form - SUBMIT

// CLOSE edit form
edit.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    edit_form.reset();
    edit.classList.remove("open");
  }
});
cancelEdit.addEventListener("click", (e) => {
  e.stopPropagation();
  edit_form.reset();
  edit.classList.remove("open");
});

// SET SELECT CLASS AND GRADE
var listOfClasses = [];
var totalStudent = 0;
const gradeSelect = document.getElementById("selectGrade");
const classSelect = document.getElementById("selectClass");

// GET all docs classes form DATABASE

db.collection("Classes").onSnapshot((snapShot) => {
  listOfClasses = [];
  snapShot.docs.forEach((doc) => {
    let grade = {
      grade: doc.id,
      classes: doc.data().classes,
      total: doc.data().total,
    };
    listOfClasses.push(grade);
  });
  // console.log("listOfClasses", listOfClasses);
});

// Clear Option - Class Select
function clearOptions() {
  while (classSelect.firstChild) {
    classSelect.removeChild(classSelect.firstChild);
  }
}

// Set Options
function setOptions(options) {
  clearOptions();
  if (options) {
    let default_option = document.createElement("option");
    default_option.value = "";
    default_option.textContent = "Choose Class";
    classSelect.appendChild(default_option);
    for (let _class of options) {
      console.log(_class);
      let opt_tag = document.createElement("option");
      opt_tag.value = opt_tag.textContent = _class;
      classSelect.appendChild(opt_tag);
    }
  } else {
    setDefault();
  }
}

// Set default
function setDefault() {
  let opt_tag = document.createElement("option");
  opt_tag.value = opt_tag.textContent = "Chọn lớp";
  classSelect.appendChild(opt_tag);
}

gradeSelect.addEventListener("change", (e) => {
  let grade = [];
  grade = listOfClasses.find((item) => {
    return gradeSelect.value == item.grade;
  });
  if (grade) {
    setOptions(grade.classes);
  } else {
    setOptions(grade);
  }
});
