// onSnapShow se luon chay dau tien

function indexOf(id) {
  let index = 0;
  for (const i of listOfStudent) {
    if (id === i.id) {
      return index;
    }
    index++;
  }
  return -1;
}

// onSnapshot ( - onSnapshot se chay cuoi cung)
db.collection("Students2").onSnapshot((snapShot) => {
  let changes = snapShot.docChanges();
  changes.forEach((change) => {
    // Edit data
    if (change.type == "modified") {
      console.log("RUN modified");
      console.log(change.doc.id, change.doc.data());
      let tr = document.getElementById(change.doc.id);
      console.log(change.doc.id);
      // tr.innerHTML = " ";
      // tr.innerHTML = `
      //   <td> 1 </td>
      //   <td>${change.doc.data().id} </td>
      //   <td>${change.doc.data().name} </td>
      //   <td>${change.doc.data().dateOfBirth} </td>
      //   <td>${change.doc.data().gender} </td>
      //   <td>${change.doc.data().class} </td>
      //   <td>${change.doc.data().address} </td>
      //   <td>${change.doc.data().phone} </td>

      // `;
      // console.log(tr);
      // let student = change.doc.data();
      // let index = indexOf(student.id);
      // listOfStudent[index] = student;

      // Mảng các phần tử "th" của "tr"
      let childrenOf_tr = tr.getElementsByTagName("td");
      /* let childrenOf_body = body_table.getElementsByTagName("tr");
      console.log(childrenOf_body[0].getElementsByTagName("td")[0].textContent); */

      // thay đổi nội dung của các phần tư "th" của tr
      childrenOf_tr[1].textContent = change.doc.data().id;
      childrenOf_tr[2].textContent = change.doc.data().name;
      childrenOf_tr[3].textContent = change.doc.data().dateOfBirth;
      childrenOf_tr[4].textContent = change.doc.data().gender;
      childrenOf_tr[5].textContent = change.doc.data().class;
      childrenOf_tr[6].textContent = change.doc.data().address;
      childrenOf_tr[7].textContent = change.doc.data().phone;
    }

    if (change.type === "added") {
      listOfStudent.push(change.doc.data());
      setList(listOfStudent);
    } else if (change.type === "removed") {
      //
      const index = indexOf(change.doc.data().id); // DUng ham FIND
      if (index > -1) {
        // Nếu element vừa xóa có id trong listSubject thì xóa luôn phần tử đó trong listOfSubject
        listOfStudent.splice(index, 1);
      }

      let tr = document.getElementById(change.doc.id);
      body_table.removeChild(tr);
    }
  });
  setOrdinalNumbers();

  // LOADING TABLE
  document.getElementById("loading-gift").classList.add("hidden");
  document.getElementById("dataTable").classList.remove("hidden");
});
