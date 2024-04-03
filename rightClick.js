//right click menu
//import $ from "../library/jquery.js";
//import * as ui from "../library/jquery-ui.js"

if (!$('#drag')[0].style) $('#drag')[0].setAttritube("style", "");

document.addEventListener('contextmenu', (event) => {
    /* if (event.target.parentNode.id) {
        console.log($("#" + event.target.parentNode.id));
        $("#" + event.target.parentNode.id).draggable({ handle: "#drag" });
    } */
    if (!(event.target.id === "rcMenu" || event.target.parentNode.id === "rcMenu")) {
        event.preventDefault();
        event.target.parentNode.appendChild($('#rcMenu')[0]);
        $('#rcMenu')[0].style.top = event.pageY - event.target.parentNode.offsetTop + 'px';
        $('#rcMenu')[0].style.left = event.pageX - event.target.parentNode.offsetLeft + 'px';
        if ($(event.target).hasClass('ui-draggable') || $(event.target.parentNode).hasClass('ui-draggable')) {
            $("#drag")[0].style.display = "";
        } else {
            $("#drag")[0].style.display = "none";
        }
        $('#rcMenu').show('quick');
    } else {
        //$('#rcMenu')[0].style.display = 'none';
        //$('#rcMenu').hide('quick');
    }

    //console.log(event.target.parentNode.pageY);
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

//auto save position
/* document.addEventListener("DOMContentLoaded", (event) => {
    localforage.getItem(key).then((value) => {
        if (value) { vl = value }
        else { localforage.setItem(key, vl); };
    })
});

window.addEventListener("beforeunload", (event) => {
    // Cancel the event as stated by the standard.
    //event.preventDefault();
    // Chrome requires returnValue to be set.
    //event.returnValue = "";
    localforage.setItem(key, vl);
}); */


logTime();

function logTime() {
    const event = new Date(window.Date());
    console.log('rightClick.js loaded at ' + event.toLocaleTimeString('zh-cn'));
}
