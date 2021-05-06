const viewMonth = document.querySelector(".view-aweek");
const Notes = document.querySelectorAll(".noted");
const weekNow = document.querySelector(".week-now");
const viewDayInWeek = document.querySelector(".last");

function maxDay(month, year) {
  if (
    month == 12 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 1
  )
    return 31;
  if (month == 2) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      return 29;
    }
    return 28;
  }
  return 30;
}
function dayOfTheYear(day, month, year) {
  let sum = 0;
  for (let i = 1; i < month; i++) {
    sum += maxDay(i, year);
  }
  return sum + day;
}
function differentDays(date, date2) {
  let diff = Math.abs(
    dayOfTheYear(date.getDate(), date.getMonth() + 1, date.getFullYear()) -
      dayOfTheYear(date2.getDate(), date2.getMonth() + 1, date2.getFullYear())
  );
  if (date.getFullYear() == date2.getFullYear()) return diff;
  let sum = 0;
  let tempYear = date.getFullYear();
  let maxYear = dt.year;
  if (date.getFullYear() > date2.getFullYear()) {
    tempYear = date2.getFullYear();
    maxYear = date.getFullYear();
  }
  for (let i = maxYear; i > tempYear; i--) {
    sum += dayOfTheYear(31, 12, i);
  }
  return sum + diff - 1;
}

function getWeekNow(date) {
  console.log(parseInt(differentDays(new Date("5-3-2021"), date) / 7));
  console.log(parseInt(differentDays(new Date("5-3-2021"), date) / 7) + 1);
  return parseInt(differentDays(new Date("5-3-2021"), date) / 7) + 1;
}
function WeekNow() {
  let d = new Date();
  return (
    "Week " +
    getWeekNow(new Date()) +
    ", Month :" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
}
weekNow.innerText = WeekNow();

for (var i = 0; i < Notes.length; i++) {
  Notes[i].addEventListener("click", (e) => {
    e.preventDefault();
    console.log("chay");
    viewMonth.classList.add("open");
    console.log(viewMonth.classList);
  });
}
viewMonth.addEventListener("click", (e) => {
  e.preventDefault();
  if (viewMonth.classList.contains("open")) {
    viewMonth.classList.remove("open");
  }
});
function getTypeDay(zeller) {
  switch (zeller) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 0:
      return "Sun";
  }
}

renderWeek = (listStudents) => {
  console.log(listStudents);
  let viewDay = listStudents.map((student) => {
    if (getWeekNow(new Date()) == student.week) {
    }
  });
};
console.log(differentDays(new Date("5-3-2021"), new Date("5-10-2021")));
