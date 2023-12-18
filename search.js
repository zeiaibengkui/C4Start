import {docCookies} from "./library/cookies.js";
// 初始化搜索引擎
var selectedEngine = docCookies.getItem("selectedEngine");
//console.log(selectedEngine);
if (selectedEngine) {
    document.getElementById('stool').value = selectedEngine;
}

// 初始化打开方式
var selectedTarget = docCookies.getItem("selectedTarget");
if (selectedTarget) {
    document.getElementById('starget').value = selectedTarget;
}


let searchTerm = document.getElementById("searchTerm");
let searchTermBg = document.querySelector(".searchTerm-bg");
let searchTermLable = document.querySelector('label[for="searchTerm"]');
function search() {
    //console.log("searh() 已触发")
    let searchTerm = document.getElementById('searchTerm').value;
    if (searchTerm) {

        // 获取用户选择的搜索引擎和打开方式
        
        selectedEngine = document.getElementById('stool').value;
        selectedTarget = document.getElementById('starget').value;

        // 保存用户选择到localStorage中
        docCookies.setItem("selectedEngine",selectedEngine,Infinity);
        docCookies.setItem("selectedTarget",selectedTarget,Infinity);

        // 创建完整的搜索URL
        let searchURL = selectedEngine + "" + encodeURIComponent(searchTerm);

        // 在选定的打开方式下打开搜索URL

        window.open(searchURL, selectedTarget);
    } else {
        window.alert("请输入搜索内容!")
    }
}

//触发搜索
document.querySelector(".sbutton").addEventListener("click", () => {
    search();
});
searchTerm.addEventListener("keyup", (e) => {
    //console.log("#searchTerm 输入了 " + e.code);
    if (e.code == "Enter" || e.code == "NumpadEnter") {
        search();
    }

});

//searchTerm自适应宽度
searchTerm.addEventListener("input", (() => {
    searchTermLable.innerHTML = searchTerm.value + "";
    let searchTermWdith = searchTermLable.clientWidth;
    //console.log(searchTermWdith);
    searchTerm.style.width = searchTermWdith + "px";
}))


