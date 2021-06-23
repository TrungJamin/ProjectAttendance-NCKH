function getDateNow() {
  let d = new Date();
  let tmp = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
  return tmp;
}
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
  let maxYear = date2.getFullYear();
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
function doit(id, fn = "danh-sach-diem-danh", dl) {
  var elt = document.getElementById(id);
  var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
  return dl
    ? XLSX.write(wb, { bookType: ".xlsx", bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn + ".xlsx");
}

function getSemesterNow() {
  let d1 = new Date("5-3-2021");
  let d2 = new Date();
  var d1Y = d1.getFullYear();
  var d2Y = d2.getFullYear();
  var d1M = d1.getMonth();
  var d2M = d2.getMonth();
  if (d2M + 12 * d2Y - (d1M + 12 * d1Y) > 4) {
    return 2;
  }
  return 1;
}
function getSemester(week) {
  return week > 8 ? 2 : 1;
}
// ENTER NAME
function isAlphabetAndSpaces(event) {
  var VIETNAMESE_DIACRITIC_CHARACTERS =
    "ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ";
  var ch = String.fromCharCode(event.which);

  if (
    /[A-Za-z\s]/.test(ch) ||
    VIETNAMESE_DIACRITIC_CHARACTERS.toLocaleLowerCase().includes(
      ch.toLocaleLowerCase()
    )
  ) {
    document.getElementById("lblValue").style.display = "none";
  } else {
    document.getElementById("lblValue").style.display = "block";
    event.preventDefault();
  }
}

// ENTER PHONe NUMBER
function isNumber(event) {
  var ch = String.fromCharCode(event.which);
  if (!/[0-9]/.test(ch)) {
    document.getElementById("lblValue2").style.display = "block";
    event.preventDefault();
  } else {
    document.getElementById("lblValue2").style.display = "none";
  }
}
function replaceSpaceWithUnderline(string) {
  let arr = string.split(" ");
  arr = arr.filter((item) => item !== "");
  return arr.map((item) => item + "_").join("");
}
