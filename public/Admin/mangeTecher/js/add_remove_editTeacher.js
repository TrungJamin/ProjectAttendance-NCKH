var type = true; // xac dinh kieu  (true )add or  (false)edit
var teacherEdit = {};
const typeAdd='Thêm giáo viên';
const typeEdit='Chỉnh sửa giáo viên';

var btnAddTeacher=document.querySelector("#addTeacher");
var spinnerAddTeacher=document.querySelector("#loadingAddTeacher");
// console.log(btnAddTeacher)
btnAddTeacher.addEventListener("click", () =>{
  openFormInput("cover-caption","");
  
} )

const isAccountExist = (email) => {
  let isAdmin = false;
  return db
    .collection("TeacherAdmin")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((teacher) => {
        if (teacher.data().email === email) {
          isAdmin = {
            isAdmin: true,
            id: teacher.id,
          };
          return;
        }
      });
      return isAdmin;
    })
    .catch(function (error) {
      return false;
    });
};

const setClassTeacherAdmin = (newLeader) => {
  const { classLeader, id, email } = newLeader;
  return db
    .collection("TeacherAdmin")
    .doc(id)
    .set({
      email: email,
      class: classLeader,
    })
    .then((res) => {
      // console.log("success");
    });
};

 
// render selectionClassLeader lop hoc
function getListClass() {

  console.log('run')
  db.collection("Classes")
    .get()
    .then(function (querySnapshot) {
      var arr = [];
      querySnapshot.forEach(function (doc) {
        var tamp = doc.data().classes;
        console.log(tamp)
        var gan = [];
        tamp.forEach((e) => {
          gan.push(e);
        });
        arr.push(gan);
        
      });


      // console.log("run -----")
      renderChooseClassLeader(arr);
       
      renderMuntilChoose(arr);
    })
    .catch(function (error) { console.log( error)});
}

getListClass();



// new code 
function renderMuntilChoose( listClass){

  // console.log("run")
  // console.log(`listClass`, listClass)
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
    "văn",
    "S.Học",
    "lý",
    "H.Học",
    "L.Sử",
    "Đ.lý",
    "N.Ngữ",
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
  var node = `<option value checked > chọn class leader</option> <option value=""> Không chủ nhiệm</option>`;
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
      // console.log("Document successfully written!");
      type = true;

      db.collection("TeacherAdmin")
      .doc(id)
      .set({class:obj.classLeader , email:obj.address}).then(res=>console.log(" "));

    })
    .catch(function (error) {
      // console.error("Error writing document: ", error);
    });
}

//// deleteById
function deleteById(id , name ) {
  // console.log(id);


  Swal.fire({
    position: 'top',
    title: 'Bạn có chắc xóa ?',
    text:` Giáo viên : ${name}-${id} ` ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'hủy',
    confirmButtonText: 'Xóa',
  }).then((result) => {
    if (result.isConfirmed) {
     Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'xóa thành công',
      showConfirmButton: false,
      timer: 500
    })

    db.collection("Teachers")
    .doc(id)
    .delete()
    .then(function () {
      // console.log("Document successfully deleted!");

      db.collection("TeacherAdmin")
      .doc(id)
      .delete();

    })
    .catch(function (error) {
      // console.error("Error removing document: ", error);
    });

    }
  })

  
  

 
}

// tao them form input de get data nhap cho phan nay
 function addTeacher(obj) {

  // kiểm tra xem email đã dd cấp account chưa 

  spinnerAddTeacher.classList.remove("d-none");
 
  if( obj.subjectsAndClass.length===0){
    alert("Thêm danh sách môn dạy");
  }
  else{

    firebase.auth().createUserWithEmailAndPassword( obj.address, "123456")
       .then(function (response) {
        // tạo 1 giáo viên 
         
          db.collection("Teachers").doc(response.user.uid)
          .set(obj)
          .then(function (response) {
            reNewForm();
             closeFormInput("cover-caption");
             spinnerAddTeacher.classList.add("d-none");
          })
          .catch(function (error) {console.log("errr")});
         
        // 
        if( obj.classLeader!==""){
          // make addmin
          const classLeader=obj.classLeader;
          const id=response.user.uid;
          let email=obj.address;
          setClassTeacherAdmin({ classLeader , id, email });
          
        }
       })
       .catch(function (error) {
          alert(" Nhập lại email !");
       });
       
      
  }
    
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

  // console.log(renderMuntilChoose);

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
  



  // console.log(type, "==================");
  if (type == true) {
    teacher.id = createId();
    // console.log(teacher,"--------------");

    delete teacher.undefined;
    teacher.name=converStringName(teacher.name);

    addTeacher(teacher);
  }

  if (type == false) {
    teacher.id = teacherEdit.id;
    delete teacher.undefined;
    // console.log(teacherEdit.docId, teacher);
    editTeacher(teacherEdit.docId, teacher);
  }
}

function closeFormInput(idOfHtml) {
  // console.log("huy edit form ")
  document.querySelector('#typeFormTeacher').innerHTML=typeAdd;
  teacherEdit = {};
  document.getElementById("myForm").reset(); 
    reNewForm();
    document.getElementById(idOfHtml).classList.add("hide");
    document.querySelector("#allViewPage").style.opacity="1"
}

function openFormInput(idOfHtml, teacher) {

  document.getElementById(idOfHtml).classList.remove("hide");
  document.querySelector("#allViewPage").style.opacity="0.2"


  // console.log(teacher);
  if (teacher != "") {
  document.querySelector('#typeFormTeacher').innerHTML=typeEdit;

    type = false;
    // console.log(teacher);
    teacherEdit = teacher;

    

    var myForm = document.querySelectorAll("#myForm .form-group");


    myForm[0].children[1].setAttribute("value", teacher.name);
    myForm[1].children[1].value = teacher.group;
    myForm[2].children[1].value = teacher.gender;
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


          tmpForm.children[0].children[i].children[0].children[0].checked=true;

          let j=0;
          while( tmpForm.children[0].children[i].children[1].children[j]!=undefined ){
            if(e.class== tmpForm.children[0].children[i].children[0].children[0].value && e.subject== tmpForm.children[0].children[1].children[1].children[j].children[0].value){
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
    var myForm = document.querySelectorAll("#myForm .form-group");
    myForm[0].children[1].setAttribute("value", "");
    myForm[5].children[1].setAttribute("value","");
    myForm[6].children[1].setAttribute("value","");
  document.getElementById("myForm").reset();
  teacherEdit = {};
}

function mySubmitFunction(e) {
  e.preventDefault();

  getInfoTeacher();
}
