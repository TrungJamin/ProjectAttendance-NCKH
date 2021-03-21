// SEARCH
const search = document.getElementById("Teacher-search");
// Get data form firebase

// Tasks: Search by gender, phone, subjectTeach
search.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value
      .split(" ")
      .filter((item) => item != "")
      .join(" ")
      .toLowerCase();
    let tmp = listOfTeachers.filter((teacher) => {
      return (
        teacher.name.toLowerCase().includes(value) ||
        teacher.id.toString().toLowerCase().includes(value) ||
        teacher.classTeach.toString().toLowerCase().includes(value)
      );
    });
    renderTable(tmp);
  } else {
    renderTable(listOfTeachers);
  }
});
