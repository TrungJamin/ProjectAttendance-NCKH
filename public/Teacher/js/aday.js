
const note = document.querySelector('.note');
const links = document.querySelectorAll('.alink');

for(var i = 0 ; i < links.length; i++){
    links[i].addEventListener("click",(e)=>{
        e.preventDefault();
    note.classList.add('open');
    console.log(note.classList);
   });
}
note.addEventListener('click', (e)=>{
    e.preventDefault();
    if(note.classList.contains("open")){
        note.classList.remove("open");
    }
});

