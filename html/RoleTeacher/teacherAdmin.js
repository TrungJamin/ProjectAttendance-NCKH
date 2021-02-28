const userID = "pQdWiTa9LFgOuJWVHKxReRju6I43";

const tableOfStudent = document.querySelector("#body-table");
db.collection("TeacherAdmin")
  .doc(userID)
  .get()
  .then(function (info) {
    console.log("chay");
    getListStudents(info.data().classLeader);
  })
  .catch(function (error) {});
getListStudents = (Class) => {
  console.log("chay");
  db.collection("Students2")
    .onSnapshot(function (querySnapshot) {
      console.log("chay");
      querySnapshot.forEach(function (doc) {
        if (doc.data().class == Class) {
          let student = {
            data: doc.data(),
            id: doc.id,
          };
          ListStudents.push(student);
        }
      });
      render(ListStudents);
    })
    .catch(function (error) {});
};
render = (ListStudents) => {
  let list = ListStudents.forEach((student) => {
    let rows = `<td id="${student.id}">1</td>
      <td>${student.data.id}</td>
      <td>${student.data.name}</td>
      <td>${student.data.dateOfBirth}</td>
      <td>${student.data.gender}</td>
      <td>${student.data.class}</td>
      <td>${student.data.address}</td>
      <td>${student.data.phone}</td>
      <td>
      <input type="checkbox" id="${student.id}" >
      </td>
      <td>
      <input type="checkbox" id="${student.data.id}" >
      </td>
        `;
    tableOfStudent.insertAdjacentHTML("beforeend", rows);

    let status = document.querySelector(`#${student.id}`);
    let request = document.querySelector(`#s${student.data.id}`);
    status.checked = true;
    request .checked = false;
    console.log(student);
    // console.log(checkbox);
  });
};
var ListStudents = [];
