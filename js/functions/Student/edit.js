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
      dateOfBirth: edit_form.Dob.value.split("-").reverse().join("/"),
      gender: edit_form.Gender.value,
      address: edit_form.Address.value.trim(), // trim() not working
      id: edit_form.studentID.value,
      name: edit_form.studentName.value // ERROR : CANNOT USE TRIM() => SO, WE HAVE TO USE THIS TEMPORARY METHOD
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
  // console.log(e.target);
  // console.log(e.target.classList);
  if (e.target.classList.contains("edit")) {
    edit.classList.remove("open");
  }
});
cancelEdit.addEventListener("click", (e) => {
  e.stopPropagation();
  edit.classList.remove("open");
});
