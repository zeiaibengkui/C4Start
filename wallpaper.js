


const colorInput = document.getElementById('color-input');
const fileInput = document.getElementById('file-input');
const hrefinput = document.getElementById("href-input");
const bgOptionInputs = document.getElementsByName('bg-option');
const setBgBtn = document.getElementById('set-bg-btn');
const bgSuccess = document.getElementById('bg-success');

// 读取cookie中的背景设置
let bgSetting = localStorage.getItem('bg-setting');
try {
    JSON.parse(bgSetting);
} catch (error) {
    bgSetting = null;
    localStorage.setItem('bg-setting', bgSetting);
    console.log("bg-setting json error:   " + error);
}
if (bgSetting) {
    bgSetting = JSON.parse(bgSetting);
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
}

// 点击设置背景按钮时触发
setBgBtn.addEventListener('click', () => {
    bgSuccess.style.color = "var(--bs-primary)";
    bgSuccess.innerHTML = "Loading";
    let bgType;
    let bgValue;
    if (bgOptionInputs[0].checked) {
        bgType = 'color';
        bgValue = colorInput.value;
        document.body.style.backgroundColor = bgValue;
        document.body.style.backgroundImage = '';
        // 将背景设置存入cookie
        const bgSetting = { type: bgType, value: bgValue };
        localStorage.setItem('bg-setting', JSON.stringify(bgSetting));
    } else if (bgOptionInputs[1].checked) {
        bgType = 'image';
        var reader = new FileReader();
        reader.onload = () => {
            bgValue = reader.result;
            document.body.style.backgroundImage = `url(${bgValue})`;
            document.body.style.backgroundColor = '';
            // 将背景设置存入cookie
            //localStorage.setItem('bg-img', bgValue);
            const bgSetting = { type: bgType, value: reader.result };
            //console.log(JSON.stringify(bgSetting));
            localStorage.setItem('bg-setting', JSON.stringify(bgSetting));
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else if (bgOptionInputs[2].checked) {
        bgType = 'href'
        bgValue = hrefinput.value;
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = `url(${bgValue})`;
        // 将背景设置存入cookie
        const bgSetting = { type: bgType, value: bgValue };
        localStorage.setItem('bg-setting', JSON.stringify(bgSetting));
    } else {
        console.log("Bg type unexpected!");
    }


    bgSuccess.style.color = "var(--bs-success)";
    bgSuccess.innerHTML = "OK!";

});