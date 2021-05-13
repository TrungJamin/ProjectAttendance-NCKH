//EDIT
const cancelEdit = document.getElementById("cancel");
const edit = document.querySelector(".edit");
const edit_form = document.querySelector("#edit-form");
// Add event listener for Edit Form - SUBMIT
edit_form.addEventListener("submit", (e) => {
  e.preventDefault();
  //trim() doesn't working
  // var s = "a                  c";
  // s = s.trim();
  // console.log(s);
  // console.log(edit_form.studentName.value.trim());
  console.log(edit_form.Class1.value);
  db.collection("Students2")
    .doc(docID)
    .set({
      class: edit_form.Class1.value,
      dateOfBirth: edit_form.dob.value.split("-").reverse().join("/"),
      gender: edit_form.gender.value,
      address: edit_form.Address.value.trim(), // trim() not working
      id: edit_form.studentID.value,
      name: edit_form.fullname.value // ERROR : CANNOT USE TRIM() => SO, WE HAVE TO USE THIS TEMPORARY METHOD
        .split(" ")
        .filter((item) => item != "")
        .join(" "),
      phone: edit_form.Phone.value,
    });
  edit.classList.remove("open");
  swal("Successfully!", "", "success");
});

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
const listOfClasses = [];

const gradeSelect = document.getElementById("selectGrade");
const classSelect = document.getElementById("selectClass");

// GET all docs classes form DATABASE
db.collection("Classes")
  .get()
  .then((snapShot) => {
    snapShot.docs.forEach((doc) => {
      let grade = {
        grade: doc.id,
        classes: doc.data().class,
        total: doc.data().total,
      };
      listOfClasses.push(grade);
    });
  })
  .then(() => {
    // console.log(listOfClasses);
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
  opt_tag.value = opt_tag.textContent = "Choose Class";
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
