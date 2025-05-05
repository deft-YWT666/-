let carouselTemp = document.createElement("template");

carouselTemp.innerHTML = `
    <link rel="stylesheet" href="./css/base/reset.css">
    <link rel="stylesheet" href="./css/base/default.css">
    <link rel="stylesheet" href="./css/carousel-image.css">
    
    <div id="carousel_container">
        <ul id="carousel_img_container">
        </ul>
        <div id="carousel_nav">
            <a href="javascript:"></a>
            <a href="javascript:"></a>
            <a href="javascript:"></a>
        </div>
    </div>
`;


(function () {
    class CarouselImage extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: "open"});
            let content = carouselTemp.content.cloneNode(true);

            // 获取外部img标签
            let carouselImage = document.getElementsByTagName("carousel-image")[0];
            let imgs = carouselImage.getElementsByTagName("img");
            let imgContainer = content.getElementById("carousel_img_container");

            // 复制第一个img标签用于补图
            let firstLi = document.createElement("li");
            let firstImg = imgs[0].cloneNode(true);
            firstLi.appendChild(firstImg);
            // 添加img
            while (imgs.length !== 0) {
                let li = document.createElement("li");
                li.appendChild(imgs[0]);
                imgContainer.appendChild(li);
            }
            imgContainer.appendChild(firstLi);

            shadow.appendChild(content);
        }
    }
    window.customElements.define("carousel-image", CarouselImage);


    // 移动动画函数
    let move = function (obj, attr, target, speed, callback) {
        clearInterval(obj.timer);

        let currentPosition = parseInt(getComputedStyle(obj, null)[attr]);
        // 判断方向，若当前位置在目标位置右边，则往左移
        speed = (currentPosition > target) ? -speed : speed;

        obj.timer = setInterval(function () {
            let position = parseInt(getComputedStyle(obj, null)[attr]);
            let newPosition = position + speed;

            // 边界柔和
            if ((speed < 0 && newPosition < target) || (speed > 0 && newPosition > target)) {
                newPosition = target;
            }
            obj.style[attr] = newPosition + "px";
            if (newPosition === target) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, speed);
    }

    // 添加轮播
    let mainColor = "#0466be";
    let distance = 493;

    let carousel = document.getElementsByTagName("carousel-image")[0].shadowRoot;

    let imgContainer = carousel.getElementById("carousel_img_container");
    let imgs = imgContainer.getElementsByTagName("img");

    let aContainer = carousel.getElementById("carousel_nav");
    let aLabels = aContainer.getElementsByTagName("a");

    // 默认选中第一个
    aLabels[0].style.backgroundColor = mainColor;
    let selected = 0;

    // 自动切换
    let autoChange = function () {
        let last = selected;
        selected = (selected + 1) % imgs.length;

        move(imgContainer, "left", -distance * selected, 20, function () {
            aLabels[last].style.backgroundColor = "";
            if (selected === imgs.length - 1) {
                selected = 0;
                imgContainer.style.left = 0 + "px";
            }
            aLabels[selected].style.backgroundColor = mainColor;
        });
    }
    let autoTimer = setInterval(autoChange, 3000);

    // 点击切换
    for (let i = 0; i < aLabels.length; i++) {
        aLabels[i].index = i;
        aLabels[i].onclick = function () {
            // 点击时清除自动播放计时器
            clearInterval(autoTimer);
            let index = this.index;
            // 更新按钮
            aLabels[selected].style.backgroundColor = "";
            selected = (index === imgs.length - 1) ? 0 : index;
            aLabels[selected].style.backgroundColor = mainColor;
            // 移动图片
            move(imgContainer, "left", -distance * index, 20, function () {
                autoTimer = setInterval(autoChange, 3000);
            });
        }
    }
})();


