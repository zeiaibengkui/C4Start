//background
import "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js";

const colorInput = $('#color-input')[0];
const fileInput = $('#file-input')[0];
const hrefinput = $('#href-input')[0];
const bgOptionInputs = document.getElementsByName('bg-option');
const setBgBtn = $('#set-bg-btn');
const bgSuccess = $('#bg-success')[0];

// 读取背景设置
let bgSetting

localforage.getItem('bg-setting').then((result) => {
    bgSetting = JSON.parse(result);
    if (!bgSetting) {
        bgSetting = { type: "color", value: "#ffffff" };
        localforage.setItem('bg-setting', JSON.stringify(bgSetting));
    }
    if (!document.body.style) document.body.setAttribute(style, "");
    if (bgSetting.type === 'color') {
        document.body.style.backgroundColor = bgSetting.value;
        bgOptionInputs[0].checked = true;
    } else if (bgSetting.type === 'file') {
        document.body.style.backgroundImage = `url(${bgSetting.value})`;
        bgOptionInputs[1].checked = true;
    } else if (bgSetting.type === 'href') {
        document.body.style.backgroundImage = `url(${bgSetting.value})`;
        bgOptionInputs[2].checked = true;
        hrefinput.value = bgSetting.value;
    }
});






// 点击设置背景按钮时触发
setBgBtn.click(() => {
    bgSuccess.style.color = "var(--bs-primary)";
    bgSuccess.innerHTML = "Loading";
    let bgType;
    let bgValue;
    if (bgOptionInputs[0].checked) {
        bgType = 'color';
        bgValue = colorInput.value;
        document.body.style.backgroundColor = bgValue;
        document.body.style.backgroundImage = '';
        // 将背景设置存入
        bgSetting = { type: bgType, value: bgValue };
        localforage.setItem('bg-setting', JSON.stringify(bgSetting));
    } else if (bgOptionInputs[1].checked) {
        bgType = 'image';
        var reader = new FileReader();
        reader.onload = () => {
            bgValue = reader.result;
            document.body.style.backgroundImage = `url(${bgValue})`;
            document.body.style.backgroundColor = '';
            // 将背景设置存储
            //localforage.setItem('bg-img', bgValue);
            bgSetting = { type: bgType, value: reader.result };
            console.log((bgSetting));
            localforage.setItem('bg-setting', JSON.stringify(bgSetting));
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else if (bgOptionInputs[2].checked) {
        bgType = 'href'
        bgValue = hrefinput.value;
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = `url(${bgValue})`;
        // 将背景设置存入cookie
        bgSetting = { type: bgType, value: bgValue };
        localforage.setItem('bg-setting', JSON.stringify(bgSetting));
    } else {
        console.log("Bg type unexpected!");
    }


    bgSuccess.style.color = "var(--bs-success)";
    bgSuccess.innerHTML = "OK!";

});