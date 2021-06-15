 
 // import for teacher

 var inititalTeacher={
    classLeader: "",
    dataOfBirth: "",
    email: "",
    gender: "",
    group: "",
    id: "",
    name: "",
    subjectsAndClass: []
 }

 function createId(year ) {
     
    let tamp = year+"NA" ;
    for (let i = 0; i < 5; i++) {
      tamp += "" + Math.floor(Math.random() * 10);
    }
    return tamp;
  }

 async function addATeacher(obj){
    return  db
        .collection("listTeacherTest")
        .add(obj)
        .then(function (response) {
            console.log('oke')
        })
        .catch(function (error) {
            console.log('err')
        });
  }

 var listTeacher=[];
 var input = document.getElementById('inputTeacher')
  input.addEventListener('change', function() {
    readXlsxFile(input.files[0]).then( async function(e) {
      // `rows` is an array of rows
      // each row being an array of cells.

      for( var i =1 ; i<e.length; i++){
        let tampTeacher={};

        for( let j =0; j<e[0].length;j++){

            if(e[0][j]=='gender'){

             try {
                 let check =e[i][j].toLowerCase()=='nam' ? 'true' :'false';
                tampTeacher[e[0][j]]=check;
             } catch (error) {
                tampTeacher[e[0][j]]='true'
             }
                    
                
                
            }
            else{

                if(e[0][j]=='dataOfBirth'){
                    var date=  new Date(e[i][j]);
                    if(date=='Invalid Date'){

                    }
                    else{
                        var date1=moment(date).format('YYYY-MM-DD');
                        tampTeacher[e[0][j]]= date1; 
                        
                        tampTeacher.id=createId( (new Date().getFullYear()) +"0"+date.getMonth());
                    }
                    
                }
                else{
                     
                    try {
                        tampTeacher[e[0][j]]= e[i][j]; 
                    } catch (error) {
                        tampTeacher[e[0][j]]='';
                    }
                    
                    
                }
            }

            
        }
        listTeacher.push({...inititalTeacher,...tampTeacher});
           
      }
     
      console.log(listTeacher);

      const result= await listTeacher.map( e=>{
              addATeacher(e);
      })


      let timerInterval
    Swal.fire({
      title: 'Đang tải dữ liệu từ file lên',
      html: 'Vui lòng chờ....',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();

        Promise.all(result).then(e=>{
            Swal.close()
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: `File có ${listStudent.length} học sinh đã thêm thành công ${listStudent.length} `,
                showConfirmButton: true,
              })
        });

      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

     
   


    })
  });


 