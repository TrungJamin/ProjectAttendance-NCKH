var list = document.querySelectorAll(".txt");
var form = document.querySelector(".form-group");
var tb = document.getElementById("displayThongBao");
var sumbit = document.querySelector(".btn-dangky");
var codes = [
  { id: "MTH254202102037", sub: "Toán Rời Rạc <gd1>" },
  { id: "CMUCS246202102005", sub: "Application" },
  { id: "CMUSE252202102002", sub: "Fc3" },
  { id: "CMUCS297202102010", sub: "Đồ Án CDIO" },
  { id: "CMUENG23020210200", sub: "AVCN2" },
  { id: "ES229202102002", sub: "ES229202102002" },
  { id: "PHI150202102010", sub: "triết" },
  { id: "PHI100202102004", sub: "Phương Pháp Luận" },
];

var subject = document.createElement("textarea");
subject.style.fontSize = "10pt";
subject.style.marginLeft = "100pt";
subject.style.marginBottom = "10pt";
var button = document.createElement("button");
button.textContent = "Ấn để nhập môn tiếp theo ";
button.setAttribute("Class", "btn btn-primary");
button.style.width = "15%";
button.style.height = "15%";

var back = document.createElement("button");
back.textContent = "Ấn để để quay lại môn trước";
back.style.width = "15%";
back.style.height = "15%";

var i = 0;
list[0].value = codes[0].id;
subject.textContent = codes[i].sub;
sumbit.addEventListener("click", (e) => {
  e.preventDefault();
  list[1].value = "";
});

back.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(i);
  if (i == 0) {
    i = codes.length - 1;
  }
  list[0].value = codes[--i].id;
  subject.textContent = codes[i].sub;
});
button.addEventListener("click", (e) => {
  e.preventDefault();
  list[0].value = codes[++i].id;
  subject.textContent = codes[i].sub;
  if (i == codes.length - 1) {
    i = 0;
  }
});
form.appendChild(button);
form.appendChild(back);
form.appendChild(subject);