const ngay = document.getElementById("link-ngay");
const tuan = document.getElementById("link-tuan");
const thang = document.getElementById("link-thang");
const week = document.querySelector(".view-week");
const day = document.querySelector(".view-day");
const month = document.querySelector(".view-month");
const lists = document.querySelectorAll(".list");
console.log(lists);

ngay.addEventListener('click',(e)=>{
  e.preventDefault();
 
  lists[0].classList.add("chose");
  lists[1].classList.remove("chose");
  lists[2].classList.remove("chose");
  day.classList.remove("non_active");
  if(!week.classList.contains("non_active")){
    week.classList.add("non_active");
  }
  if(!month.classList.contains("non_active")){
    month.classList.add("non_active");
  }
});

thang.addEventListener('click',(e)=>{
    e.preventDefault();
    lists[0].classList.remove("chose");
    lists[1].classList.remove("chose");
    lists[2].classList.add("chose");
    month.classList.remove("non_active");
    if(!week.classList.contains("non_active")){
      week.classList.add("non_active");
    }
    if(!day.classList.contains("non_active")){
      day.classList.add("non_active");
    }
  });

  tuan.addEventListener('click',(e)=>{
    e.preventDefault();
   
    lists[0].classList.remove("chose");
    lists[1].classList.add("chose");
    lists[2].classList.remove("chose");
    week.classList.remove("non_active");
    if(!day.classList.contains("non_active")){
      day.classList.add("non_active");
    }
    if(!month.classList.contains("non_active")){
      month.classList.add("non_active");
    }
  });