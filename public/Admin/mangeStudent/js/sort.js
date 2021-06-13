function sortAtoZ() {
  if (listOfStudent.length > 0) {
    listOfStudent.sort((student1, student2) => {
      return getLastName(student1.name) - getLastName(student2.name);
    });
    setList(listOfStudent);
  }
}

function sortZtoA() {
  if (listOfStudent.length > 0) {
    listOfStudent.sort((student1, student2) => {
      console.log(getLastName(student2.name));
      return getLastName(student2.name) - getLastName(student1.name);
    });
    setList(listOfStudent);
  }
}
function getLastName(name) {
  let temp = name.split(" ");
  console.log("temp", temp[temp.length - 1].toLowerCase());
  console.log(temp[temp.length - 1].toLowerCase().charCodeAt(0));
  return temp[temp.length - 1].toLowerCase().charCodeAt(0);
}
