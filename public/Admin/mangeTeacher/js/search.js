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

function convertDate(day){

  var date=new Date(day);
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };
  date=date.toLocaleDateString("en", options);

  return date;

}

function formatObjectClassAndTeach(s) {
  var index = 0;
  var stringOut = "";
  for (var i = 0; i < s.length - 1; i++) {
    if (s[index].class == s[i + 1].class) {
      s[i + 1].class = "";
    } else {
      index = i + 1;
    }
  }

  s.forEach((e,index) => {
    if (e.class == "") {
      stringOut += " ; " + e.subject;
    } else {
      var br=""
      if(index==0){

      }
      else{
        br="<br>"
      }
      stringOut += br + e.class + " : " + e.subject;
    }
  });
  return stringOut;
}


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
      // teacher.classLeader.toLowerCase().includes(value) ||
      teacher.email.toLowerCase().includes(value)||
      convertDate(teacher.dataOfBirth).toLowerCase().includes(value)||
      formatObjectClassAndTeach(teacher.subjectsAndClass).toLowerCase().includes(value)

    );
  });

  console.log(tmp)
  renderTable(tmp);
  }
}
