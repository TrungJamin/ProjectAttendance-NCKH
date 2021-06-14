const addStudent = document.querySelector(".add-student-button");
let attendance = {
  morning: [],
  afternoon: [],
  status: true,
  asked: true,
  note: "",
};

addStudent.addEventListener("click", (e) => {
  renderTypeBox.innerHTML = "Thêm Một Sinh Viên";
  edit.classList.add("open");
  typeBoxEdit = false;
});

edit_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let dob = edit_form.dob.value.split("-").reverse().join("/");
  let year =
    gradeSelect.value == "10" ? 2021 : gradeSelect.value == "11" ? 2020 : 2019;
  let gender = edit_form.gender.value == "male" ? "1" : "0";
  let data = edit_form.fullname.value.split(" ");
  let id = "";

  let dateNow = new Date().getFullYear();
  let dateInput = new Date(edit_form.dob.value).getFullYear();

  if (Number(dateNow) - Number(dateInput) < 10) {
    alert("mời nhập lại tuổi");
  } else {
    if (typeBoxEdit) {
      id = edit_form.studentID.value;
      db.collection("Students")
        .doc(id)
        .set({
          firstName: data.slice(0, data.length - 1),
          lastName: data[data.length - 1],
          id: id,
          name: edit_form.fullname.value,
          class: classSelect.value,
          dateOfBirth: dob,
          gender: edit_form.gender.value,
          address: edit_form.Address.value,
          phone: edit_form.Phone.value,
        })
        .then(function () {
          swal("Successfully!", "", "success");
          edit.classList.remove("open");
        });
    } else {
      let gradeLevel = getGradeLevel(classSelect.value);
      let total = gradeLevel.total;
      const id = year + gender + classSelect.value + ++total;
      db.collection("Students")
        .doc(id)
        .set({
          firstName: data.slice(0, data.length - 1),
          lastName: data[data.length - 1],
          id: id,
          name: edit_form.fullname.value,
          class: classSelect.value,
          dateOfBirth: dob,
          gender: edit_form.gender.value,
          address: edit_form.Address.value,
          phone: edit_form.Phone.value,
        })
        .then(async (res) => {
          for (let i = 5; i <= 7; i++) {
            await createAttendance(id, i);
          }
          setGradeLevel(classSelect.value);
          edit_form.reset();
        })
        .then(function () {
          swal("Successfully!", "", "success");
        });
      // .catch((err) => {
      //   alert(err.message);
      // });
    }
  }
});

const createAttendance = (id, month) => {
  for (let i = 1; i <= 31; i++) {
    x = i;
    if (i < 10) {
      x = "0" + i;
    }
    let day = `${month}-${x}-2021`;
    db.collection("Students")
      .doc(id)
      .collection("attendance")
      .doc(day)
      .set({
        ...attendance,
        week: getWeekNow(new Date(day)),
      });
  }
};
function getGradeLevel(Class) {
  return listOfClasses.find((item) => {
    return item.classes.includes(Class);
  });
}
function setGradeLevel(Class) {
  var tmp = getGradeLevel(Class);
  let newtotal = tmp.total + 1;
  db.collection("Classes")
    .doc(tmp.grade)
    .set({
      ...tmp,
      total: newtotal,
    });
}
