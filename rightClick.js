//right click menu
//import "../library/jquery.js";//only for developing
document.addEventListener('contextmenu',(event)=>{
    event.preventDefault;
    $('#rcMenu').show;
})
document.addEventListener('click',()=> $('rcMenu').hide);