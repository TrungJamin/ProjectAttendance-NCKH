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
db.collection("Students").onSnapshot(async (snapShot) => {
  let changes = await snapShot.docChanges();
  await changes.forEach((change) => {
    // Edit data
    if (change.type == "modified") {
      let tr = document.getElementById(change.doc.id);
      // Mảng các phần tử "th" của "tr"
      let childrenOf_tr = tr.getElementsByTagName("td");
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
  document.querySelector(".loading-table").classList.add("d-none");
  document.querySelector(".table").classList.remove("hidden");
});
