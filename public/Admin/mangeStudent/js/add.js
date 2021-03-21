const form = document.getElementById("adding-form");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let dob = form.dob.value.split("-").reverse().join("/");
  console.log(dob);
  let year =
    gradeSelect.value == "10" ? 2021 : gradeSelect.value == "11" ? 2020 : 2019;
  let gender = form.gender.value == "male" ? "1" : "0";
  let id = year + gender + 2;
  db.collection("Students2")
    .add({
      id: id,
      name: form.name.value,
      class: classSelect.value,
      dateOfBirth: dob,
      gender: form.gender.value,
      address: form.address.value,
      phone: form.phone.value,
    })
    .then(() => {
      swal("Successfully!", "", "success");
      form.reset();
    });
});
