var body = document.querySelector("#upload");
var listOfTeachers = [];

// format obj to strin chuyaarn
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

// Get data teacher and put into "listOfTeachers"
db.collection("Teachers").onSnapshot(async function (querySnapshot) {
  listOfTeachers = [];
  await querySnapshot.forEach(function (doc) {
    let tamp = doc.data();
    tamp.docId = doc.id;
    listOfTeachers.push(tamp);
  });
  renderTable(listOfTeachers);
});



function renderAddElementInTable(e) {

  console.log(e)

  var date=new Date(e.dataOfBirth);
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };
  date=date.toLocaleDateString("en", options);
  let node = `  
        
        <td class="text-center">${e.id}</td>
        <td class="text-center">${e.name}</td>
        <td class="text-center">${e.gender == "true" ? "Nam" : "Nữ"}</td>
        <td class="text-center">${e.group=='nation'? "Tự nhiên" : "Xã hội"}</td>
        <td class="text-center">${e.classLeader==''?"không chủ nhiệm":e.classLeader}</td>
        <td class="text-center">${formatObjectClassAndTeach(
          e.subjectsAndClass
        )} </td>
        <td class="text-center">${e.email}</td>
        <td class="text-center">${date}</td> 
     `;

  var td = document.createElement("td");
  td.setAttribute("class", "text-center");
  td.innerHTML = `<button class="btn btn-outline-success " type="button" onclick='deleteById("${e.docId}","${e.id}","${e.name}")' style=" color: #8596C2;">
        <i class="fas fa-trash-alt"  ></i>
        </button>`;

  var btnEdit = document.createElement("button");
  btnEdit.setAttribute("class", "btn btn-outline-success ml-2");
  btnEdit.setAttribute("style", " color: #8596C2;");
  btnEdit.innerHTML = ' <i class="far fa-edit"></i>';
  btnEdit.addEventListener("click", () => openFormInput("cover-caption", e));
  td.append(btnEdit);

  let tr_ = document.createElement("tr");
  tr_.innerHTML = node;
  tr_.appendChild(td);

  body.appendChild(tr_);
  // console.log(list);
}

function reRenderNotParam() {
  renderTable(listOfTeachers);
}
function renderTable(list) {
  clearTable();
  list.forEach((e) => renderAddElementInTable(e));
  if (list.length == 0) {
    setNoResult();
  }
}

function clearTable() {
  body.innerHTML = "";
  // while (body.firstChild) {
  //   body.removeChild(body.firstChild);
  // }
}

function setNoResult() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = "";
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
