//right click menu
//import $ from "../library/jquery.js";
//import * as ui from "../library/jquery-ui.js"

if (!$('#drag')[0].style) $('#drag')[0].setAttritube("style", "");

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    event.target.parentNode.appendChild($('#rcMenu')[0]);
    /* if (event.target.parentNode.id) {
        console.log($("#" + event.target.parentNode.id));
        $("#" + event.target.parentNode.id).draggable({ handle: "#drag" });
    } */
    if ($(event.target).hasClass('ui-draggable') || $(event.target.parentNode).hasClass('ui-draggable')) {
        $("#drag")[0].style.display = "";
    } else {
        $("#drag")[0].style.display = "none";
    }
    $('#rcMenu')[0].style.top = event.pageY - event.target.parentNode.offsetTop + 'px';
    $('#rcMenu')[0].style.left = event.pageX - event.target.parentNode.offsetLeft + 'px';
    console.log(event.target.parentNode.pageY);
    $('#rcMenu').show('quick');
    // console.log('aaa');
})
document.addEventListener('click', () => {
    /* if ($('#rcMenu')[0].parentNode.id) {
        $("#" + $('#rcMenu')[0].parentNode.id).draggable("destroy");
    } */
    $('#rcMenu').hide('quick');
    // console.log('bbb');
});

$(".drag").draggable({ handle: "#drag" });



logTime();

function logTime() {
    const event = new Date(window.Date());
    console.log('rightClick.js loaded at ' + event.toLocaleTimeString('zh-cn'));
}
