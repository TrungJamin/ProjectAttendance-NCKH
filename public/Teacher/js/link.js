const linksDay = document.querySelector(".open-view-day");
const linksWeek = document.querySelector(".open-view-week");
const linksMonth  = document.querySelector(".open-view-month");
const tableAWeek = document.querySelector(".table-week");
const tableADay = document.querySelector(".table-day");
const tableAMonth = document.querySelector(".table-month");


linksDay.addEventListener("click", (e) => {
        e.preventDefault();
        day = new Date().getDate();
        month = new Date().getMonth() + 1;
        year = new Date().getFullYear();
        renderDay(listStudents,day, month, year);
        const open = document.querySelectorAll(".open");
        open.forEach((op) => {
           
            op.classList.remove("open");
        });
        tableADay.classList.add("open");

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

});
linksMonth.addEventListener("click", (e) => {
    e.preventDefault();
    pre = 0;
    next = 0;
    monthNow.innerText = MonthNow();
    renderMonth(listStudents);
    const open = document.querySelectorAll(".open");
    open.forEach((op) => {
    
        op.classList.remove("open");
    });
    tableAMonth.classList.add("open");

});