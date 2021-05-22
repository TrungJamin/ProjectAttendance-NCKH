const addStudent = document.querySelector(".add-student-button");


addStudent.addEventListener("click", (e) => {
  renderTypeBox.innerHTML = "Add A Student";
  edit.classList.add("open");
  console.log(edit_form);
});
edit_form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(edit_form);
  let dob = edit_form.dob.value.split("-").reverse().join("/");

  let year =
    gradeSelect.value == "10" ? 2021 : gradeSelect.value == "11" ? 2020 : 2019;
  let gender = edit_form.gender.value == "male" ? "1" : "0";
  let id = year + gender + 2;
  let data = edit_form.fullname.value.split(" ");

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
    .then((res) => {
      createAttendance(id);
      edit_form.reset();
    })
    .catch((err) => {
      console.log("chay");
    });
});

const createAttendance = (id) => {
  for (let i = 1; i <= 31; i++) {
    let day = `5-${i}-2021`;
    console.log(day);
    db.collection("Students")
      .doc(id)
      .collection("attendance")
      .doc(day)
      .set({
        ...demo,
        week: getWeekNow(new Date(day)),
      })
      .then(() => {
        swal("Successfully!", "", "success");
      });
  }
};
