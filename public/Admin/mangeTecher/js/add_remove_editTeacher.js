var type = true; // xac dinh kieu  (true )add or  (false)edit
var teacherEdit = {};
var db = firebase.firestore();

var btnAddTeacher=document.querySelector("#addTeacher");
console.log(btnAddTeacher)
btnAddTeacher.addEventListener("click", () =>{
  openFormInput("cover-caption","");
  
} )


 
// render selectionClassLeader lop hoc
function getListClass() {
  db.collection("Classes")
    .get()
    .then(function (querySnapshot) {
      var arr = [];
      querySnapshot.forEach(function (doc) {
        var tamp = doc.data().class;
        var gan = [];
        tamp.forEach((e) => {
          gan.push(e);
        });
        arr.push(gan);
      });


      console.log("run -----")
      renderChooseClassLeader(arr);
       
      renderMuntilChoose(arr);
    })
    .catch(function (error) {});
}

getListClass();



// new code 
function renderMuntilChoose( listClass){

  console.log("run")
  console.log(`listClass`, listClass)
  const renderMuntilchooseHtml=document.querySelector("#renderMuntilChoose");

  var node='';

  listClass.forEach(e=> {

    e.forEach( element=>{
       node+=`<div class="form-check">
      <label class="form-check-label">
          <input type="checkbox" class="form-check-input" value='${element}'>${element}
      </label>
      
      <div class="renderMuntilChooseSubjects">
        
        
      </div>
      </div>`
    })
   
  });

 
  renderMuntilchooseHtml.innerHTML=node;
  renderMuntilChooseSubjects();

  

}


function renderMuntilChooseSubjects(){

  var sub = [
    "Toán",
    "Ngữ văn",
    "Sinh học",
    "Vật lý",
    "Hóa học",
    "Lịch sử",
    "Địa lý",
    "Ngoại ngữ",
    "Giáo dục công dân",
    "Giáo dục Quốc phòng",
    "Thể dục",
    "Công nghệ",
    "Tin học",
    "Hoạt động trải nghiệm",
  ]; 

  var node = ` `;
  sub.forEach((e) => {
    node += `<label class="form-check-label ml-3">
          <input type="checkbox"  class="form-check-input  " value='${e}'> ${e}
      </label>`;
  });


  const renderMuntilChooseSubjectsHtml= document.querySelectorAll(".renderMuntilChooseSubjects");

  renderMuntilChooseSubjectsHtml.forEach( e=>{

    e.innerHTML=node;

  })

  
}
 

//renderChooseClassLeader
function renderChooseClassLeader(arr) {
  var selectionClassLeader = document.querySelector("#classLeader");
  var node = `<option > chọn class leader</option>`;
  arr.forEach((e) => {
    e.forEach((eClass) => {
      node += `<option value='${eClass}' > chủ nhiệm lớp ${eClass}</option>`;
    });
  });
  selectionClassLeader.innerHTML = node;
}

