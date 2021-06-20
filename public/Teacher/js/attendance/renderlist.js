const List = document.querySelector('.bodyList');
function getAttendanceOfDay(attendances, date, id) {
    let attendance = {};
    attendance = attendances.find((att) => {
      return att.day == date;
    });
    return attendance;
}
function getDate(day, month, year) {
    let tmp;
    if (day < 10) tmp = month + "-0" + day + "-" + year;
    else tmp = month + "-" + day + "-" + year;
    return tmp;
  }

let listStudents;
function getStudents(className) {
    db.collection("Students").onSnapshot(async (snapshots) => {
      listStudents = [];
      await snapshots.forEach((snapshot) => {
        let student = snapshot.data();
        if (student.class == className) {
          db.collection(`Students`)
            .doc(snapshot.id)
            .collection("attendance")
            .onSnapshot((snapshots) => {
              let attendance = [];
              snapshots.forEach((doc) => {
                attendance.push({
                  day: doc.id,
                  data: doc.data(),
                });
              });
              listStudents.push({ ...student, attendance: attendance });
            });
        }
      });
    });
    setTimeout(() => {
      renderDatabase(listStudents);
     
    }, 2000);
  }
  
  function renderDatabase(listStudents) {
    List.innerHTML = "";
    listStudents.map((student,index)=>{
        let att = getAttendanceOfDay(student.attendance, getDate(new Date().getDate(),new Date().getMonth() + 1,new Date().getFullYear()));
        console.log(att);
        const tr = document.createElement("tr");
        const content = `
        <td>${index + 1}</td>
        <td>${student.id}</td>
        <td>${String(student.firstName).replaceAll(",", " ")}</td>
        <td>${student.lastName}</td>
        <td></td>
        <td>""</td>
        `;
    
        tr.innerHTML = content;
        List.append(tr);
    })


  }
  