const addStudent = document.querySelector(".add-student-button");

addStudent.addEventListener("click", (e) => {
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
  db.collection("Students")
    .add(
      {
        id: id,
        name: edit_form.fullname.value,
        class: classSelect.value,
        dateOfBirth: dob,
        gender: edit_form.gender.value,
        address: edit_form.Address.value,
        phone: edit_form.Phone.value,
      }
    )
    .then(() => {
      swal("Successfully!", "", "success");
      edit_form.reset();
    });
});