// edit teacher
function editTeacher(id, obj) {
    reNewForm();
  closeFormInput("cover-caption");

  db.collection("Teachers")
    .doc(id)
    .set(obj)
    .then(function () {
      console.log("Document successfully written!");
      type = true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

//// deleteById
function deleteById(id) {
  console.log(id);
  db.collection("Teachers")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

// tao them form input de get data nhap cho phan nay
function addTeacher(obj) {
    reNewForm();
    
    
    console.log(obj)
    db.collection("Teachers")
    .add(obj)
    .then(function (response) { console.log(`object`)})
    .catch(function (error) {console.log("errr")});
    closeFormInput("cover-caption");
}

// get input  to add or edit
function getInfoTeacher() {
  function createId() {
    let tamp = "2003NA";
    for (let i = 0; i < 5; i++) {
      tamp += "" + Math.floor(Math.random() * 10);
    }
    return tamp;
  }

  var teacher = {};

   

  var myForm = document.querySelectorAll("#myForm .form-group");
  myForm.forEach((e) => {
    if (e.children[1] != undefined) {
      let name = e.children[1].name;
      teacher[name] = e.children[1].value;
    } else {
      let name = e.children[0].name;
      teacher[name] = e.children[0].value;
    }
  });


  const renderMuntilChoose= document.querySelector("#renderMuntilChoose");

  console.log(renderMuntilChoose);

  const subjectsAndClass =[];

  let i=0;
  while( renderMuntilChoose.children[i]!=undefined){

    if(renderMuntilChoose.children[i].children[0].children[0].checked==true ){

      
      let j =0;
      while(renderMuntilChoose.children[i].children[1].children[j] ){

        if( renderMuntilChoose.children[i].children[1].children[j].children[0].checked==true ){
          const tmp={
            class:renderMuntilChoose.children[i].children[0].children[0].value,
            subject :renderMuntilChoose.children[i].children[1].children[j].children[0].value
          }

          subjectsAndClass.push(tmp);
        }
        
        j++;
      }

    }

    i++;
  }

  teacher.subjectsAndClass=subjectsAndClass;
  



  console.log(type, "==================");
  if (type == true) {
    teacher.id = createId();
    console.log(teacher,"--------------");

    delete teacher.undefined;

    addTeacher(teacher);
  }

  if (type == false) {
    teacher.id = teacherEdit.id;
    delete teacher.undefined;
    console.log(teacherEdit.docId, teacher);
    editTeacher(teacherEdit.docId, teacher);
  }
}

function closeFormInput(idOfHtml) {
  teacherEdit = {};
    reNewForm();
    document.getElementById(idOfHtml).classList.add("hide");
}

function openFormInput(idOfHtml, teacher) {
  document.getElementById(idOfHtml).classList.remove("hide");

  console.log(teacher);
  if (teacher != "") {
    type = false;
    console.log(teacher);
    teacherEdit = teacher;

    

    var myForm = document.querySelectorAll("#myForm .form-group");


    myForm[0].children[1].setAttribute("value", teacher.name);
    myForm[1].children[0].value = teacher.group;
    myForm[2].children[0].value = teacher.gender;
    myForm[4].children[1].value = teacher.classLeader;
    myForm[5].children[1].setAttribute("value",teacher.address);
    myForm[6].children[1].setAttribute("value",teacher.dataOfBirth  );

    // giai lap co data

    const dataClassTeachSubjects= teacher.subjectsAndClass;

    
    // myForm[3].children[1].children[1].children[0].children[0] tung lop 1 
    // myForm[3].children[1].children[1].children[0].children[0].children[0] tung phhan chon 1 trong 1 lop
     // myForm[3].children[1].children[1].children[0].children[0].children[1].children[0]  input value trong 1 thành phan 
    // console.log(`object`,  myForm[3].children[1].children[1].children[0].children[1].children[0].children[0].value , );

  

    var i=0;

    var tmpForm=myForm[3].children[1].children[1];

   
    while( tmpForm.children[0].children[i]!=undefined ){

      
      // neu thang class dc chon thi di tiep tim nhung thang dc chon

      dataClassTeachSubjects.forEach( e=>{

        
        if( e.class== tmpForm.children[0].children[i].children[0].children[0].value){

          console.log(tmpForm.children[0].children[i].children[0].children[0].value);

          tmpForm.children[0].children[i].children[0].children[0].checked=true;

          let j=0;
          while( tmpForm.children[0].children[i].children[1].children[j]!=undefined ){
            if(e.class== tmpForm.children[0].children[i].children[0].children[0].value && e.subject== tmpForm.children[0].children[1].children[1].children[j].children[0].value){
              console.log(e.subject,'-----', myForm[3].children[1].children[1].children[0].children[1].children[1].children[j].children[0].value);
              tmpForm.children[0].children[i].children[1].children[j].children[0].checked=true;
            }
            j++;
          }

        } 

      })
      
      i++;
       
    }
  }
}

function reNewForm() {
  document.getElementById("myForm").reset();
  teacherEdit = {};
}

function mySubmitFunction(e) {
  e.preventDefault();

  getInfoTeacher();
}
