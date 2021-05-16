// const ngay = document.getElementById("link-ngay");
// const tuan = document.getElementById("link-tuan");
// const thang = document.getElementById("link-thang");
// const week = document.querySelector(".view-week");
// const day = document.querySelector(".view-day");
// const month = document.querySelector(".view-month");
// const lists = document.querySelectorAll(".list");

// ngay.addEventListener("click", (e) => {
//   e.preventDefault();

//   lists[0].classList.add("chose");
//   lists[1].classList.remove("chose");
//   lists[2].classList.remove("chose");
//   day.classList.remove("non_active");
//   if (!week.classList.contains("non_active")) {
//     week.classList.add("non_active");
//   }
//   if (!month.classList.contains("non_active")) {
//     month.classList.add("non_active");
//   }
// });

// thang.addEventListener("click", (e) => {
//   e.preventDefault();
//   lists[0].classList.remove("chose");
//   lists[1].classList.remove("chose");
//   lists[2].classList.add("chose");
//   month.classList.remove("non_active");
//   if (!week.classList.contains("non_active")) {
//     week.classList.add("non_active");
//   }
//   if (!day.classList.contains("non_active")) {
//     day.classList.add("non_active");
//   }
// });

// tuan.addEventListener("click", (e) => {
//   e.preventDefault();

//   lists[0].classList.remove("chose");
//   lists[1].classList.add("chose");
//   lists[2].classList.remove("chose");
//   week.classList.remove("non_active");
//   if (!day.classList.contains("non_active")) {
//     day.classList.add("non_active");
//   }
//   if (!month.classList.contains("non_active")) {
//     month.classList.add("non_active");
//   }
// });


// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // location.assign("./../screen/HompageTeacher.html");
//   } else {
//     location.assign("./public");
//   }
// });
for (let i = 3; i <= 31; i++) {
    let student = {
      firstName: "Nguyen Van ",
      lastName: "Anh",
      name: "Nguyen Van Anh",
      address: "Quang Tri",
      dateOfBirth: "2004-05-19",
      gender: "male",
      id: i + "2001",
      phone: "0848492852",
      class: "10A1",
    };
    db.collection("Students")
      .add(student)
      .then(() => {
        console.log("add success");
      });
  }