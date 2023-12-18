import { docCookies } from "./library/cookies.js";

const colorInput = document.getElementById('color-input');
const fileInput = document.getElementById('file-input');
const hrefinput = doc.getElementById("href-input");
const bgOptionInputs = document.getElementsByName('bg-option');
const setBgBtn = document.getElementById('set-bg-btn');

// 读取cookie中的背景设置
let bgSetting = docCookies.getItem('bg-setting');
if (bgSetting) {
    bgSetting = JSON.parse(bgSetting);
    if (bgSetting.type === 'color') {
        document.body.style.backgroundColor = bgSetting.value;
        bgOptionInputs[0].checked = true;
    } else if(bgSetting.type === 'file') {
        document.body.style.backgroundImage = `url(${bgSetting.value})`;
        bgOptionInputs[1].checked = true;
    } else if(bgSetting.type === 'href') {
        document.body.style.backgroundImage = `url(${bgSetting.value})`;
        bgOptionInputs[2].checked = true;
    }
}

// 点击设置背景按钮时触发
setBgBtn.addEventListener('click', () => {
    let bgType;
    let bgValue;
    if (bgOptionInputs[0].checked) {
        bgType = 'color';
        bgValue = colorInput.value;
        document.body.style.backgroundColor = bgValue;
        document.body.style.backgroundImage = '';
        // 将背景设置存入cookie
        const bgSetting = { type: bgType, value: bgValue };
        docCookies.setItem('bg-setting', JSON.stringify(bgSetting), Infinity);
    } else if (bgOptionInputs[1].checked) {
        bgType = 'image';
        var reader = new FileReader();
        reader.onload = () => {
            bgValue = reader.result;
            document.body.style.backgroundImage = `url(${bgValue})`;
            document.body.style.backgroundColor = '';
            // 将背景设置存入cookie
            //docCookies.setItem('bg-img', bgValue, Infinity);
            const bgSetting = { type: bgType, value: reader.result };
            //console.log(JSON.stringify(bgSetting));
            docCookies.setItem('bg-setting', JSON.stringify(bgSetting), Infinity);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else if (bgOptionInputs[2].checked) {
        bgType = 'href'
        bgValue = hrefinput.value;
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = `url(${bgValue})`;
        // 将背景设置存入cookie
        const bgSetting = { type: bgType, value: bgValue };
        docCookies.setItem('bg-setting', JSON.stringify(bgSetting), Infinity);
    } else {
        console.log("Bg type unexpected!")    }
});
