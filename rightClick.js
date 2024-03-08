//right click menu
//import "../library/jquery.js";//only for developing
//import "../library/jquery-ui.js";
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    $('#rcMenu')[0].style.top = event.pageY + 'px';
    $('#rcMenu')[0].style.left = event.pageX + 'px';
    $('#rcMenu').show('quick');
    // console.log('aaa');
})
document.addEventListener('click', () => {
    $('#rcMenu').hide('quick');
    // console.log('bbb');
});
$('#drag').draggable();