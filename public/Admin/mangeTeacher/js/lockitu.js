function firstCharUpperCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }
 

 function convertString(str){
     return str.replace(/\s+/g,' ').trim();
 }

 function converStringName(str){
    return firstCharUpperCase( convertString(str) );
 }


 function filterCharName(str,id){
    const input =document.getElementById(id);
    
    input.value=str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');;

 }

 function filterCharEmail(str,id){
    const input =document.getElementById(id);
    
    input.value=str.replace(/\s+/g,' ').trim();;

 }