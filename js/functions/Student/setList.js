const studentTempList = [];
db.collection("Students2")
  .get()
  .then((snapShot) => {
    snapShot.docs.forEach((doc) => {
      let doc1 = {
        id: doc.id,
        data: doc.data(),
      };
      studentTempList.push(doc1);
    });
  });

// render

function setList(group) {
  clearList();
  let count = 0;
  for (const person of group) {
    const tr = document.createElement("tr");
    const td_ONumbers = document.createElement("td");
    const td_Id = document.createElement("td");
    const td_Name = document.createElement("td");
    const td_DateOB = document.createElement("td");
    const td_Class = document.createElement("td");
    const td_Gender = document.createElement("td");
    const td_Address = document.createElement("td");
    const td_PhoneNumber = document.createElement("td");

    td_Id.textContent = person.id;
    td_Name.textContent = person.name;
    td_DateOB.textContent = person.dateOfBirth;
    td_Class.textContent = person.class;
    td_Gender.textContent = person.gender;
    td_Address.textContent = person.address;
    td_PhoneNumber.textContent = person.phone;

    let td_i = document.createElement("td");
    let i_trash = document.createElement("i");
    let i_edit = document.createElement("i");
    td_i.appendChild(i_edit);
    td_i.appendChild(i_trash);

    i_trash.setAttribute("class", "fas fa-trash");
    i_trash.setAttribute("style", "color: Tomato;");

    i_edit.setAttribute("class", "fas fa-edit mr-5");
    i_edit.setAttribute("style", "color: green;");

    let doc_ID;
    // set Attribute cho từng "<tr> tag"
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
        title: "Are you sure ?",
        text: `Delete ${person.name} 
        ID: ${person.id}`,
        buttons: {
          cancel: true, // Set true to enable the Cancel button
          confirm: "Delete",
        },
        icon: "warning",
        dangerMode: true,
      }).then((val) => {
        // console.log(val);
        // If we click cancel  val = null
        // if we click "submit-btn" val = true
        if (val) {
          swal("Deleted Successfully!", { icon: "success" });
          db.collection("Students2").doc(id).delete();
        }
      });
    });

    // Edit Data
    i_edit.addEventListener("click", (e) => {
      e.stopPropagation();
      // OPEN EDIT FORM

      docID = doc_ID;
      edit_form.studentID.value = tr.getElementsByTagName("td")[1].textContent;

      edit_form.studentName.value =
        tr.getElementsByTagName("td")[2].textContent + "";

      edit_form.Dob.value = tr
        .getElementsByTagName("td")[3]
        .textContent.split("/")
        .reverse()
        .join("-");
      edit_form.Gender.value = tr.getElementsByTagName("td")[4].textContent;
      edit_form.Address.value = tr.getElementsByTagName("td")[6].textContent;
      edit_form.Phone.value = tr.getElementsByTagName("td")[7].textContent;
      let grade = tr.getElementsByTagName("td")[5].textContent.slice(0, 2);
      if (grade == "10") {
        edit_form.grade.value = "10";
      } else if (grade == "11") {
        edit_form.grade.value = "11";
      } else {
        edit_form.grade.value = "12";
      }

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

      /*  edit_form.studentID.value = person.id;

      edit_form.studentName.value = person.name;

      edit_form.Dob.value = person.dateOfBirth.split("/").reverse().join("-");
      edit_form.Gender.value = person.gender;
      // edit_form.Class.value = person.class;
      edit_form.Address.value = person.address;
      edit_form.Phone.value = person.phone;

      // FIND GRADE's and set value for Grade Selection
      let grade = person.class.slice(0, 2);
      if (grade == "10") {
        edit_form.grade.value = "10";
      } else if (grade == "11") {
        edit_form.grade.value = "11";
      } else {
        edit_form.grade.value = "12";
      }

      let gradeTemp = [];
      gradeTemp = listOfClasses.find((item) => {
        return gradeSelect.value == item.grade;
      });
      if (gradeTemp) {
        setOptions(gradeTemp.classes);
      } else {
        setOptions(gradeTemp);
      }
      edit_form.Class1.value = person.class; */

      edit.classList.add("open");
    });
  }
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
