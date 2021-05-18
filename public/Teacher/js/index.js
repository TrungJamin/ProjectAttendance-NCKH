window.addEventListener("scroll", (event) => {
  let nav = document.querySelector(".topbar");
  if (window.scrollY > 200) {
    nav.style.position = "fixed";
    nav.style.right = "0";
  } else {
    nav.style.position = "static";
  }
});
