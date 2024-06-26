"use strict";
(function () {
    //search 
    //import "../library/jquery.js";  //only when coding

    function save() {
        // 保存用户选择
        localforage.setItem("sEngines", /* JSON.stringify */(sEngines));
        localforage.setItem("sEngineNames", /* JSON.stringify */(sEngineNames));
        localforage.setItem("selectedEngine", selectedEngine);
    }

    let searchTerm = $("#searchTerm")[0];

    // 初始化搜索引擎
    var SearchEnginesBox = $("ul#searchEngines")[0]; //<ul>
    var sEngines = [
        "https://www.google.com/search?q=%sw%",
        "https://cn.bing.com/search?q=%sw%",
        "https://www.baidu.com/s?wd=%sw%"
    ];
    var sEngineNames = [
        "Google",
        "Bing",
        "Baidu"
    ];
    var selectedEngine = 1;
    localforage.getItem("sEngineNames").then((value) => {
        if (value) {
            sEngineNames = value;
        }
        $("#searchSet-Names")[0].innerHTML = JSON.stringify(sEngineNames);
    });
    localforage.getItem("sEngines").then((value) => {
        if (value) {
            sEngines = value;
        }
        $("#searchSet-Engines")[0].innerHTML = JSON.stringify(sEngines);
        for (let i = 0; i < sEngines.length; i++) {
            let enginLi = document.createElement("li");
            let enginLitext = document.createTextNode(sEngineNames[i]);
            enginLi.appendChild(enginLitext);
            enginLi.setAttribute("data-num", (i + ""));
            enginLi.setAttribute("class", "dropdown-item");
            //SearchEnginesBox.appendChild(enginLi);
            $(enginLi).insertBefore('#searchEngines li:has(hr)');
            //console.log(enginLi);
            //really terrible
        }
    });

    localforage.getItem("selectedEngine").then((value) => {
        if (value) {
            selectedEngine = value - 0;
        }
        $('#s-engine')[0].innerHTML = sEngineNames[selectedEngine]; //button
    });


    // 初始化打开方式
    var selectedTarget = localforage.getItem("selectedTarget");
    if (selectedTarget) {
        $('#starget').value = selectedTarget;
    }

    //User Settings
    document.getElementById("searchSet-btn").addEventListener("click", () => {
        sEngineNames = JSON.parse(document.getElementById("searchSet-Names").value);
        sEngines = JSON.parse(document.getElementById("searchSet-Engines").value);
        save();
        //console.log(sEngines);
    });
    $('#addSearchEngine').on('click', async () => {
        let name = await swal("Name:", { content: "input", });
        sEngineNames[sEngineNames.length] = name;
        let url = await swal("URL: (Replace the word with '%sw%')", { content: "input", });
        sEngines[sEngines.length] = url.replace("%25sw%25","%sw%");
        save();
    })

    //选择搜索引擎
    SearchEnginesBox.addEventListener("click", (e) => {
        //console.log(e.target.parentNode.id);
        if (e.target.parentNode.id === "searchEngines" && e.target.getAttribute('data-num')) {
            selectedEngine = e.target.getAttribute("data-num") - 0;
            document.getElementById("s-engine").innerHTML = e.target.innerHTML;
        }
    });


    function search() {
        //console.log("searh() - callback")
        let searchTerm = $('#searchTerm')[0].value;
        if (searchTerm) {

            // 获取用户选择的搜索引擎和打开方式
            selectedTarget = $('#starget').value;

            // 创建完整的搜索URL
            let searchURL = sEngines[selectedEngine].replace("%sw%", encodeURIComponent(searchTerm));

            //console.log(searchURL);
            // 在选定的打开方式下打开搜索URL
            window.open(searchURL, selectedTarget);

        } else {
            window.alert("请输入搜索内容!");
        }
    }

    //触发搜索
    $(".sbutton").on("click", () => {
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
    }));


    //logTime();

    function logTime() {
        const event = new Date(window.Date());
        console.log('search.js loaded at ' + event.toLocaleTimeString('it-IT'));
    }
})();