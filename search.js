//import { docCookies } from "../library/cookies.js";
let searchTerm = document.getElementById("searchTerm");//element

// 初始化搜索引擎
var sEngines = JSON.parse(localStorage.getItem("sEngines"));
var sEngineNames = JSON.parse(localStorage.getItem("sEngineNames"));//
var selectedEngine = localStorage.getItem("selectedEngine") - 0;
var SearchEnginesBox = document.querySelector("ul#searchEngines");//<ul>
if (!sEngines) {
    var sEngines = [
        "https://www.google.com/search?q=%sw%",
        "https://cn.bing.com/search?q=%sw%",
        "https://www.baidu.com/s?wd=%sw%"
    ]
    var sEngineNames = [
        "Google",
        "Bing",
        "Baidu"
    ]
    var selectedEngine = 0
}
document.getElementById('s-engine').innerHTML = sEngineNames[selectedEngine];//button

for (let i = 0; i < sEngines.length; i++) {
    let enginLi = document.createElement("li");
    let enginLitext = document.createTextNode(sEngineNames[i]);
    enginLi.appendChild(enginLitext);
    enginLi.setAttribute("data-num", (i + ""));
    enginLi.setAttribute("class","dropdown-item");
    SearchEnginesBox.appendChild(enginLi);
    console.log(enginLi);
}



// 初始化打开方式
var selectedTarget = localStorage.getItem("selectedTarget");
if (selectedTarget) {
    document.getElementById('starget').value = selectedTarget;
}



//选择搜索引擎
document.addEventListener("click", (e) => {
    //console.log(e.target.parentNode.id);
    if (e.target.parentNode.id == "searchEngines") {
        selectedEngine = e.target.getAttribute("data-num") - 0;
        document.getElementById("s-engine").innerHTML = e.target.innerHTML;
    }
});

function search() {
    //console.log("searh() 已触发")
    let searchTerm = document.getElementById('searchTerm').value;
    if (searchTerm) {

        // 获取用户选择的搜索引擎和打开方式
        selectedTarget = document.getElementById('starget').value;

        // 保存用户选择到cookie中
        localStorage.setItem("sEngines", JSON.stringify(sEngines));
        localStorage.setItem("sEngineNames", JSON.stringify(sEngineNames));
        localStorage.setItem("selectedEngine", selectedEngine);

        // 创建完整的搜索URL

        let searchURL = sEngines[selectedEngine].replace("%sw%", encodeURIComponent(searchTerm));
        //console.log(searchURL);

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
var searchTermLable = document.querySelector('label[for="searchTerm"]');
searchTerm.addEventListener("input", (() => {
    searchTermLable.innerHTML = searchTerm.value + "";
    let searchTermWdith = searchTermLable.clientWidth;
    //console.log(searchTermWdith);
    searchTerm.style.width = searchTermWdith + "px";
}))


