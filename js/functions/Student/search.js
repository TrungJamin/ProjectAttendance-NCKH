// SEARCH
const search = document.getElementById("Student-search");
// Get data form firebase

/*  db.collection("Students2")
    .get()
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        listOfStudent.push(doc.data());
      });
    })
    .then(() => {
      setList(listOfStudent);
    }); */

// SEARCH
search.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value
      .split(" ")
      .filter((item) => item != "")
      .join(" ")
      .toLowerCase();
    let tmp = listOfStudent.filter((student) => {
      return (
        student.name.toLowerCase().includes(value) ||
        student.id.toString().toLowerCase().includes(value) ||
        student.class.toLowerCase().includes(value) ||
        student.gender.toLowerCase().includes(value) ||
        student.phone.toLowerCase().includes(value)
      );
    });
    setList(tmp);
  } else {
    setList(listOfStudent);
  }
});
