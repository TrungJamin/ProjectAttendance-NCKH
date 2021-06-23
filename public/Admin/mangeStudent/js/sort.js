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
      return getLastName(student2.name) - getLastName(student1.name);
    });
    setList(listOfStudent);
  }
}
function getLastName(name) {
  let temp = name.split(" ");
  return temp[temp.length - 1].toLowerCase().charCodeAt(0);
}
