const body_table = document.querySelector("#body-table");
const listOfStudent = [];

// FOR SETLIST and EDIT
let tmpStudent = {};

const studentTempList = [];
db.collection("Students")
  .get()
  .then((snapShot) => {
    snapShot.docs.forEach((doc) => {
      let _doc = {
        id: doc.id,
        data: doc.data(),
      };
      studentTempList.push(_doc);
    });
  });

// render

function setList(group) {
  clearList();
  for (const person of group) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", person.id );
    const td_ONumbers = document.createElement("td");
    td_ONumbers.setAttribute("class", "serial");
    const td_Id = document.createElement("td");
    const td_Name = document.createElement("td");
    const td_DateOB = document.createElement("td");
    const td_Class = document.createElement("td");
    td_Class.setAttribute("class", "Class");
    const td_Gender = document.createElement("td");
    td_Gender.setAttribute("class", "gender");
    const td_Address = document.createElement("td");
    const td_PhoneNumber = document.createElement("td");
    td_PhoneNumber.style.width = "200px";

    td_Id.textContent = person.id;
    td_Name.textContent = person.name;
    td_DateOB.textContent = person.dateOfBirth;
    td_Class.textContent = person.class;
    td_Gender.textContent = person.gender;
    td_Address.textContent = person.address;
    td_PhoneNumber.textContent = person.email;

    let td_i = document.createElement("td");
    let i_trash = document.createElement("i");
    let i_edit = document.createElement("i");
    td_i.appendChild(i_edit);
    td_i.appendChild(i_trash);

    i_trash.setAttribute("class", "fas fa-trash");
    i_trash.setAttribute("style", "color: Tomato;");

    i_edit.setAttribute("class", "fas fa-edit mr-4");
    i_edit.setAttribute("style", "color: green;");

    let doc_ID;
    studentTempList.every((doc) => {
      if (
        doc.data.id === person.id &&
        document.getElementById(doc.id) == null // *ERROR O DAY* => fixed : document.getElementById(doc.id) == null
      ) {
        // Neu tim duoc thi break
        doc_ID = doc.id;
        tr.setAttribute("id", doc_ID);
        return false;
      }
      return true;
    });

    tr.appendChild(td_ONumbers);
    tr.appendChild(td_Id);
    tr.appendChild(td_Name);
    tr.appendChild(td_DateOB);
    tr.appendChild(td_Gender);
    tr.appendChild(td_Class);
    tr.appendChild(td_Address);
    tr.appendChild(td_PhoneNumber);

    tr.appendChild(td_i);
    body_table.appendChild(tr);
    // Delete Data
    // console.log("RUN"); // chạy 4371 lần :)
    i_trash.addEventListener("click", (e) => {
      e.stopPropagation();

      let id = e.target.parentElement.parentElement.getAttribute("id");
      swal({
        title: "Bạn có chắc muốn xóa ?",
        text: `Xóa ${person.name} 
        ID: ${person.id}`,
        buttons: {
          cancel: "Hủy", // Set true to enable the Cancel button
          confirm: "Xóa",
        },

        icon: "warning",
        dangerMode: true,
      }).then((val) => {
        // console.log(val);
        // If we click cancel  val = null
        // if we click "submit-btn" val = true
        if (val) {
          db.collection("Students")
            .doc(person.id)
            .delete()
            .then(() => {
              swal("xóa thành công!", { icon: "success" });
            });
        }
      });
    });

    // Edit Data
    i_edit.addEventListener("click", (e) => {
      e.stopPropagation();
      // OPEN EDIT FORM
      typeBoxEdit = true;
      renderTypeBox.innerText = "Chỉnh sửa thông tin học sinh";
      docID = doc_ID;
      edit_form.studentID.value = tr.getElementsByTagName("td")[1].textContent;
      edit_form.fullname.value =
        tr.getElementsByTagName("td")[2].textContent + "";

      edit_form.dob.value = tr
        .getElementsByTagName("td")[3]
        .textContent.split("/")
        .reverse()
        .join("-");
      edit_form.gender.value = tr.getElementsByTagName("td")[4].textContent;
      edit_form.Address.value = tr.getElementsByTagName("td")[6].textContent;
      edit_form["student-email"].value =
        tr.getElementsByTagName("td")[7].textContent;
      tmpStudent.email = edit_form["student-email"].value;
      let grade = tr.getElementsByTagName("td")[5].textContent.slice(0, 2)[0];
      if (grade == "6") {
        edit_form.grade.value = "6";
      } else if (grade == "7") {
        edit_form.grade.value = "7";
      } else if (grade == "8") {
        edit_form.grade.value = "8";
      } else edit_form.grade.value = "9";

      let gradeTemp = [];
      gradeTemp = listOfClasses.find((item) => {
        return gradeSelect.value == item.grade;
      });
      if (gradeTemp) {
        setOptions(gradeTemp.classes);
      } else {
        setOptions(gradeTemp);
      }
      edit_form.Class1.value = tr.getElementsByTagName("td")[5].textContent;
      edit.classList.add("open");
    });
  }
  setOrdinalNumbers();
  if (group.length == 0) {
    setNoResult();
  }
}

// CLEAR LIST
function clearList() {
  while (body_table.firstChild) {
    body_table.removeChild(body_table.firstChild);
  }
}

// SET NO RESULT FOR SEARCHING
function setNoResult() {
  const tr = document.createElement("tr");
  const td_Rs = document.createElement("td");
  td_Rs.textContent = "No result";

  tr.appendChild(td_Rs);
  body_table.appendChild(tr);
}

// SET ORDINAL NUMBERS IN ENGLISH
function setOrdinalNumbers() {
  // get "tr" tags of the table body
  let tr_Children = body_table.getElementsByTagName("tr");
  // use for loop to set ordinal numbers for table
  let i = 1;
  for (let tr of tr_Children) {
    tr.getElementsByTagName("td")[0].textContent = i;
    i++;
  }
}

// SORT
function sortAtoZ() {
  if (listOfStudent.length > 0) {
    listOfStudent.sort((student1, student2) => {
      return getLastName(student1.name) - getLastName(student2.name);
    });
    setList(listOfStudent);
  }
}

function sortZtoA() {
  if (listOfStudent.length > 0) {
    listOfStudent.sort((student1, student2) => {
      return getLastName(student2.name) - getLastName(student1.name);
    });
    setList(listOfStudent);
  }
}
function getLastName(name) {
  let temp = name.split(" ");

  return temp[temp.length - 1].toLowerCase().charCodeAt(0);
}

function convertDate(day) {
  var date = new Date(day);
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  date = date.toLocaleDateString("en", options);

  return date;
}

const search = document.getElementById("Student-search");
const refreshSearch = document.querySelector(".btn-refresh-search");
refreshSearch.addEventListener("click", (e) => {
  search.value = "";
  setList(listOfStudent);
});
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
        student.dateOfBirth.toLowerCase().includes(value) ||
        student.gender.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value) ||
        convertDate(student.dateOfBirth).toLowerCase().includes(value) ||
        student.address.toLowerCase().includes(value)
      );
    });
    setList(tmp);
  } else {
    setList(listOfStudent);
  }
});
