var db = firebase.firestore();
var body = document.querySelector("#upload");
var listOfTeachers = [];

// Get data teacher and put into "listOfTeachers"
db.collection("Teachers").onSnapshot(async function (querySnapshot) {
  await querySnapshot.forEach(function (doc) {
    let tamp = doc.data();
    tamp.docId = doc.id;
    listOfTeachers.push(tamp);
  });
  console.log(listOfTeachers);
  renderTable(listOfTeachers);
});

function renderAddElementInTable(e) {
  let node = `  
        <td class="text-center"></td>
        <td class="text-center">${e.id}</td>
        <td class="text-center">${e.name}</td>
        <td class="text-center">${e.group}</td>
        <td class="text-center">${e.classTeach.toString()}</td>
        <td class="text-center">${e.subjectTeach.toString()}</td>
        <td class="text-center">${e.address}</td>
        <td class="text-center">${e.dataOfBirth}</td> 
     `;

  var td = document.createElement("td");
  td.setAttribute("class", "text-center");
  td.innerHTML = `<button type="button" class="btn btn-danger" onclick='deleteById("${e.docId}")' style=" color: white;">
        <i class="fas fa-trash-alt"  ></i>
        </button>`;

  var btnEdit = document.createElement("button");
  btnEdit.setAttribute("class", "btn btn-warning");
  btnEdit.setAttribute("style", " color: white;");
  btnEdit.innerHTML = ' <i class="far fa-edit"></i>';
  btnEdit.addEventListener("click", () => openFormInput("cover-caption", e));
  td.append(btnEdit);

  let tr_ = document.createElement("tr");
  tr_.innerHTML = node;
  tr_.appendChild(td);

  body.appendChild(tr_);
  // console.log(list);
}

function renderTable(list) {
  clearTable();
  list.forEach((e) => renderAddElementInTable(e));
  if (list.length == 0) {
    setNoResult();
  }
}

function clearTable() {
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
}

function setNoResult() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "No Result";
  tr.appendChild(td);
  body.appendChild(tr);
}
/* function reLoadTable(value) {
  document.getElementById(value).remove();
  let html = document.querySelector("tbody");
  html.innerHTML = "";
  dataAllTeacher.forEach((e) => renderAddElementInTable(e));
} */

{
  /* <button type="button" class="btn btn-danger" onclick='deleteById("${e.docId}")' style=" color: white;">
        <i class="fas fa-trash-alt"  ></i>
        </button> */
}

// find("nguyen khac chinh");
