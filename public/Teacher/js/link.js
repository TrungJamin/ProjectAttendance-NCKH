const linksDay = document.querySelector(".open-view-day");
const linksWeek = document.querySelector(".open-view-week");
const linksMonth  = document.querySelector(".open-view-month");
const tableAWeek = document.querySelector(".table-week");
const tableADay = document.querySelector(".table-day");
const tableAMonth = document.querySelector(".table-month");


linksDay.addEventListener("click", (e) => {
        e.preventDefault();
        const open = document.querySelectorAll(".open");
        open.forEach((op) => {
            console.log(op);
            op.classList.remove("open");
        });
        tableADay.classList.add("open");

});
linksWeek.addEventListener("click", (e) => {
    e.preventDefault();
    const open = document.querySelectorAll(".open");
    open.forEach((op) => {
        console.log(op);
        op.classList.remove("open");
    });
    tableAWeek.classList.add("open");

});
linksMonth.addEventListener("click", (e) => {
    e.preventDefault();
    const open = document.querySelectorAll(".open");
    open.forEach((op) => {
        console.log(op);
        op.classList.remove("open");
    });
    tableAMonth.classList.add("open");

});