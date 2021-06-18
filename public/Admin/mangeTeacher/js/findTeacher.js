function renderAddElementInTableReload(){

    let node=`  <tr role="row" class="odd ">
    <td class="text-center"> </td>
    <td class="text-center"> </td>
    <td class="text-center"> </td>

    <td class="text-center">
    <button type="button" id="btnReLoad" class="btn btn-primary" onclick={reLoadTable(id)}>
    reload
    <i class="fas fa-sync-alt"></i>
    </button> </td>

    <td class="text-center"> </td>
    <td class="text-center"> </td>
    <td class="text-center"> </td>
    <td class="text-center"  > </i></i></td>
    </tr> `;

    var template = document.createElement('tr');
    node = node.trim(); 
    template.innerHTML = node;

    template.setAttribute("class","odd");
    template.setAttribute("role","row");

    console.log(template);

    let list=document.querySelector("tbody");
    list.appendChild(template);
    console.log(list); 

}

function findById(value){
    
    if(value.charAt(0)==" "||value.charAt(0)==""){
        renderTable();
    }
    else{

        let data=[];
        dataAllTeacher.forEach( e=>{

        if(e.id.search(value)>=0){
            data.push(e);
        }
        
        })
            let html=document.querySelector("tbody");
            html.innerHTML = '';
            data.forEach( e=>renderAddElementInTable(e));

            renderAddElementInTableReload()
    }
    
    


    // let data=[];
    // db
    //     .collection("Teachers").where("id", "==",value)
    //     .get()
    //     .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {

    //             console.log(doc.data());
    //                 data.push(doc.data());
    //         });

    //         let html=document.querySelector("tbody");
    //         html.innerHTML = '';
    //         data.forEach( e=>renderAddElementInTable(e));

            

    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
        
}

function findByName(value){

    if(value.charAt(0)==" "||value.charAt(0)==""){
        renderTable();
    }
    else{

        let data=[];
        dataAllTeacher.forEach( e=>{

        if(e.name.search(value)>=0){
            data.push(e);
        }
        
        })
            let html=document.querySelector("tbody");
            html.innerHTML = '';
            data.forEach( e=>renderAddElementInTable(e));

            renderAddElementInTableReload()
    }

    // let data=[];
    // db
    // .collection("Teachers").where("name", "==",value)
    // .get()
    // .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {

    //         console.log(doc.data());
    //             data.push(doc.data());
    //     });
    //     let html=document.querySelector("tbody");
    //         html.innerHTML = '';
    //         data.forEach( e=>renderAddElementInTable(e));

    // })
    // .catch(function (error) {
       
    // })
   
}

function findByGroup(value){


    if(value.charAt(0)==" "||value=="all"){

        renderTable();

    }
    else{

        let data=[];
        dataAllTeacher.forEach( e=>{
             
            if(e.group.search(value)>=0){
                data.push(e);
            }
            
         });
        
        
        
            let html=document.querySelector("tbody");
            html.innerHTML = '';
            data.forEach( e=>renderAddElementInTable(e));

            renderAddElementInTableReload();
    }

    // if(value!="all"){
    //     let data=[];
    //  db
    //     .collection("Teachers").where("group", "==",value)
    //     .get()
    //     .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {

    //             console.log(doc.data());
    //                 data.push(doc.data());
    //         });
    //         let html=document.querySelector("tbody");
    //             html.innerHTML = '';
    //             data.forEach( e=>renderAddElementInTable(e));

    //     })
    //     .catch(function (error) {
        
    //     })
    // }
    // else{
    //     let data=[];
    //     db
    //        .collection("Teachers")
    //        .get()
    //        .then(function (querySnapshot) {
    //            querySnapshot.forEach(function (doc) {
   
    //                console.log(doc.data());
    //                    data.push(doc.data());
    //            });
    //            let html=document.querySelector("tbody");
    //                html.innerHTML = '';
    //                data.forEach( e=>renderAddElementInTable(e));
   
    //        })
    //        .catch(function (error) {
           
    //        })

    // }


}


function findByClass(value){


    console.log(value);
    if(value.charAt(0)==" "||value.charAt(0)==""){
        renderTable();
    }
    else{

        let data=[];
        dataAllTeacher.forEach( e=>{
            
            e.classTeach.forEach( c=>{
            
                
            if(c.search(value)>=0){
                data.push(e);
            }
            
            });
        
        
        })
            let html=document.querySelector("tbody");
            html.innerHTML = '';
            data.forEach( e=>renderAddElementInTable(e));

            renderAddElementInTableReload();
    }

    // console.log(value);

    // let data=[];
    // db
    // .collection("Teachers").where("classTeach", "array-contains",value)
    // .get()
    // .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {

    //             console.log(doc.data(), doc.id);
    //             data.push(doc.data());
    //     });
    //     let html=document.querySelector("tbody");
    //         html.innerHTML = '';
    //         data.forEach( e=>renderAddElementInTable(e));
    //     console.log(data);
    // })
    // .catch(function (error) {
       
    // })
   
}


function findBySubject(value){


    console.log(value);
    if(value.charAt(0)==" "||value.charAt(0)==""){
        renderTable();
    }
    else{
        let data=[];
        dataAllTeacher.forEach( e=>{
            
            e.subjectTeach.forEach( c=>{
            
                
            if(c.search(value)>=0){
                data.push(e);
            }
            
            });
        })
            let html=document.querySelector("tbody");
            html.innerHTML = '';
            data.forEach( e=>renderAddElementInTable(e));

            renderAddElementInTableReload();
    }

}
