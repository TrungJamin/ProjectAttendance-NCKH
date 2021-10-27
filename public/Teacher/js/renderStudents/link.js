const linksDay = document.querySelector(".open-view-day");
const linksWeek = document.querySelector(".open-view-week");
const linksMonth = document.querySelector(".open-view-month");
const linkSemester = document.querySelector(".open-view-semester");
const tableAWeek = document.querySelector(".table-week");
const tableADay = document.querySelector(".table-day");
const tableAMonth = document.querySelector(".table-month");
const tableSemester = document.querySelector(".table-semester");
linksDay.classList.add("active-link");
const activeDate = () => {
  const open = document.querySelectorAll(".open");
  open.forEach((op) => {
    op.classList.remove("open");
  });
  tableADay.classList.add("open");
  document.querySelector(".active-link").classList.remove("active-link");
  linksDay.classList.add("active-link");
};
linksDay.addEventListener("click", (e) => {
  e.preventDefault();
  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  renderDay(listStudents, day, month, year);
  activeDate();
});
linksWeek.addEventListener("click", (e) => {
  e.preventDefault();
  preW = 0;
  nextW = 0;

  renderWeek(listStudents);
  const open = document.querySelectorAll(".open");
  open.forEach((op) => {
    op.classList.remove("open");
  });
  tableAWeek.classList.add("open");
  document.querySelector(".active-link").classList.remove("active-link");
  linksWeek.classList.add("active-link");
});
linksMonth.addEventListener("click", (e) => {
  e.preventDefault();
  nYear = new Date().getFullYear();
  nMonth = new Date().getMonth()+1;
  monthNow.innerText = MonthNow();
  renderMonth(listStudents);
  const open = document.querySelectorAll(".open");
  open.forEach((op) => {
    op.classList.remove("open");
  });
  tableAMonth.classList.add("open");
  document.querySelector(".active-link").classList.remove("active-link");
  linksMonth.classList.add("active-link");
});
linkSemester.addEventListener("click", (e) => {
  e.preventDefault();
  pre = 0;
  next = 0;
  monthNow.innerText = MonthNow();
  renderSemester(listStudents);
  const open = document.querySelectorAll(".open");
  open.forEach((op) => {
    op.classList.remove("open");
  });
  tableSemester.classList.add("open");
  document.querySelector(".active-link").classList.remove("active-link");
  linkSemester.classList.add("active-link");
});
