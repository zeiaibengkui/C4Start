//search
//import "../library/jquery.js";
let searchTerm = $("#searchTerm")[0];

// 初始化搜索引擎
var SearchEnginesBox = $("ul#searchEngines")[0];//<ul>
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
var selectedEngine = 0;
if (localforage.getItem("sEngines")) {
    localforage.getItem("sEngines").then((value) => {
        sEngines = value;
        $("#searchSet-Engines")[0].innerHTML = sEngines;
    });
    localforage.getItem("sEngineNames").then((value) => {
        sEngineNames = value;
        $("#searchSet-Names")[0].innerHTML = sEngineNames;
    });//
    localforage.getItem("selectedEngine").then((value) => {
        selectedEngine = value - 0;
        $('#s-engine')[0].innerHTML = sEngineNames[selectedEngine];//button
        for (let i = 0; i < sEngines.length; i++) {
            let enginLi = document.createElement("li");
            let enginLitext = document.createTextNode(sEngineNames[i]);
            enginLi.appendChild(enginLitext);
            enginLi.setAttribute("data-num", (i + ""));
            enginLi.setAttribute("class", "dropdown-item");
            SearchEnginesBox.appendChild(enginLi);
            //console.log(enginLi);
            //really terrible
        }
    });
} else {
    if (!localforage.getItem("sEngines")) {
        console.log("no user search settings");
    }
}

//sEngine





// 初始化打开方式
var selectedTarget = localforage.getItem("selectedTarget");
if (selectedTarget) {
    $('#starget').value = selectedTarget;
}

//User Settings
document.getElementById("searchSet-btn").addEventListener("click", () => {
    sEngineNames = JSON.parse(document.getElementById("searchSet-Names").value);
    sEngines = JSON.parse(document.getElementById("searchSet-Engines").value);
    search(true);
    console.log(sEngines);
})

//选择搜索引擎
document.addEventListener("click", (e) => {
    //console.log(e.target.parentNode.id);
    if (e.target.parentNode.id == "searchEngines") {
        selectedEngine = e.target.getAttribute("data-num") - 0;
        document.getElementById("s-engine").innerHTML = e.target.innerHTML;
    }
});


function search(isPreparing) {
    //console.log("searh() - callback")
    let searchTerm = $('#searchTerm')[0].value;
    if (searchTerm) {

        // 获取用户选择的搜索引擎和打开方式
        selectedTarget = $('#starget').value;

        // 保存用户选择
        localforage.setItem("sEngines", /* JSON.stringify */(sEngines));
        localforage.setItem("sEngineNames", /* JSON.stringify */(sEngineNames));
        localforage.setItem("selectedEngine", selectedEngine);

        // 创建完整的搜索URL

        let searchURL = sEngines[selectedEngine].replace("%sw%", encodeURIComponent(searchTerm));
        //console.log(searchURL);

        // 在选定的打开方式下打开搜索URL
        if (!isPreparing) {
            window.open(searchURL, selectedTarget);
        }


    } else {
        if (!isPreparing) {
            window.alert("请输入搜索内容!");
        }

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

//search(true);