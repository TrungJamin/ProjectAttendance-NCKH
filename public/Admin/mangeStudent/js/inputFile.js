
let initialStudent={

    address: "",
    class: "",
    dateOfBirth: "",
    gender: " ",
    id: "",
    firstName:'',
    lastName: " ",
    name: "",
    phone: "",

}

function createId() {
     
    let tamp = '' ;
    for (let i = 0; i < 5; i++) {
      tamp += "" + Math.floor(Math.random() * 10);
    }
    return tamp;
  }

  async function  addATeacher(obj){
   return    db
          .doc("Students/"+obj.id)
          .set(obj)
          .then(function (response) {
            console.log('oke')
        })
        .catch(function (error) {
            console.log('err')
        });
  }

 var listStudent=[];
 var input = document.getElementById('inputStudents')
  input.addEventListener('change', function() {
    readXlsxFile(input.files[0]).then( async function(e) {
      // `rows` is an array of rows
      // each row being an array of cells.
      console.log(e);

      for( let i =1 ; i<e.length; i++){
        let tampTeacher={};

        
        for( let j =0; j<e[0].length;j++){

            if(e[0][j]=='firstName' ){

                tampTeacher[e[0][j]]=e[i][j].split(' ');

            }
            else{
                if(e[0][j]=='dateOfBirth'){
                    var date=  new Date(e[i][j]);
                    if(date=='Invalid Date'){

                    }
                    else{
                        var date1=moment(date).format('DD/MM/YYYY');
                        tampTeacher[e[0][j]]= date1; 
                        
                      
                    }
                    
                }
                else{
                    tampTeacher[e[0][j]]= e[i][j]; 
                }
            }

 
        }
        tampTeacher.name=tampTeacher.firstName.join(' ').trim()+" "+tampTeacher.lastName.trim();
        tampTeacher.gender=tampTeacher.gender.toLowerCase();
        var id= "2019"+""+(tampTeacher.gender=='nam'?"1":"0")+tampTeacher.class.toUpperCase()+createId();
        tampTeacher.id=id;
        listStudent.push({...initialStudent,...tampTeacher});
           
      }
     
      console.log(listStudent);

      const result=await  listStudent.map( async (obj)=>{
        
           return db
            .doc("Students/"+obj.id)
            .set(obj)
            .then(function (response) {
            console.log('oke')
            })
            .catch(function (error) {
                console.log('err')
            });
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
