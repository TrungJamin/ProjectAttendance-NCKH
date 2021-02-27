// ENTER NAME
function isAlphabetAndSpaces(event) {
  var VIETNAMESE_DIACRITIC_CHARACTERS =
    "ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ";
  var ch = String.fromCharCode(event.which);
  console.log(event.which);
  console.log(ch);
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
  console.log(event.which);
  console.log(ch);
  if (!/[0-9]/.test(ch)) {
    document.getElementById("lblValue2").style.display = "block";
    event.preventDefault();
  } else {
    document.getElementById("lblValue2").style.display = "none";
  }
}
