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
  return parseInt(differentDays(new Date("5-3-2021"), date) / 7) + 1;
}
