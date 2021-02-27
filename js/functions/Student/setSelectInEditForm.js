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
    console.log(listOfClasses);
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
