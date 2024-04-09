//right click menu
//import $ from "../library/jquery.js";
//import * as ui from "../library/jquery-ui.js"


"use strict"; (() => {
    if (!$('#drag')[0].style) $('#drag')[0].setAttritube("style", "");

    document.addEventListener('contextmenu', (event) => {
        /* if (event.target.parentNode.id) {
            console.log($("#" + event.target.parentNode.id));
            $("#" + event.target.parentNode.id).draggable({ handle: "#drag" });
        } */
        if (!(event.target.id === "rcMenu" || event.target.parentNode.id === "rcMenu")) {
            event.preventDefault();
            event.target.parentNode.appendChild($('#rcMenu')[0]);
            $('#rcMenu')[0].style.top = event.pageY/*  - event.target.offsetTop */ + 'px';
            $('#rcMenu')[0].style.left = event.pageX/*  - event.target.parentNode.offsetLeft */ + 'px';
            /* console.log(event.target.parentNode.offsetTop);
            console.log(event.target.parentNode);
            console.log($('#rcMenu')[0].offsetParent); */
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

    var autoSavePosition = async () => {
        for (var i = 0; i < $(".drag").length; i++) {
            if (!$(".drag")[i].getAttribute('style')) $(".drag")[i].setAttribute('style', '');
            var key = $(".drag")[i].id;
            /* var position = $('#' + key).position();
            var top = position.top;
            var left = position.left; */
            console.log(`key:${key}`);
            await localforage.getItem('DragPosition - ' + key).then((value) => {
                if (value) {
                    console.log(value.top);
                    console.log(i);
                    console.log($(".drag")[i]);
                    $(".drag")[i].style.top = value.top;
                    $(".drag")[i].style.left = value.left;
                }
                else { /* localforage.setItem(key, $(".drag")[i].style); */ };
            })
        }
        return;
    }
    autoSavePosition();


    window.addEventListener("beforeunload", (event) => {
        // Cancel the event as stated by the standard.
        //event.preventDefault();
        // Chrome requires returnValue to be set.
        //event.returnValue = "";
        for (var i = 0; i < $(".drag").length; i++) {
            var key = $(".drag")[i].id;
            if ($(".drag")[i].style.top && $(".drag")[i].style.left) {
                var position = {
                    top: $(".drag")[i].style.top,
                    left: $(".drag")[i].style.left
                }
            }
            localforage.setItem('DragPosition - ' + key, position);
        }
    });



    logTime();

    function logTime() {
        const event = new Date(window.Date());
        console.log('rightClick.js loaded at ' + event.toLocaleTimeString('zh-cn'));
    }
})();