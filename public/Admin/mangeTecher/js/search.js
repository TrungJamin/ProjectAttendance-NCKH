// SEARCH
// const search = document.getElementById("Teacher-search");
// Get data form firebase

// Tasks: Search by gender, phone, subjectTeach
// search.addEventListener("", (e) => {
//   let value = e.target.value;

//   console.log(value)
//   if (value && value.trim().length > 0) {
//     value = value
//       .split(" ")
//       .filter((item) => item != "")
//       .join(" ")
//       .toLowerCase();
//     let tmp = listOfTeachers.filter((teacher) => {
//       return (
//         teacher.name.toLowerCase().includes(value) ||
//         teacher.id.toString().toLowerCase().includes(value) ||
//         teacher.classTeach.toString().toLowerCase().includes(value)
//       );
//     });
//     renderTable(tmp);
//   } else {
//     renderTable(listOfTeachers);
//   }
// });

function searchAll(e){
  let value = e;

  console.log(value);

  if( value==""){

    reRenderNotParam();
  }
  else{
    value = value
    .split(" ")
    .filter((item) => item != "")
    .join(" ")
    .toLowerCase();
  let tmp = listOfTeachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(value) ||
      teacher.id.toString().toLowerCase().includes(value) ||
      teacher.classLeader.toLowerCase().includes(value)
    );
  });

  console.log(tmp)
  renderTable(tmp);
  }
}
