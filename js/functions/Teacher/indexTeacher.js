



var db = firebase.firestore()

var dataAllTeacher=[];


    
    function renderAddElementInTable(e){

       
      

        let node=`  <tr role="row" class="odd ">
        <td class="text-center">${e.id}</td>
        <td class="text-center">${e.name}</td>
        <td class="text-center">${e.group}</td>
        <td class="text-center">${e.classTeach.toString()}</td>
        <td class="text-center">${e.subjectTeach.toString()}</td>
        <td class="text-center">${e.address}</td>
        <td class="text-center">${e.dataOfBirth}</td>
     
        </tr> `;

        var td=document.createElement("td");
        td.setAttribute("class","text-center");
        td.innerHTML=`<button type="button" class="btn btn-danger" onclick='deleteById("${e.docId}")' style=" color: white;">
        <i class="fas fa-trash-alt"  ></i>
        </button>`
        

        var btnEdit=document.createElement("button");
        btnEdit.setAttribute("class","btn btn-warning");
        btnEdit.setAttribute("style"," color: white;");
        btnEdit.innerHTML=' <i class="far fa-edit"></i>';
        btnEdit.addEventListener("click",()=>openFormInput("cover-caption", e ));
        td.append(btnEdit);
       
  
         
        

        var template = document.createElement('tr');
        node = node.trim(); 
        template.innerHTML = node;
        template.append(td);

        template.setAttribute("class","odd");
        template.setAttribute("role","row");

        // console.log(template);

        let list=document.querySelector("tbody");
        list.appendChild(template);
        // console.log(list); 

    }

     function renderTable(){
        db.collection("Teachers")
        .onSnapshot(  async function(querySnapshot) {
           
            var list=[];
            dataAllTeacher=[];
            await querySnapshot.forEach(function(doc) {
               let tamp=doc.data();
               tamp.docId=doc.id;
                dataAllTeacher.push(tamp);
                list.push(tamp);
            
            });
            
          let myNode=document.querySelector("tbody");
            myNode.innerHTML=" ";
          
            
            
            list.forEach( e=>renderAddElementInTable(e));
            
    
        });

        // wait1.then(e=>{
            
           
        // })
    }
   
    renderTable();

    function reLoadTable(value){
        
        document.getElementById(value).remove();
        let html=document.querySelector("tbody");
        html.innerHTML = '';
        dataAllTeacher.forEach( e=>renderAddElementInTable(e));
    
    }
   
  

{/* <button type="button" class="btn btn-danger" onclick='deleteById("${e.docId}")' style=" color: white;">
        <i class="fas fa-trash-alt"  ></i>
        </button> */}

  

      


    // find("nguyen khac chinh");