const addStudent = document.querySelector(".add-student-button");
let demo = {
  morning: [
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
  ],
  afternoon: [
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
    { status: true, note: "", asked: true, code: "" },
  ],

  status: true,
  asked: "",
  note: "",
};

addStudent.addEventListener("click", (e) => {
  renderTypeBox.innerHTML = "Thêm Một Sinh Viên";
  edit.classList.add("open");
  typeBoxEdit = false;
  console.log("run-addstudent", typeBoxEdit);
});

edit_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let dob = edit_form.dob.value.split("-").reverse().join("/");
  let year =
    gradeSelect.value == "10" ? 2021 : gradeSelect.value == "11" ? 2020 : 2019;
  let gender = edit_form.gender.value == "male" ? "1" : "0";
  let data = edit_form.fullname.value.split(" ");
  const id = typeBoxEdit
    ? edit_form.studentID.value
    : year + gender + parseInt(Math.random() * 100);
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
      });
  } else {
    const id = year + gender + parseInt(Math.random() * 100);
    console.log("run-add");
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
        edit_form.reset();
        swal("Successfully!", "", "success");
      })
      .catch((err) => {
        alert(err.message);
      });
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
        ...demo,
        week: getWeekNow(new Date(day)),
      });
  }
};
