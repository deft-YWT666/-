let picFolders = [
    "Earth",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Galaxy",
    "Nebula"
]
let picSizes = [31, 76, 91, 78, 100, 97, 83, 88, 64, 94];

// 瀑布流函数
function waterfall() {
    let container = $("#picture_container");
    let boxes = $("#picture_container .box");

    // 获取一列的宽度，计算列数
    let w = boxes.eq(0).outerWidth();
    let cols = Math.floor(container.width() / w);

    let boxHeights = [];
    boxes.each(function (i, element) {
        if (i < cols) { // 记录第一行的高度
            let h = $(element).outerHeight();
            boxHeights.push(h);
        } else {
            let minHeight = Math.min.apply(null, boxHeights);
            let minIndex = $.inArray(minHeight, boxHeights);

            // 使用absolute定位设置当前图片的位置
            // 以上一行的高度大小升序，填充当前行
            $(element).css({
                'position': 'absolute',
                'top': minHeight + 'px',
                'left': minIndex * w + 'px'
            });

            // 更新当前列的高度
            boxHeights[minIndex] += $(element).outerHeight();
        }
    });
    let maxHeight = Math.max.apply(null, boxHeights);
    container.height(maxHeight);
}

// 添加节点函数
function append(container, selected) {
    let folderName = picFolders[selected];
    let fileSize = picSizes[selected];
    for (let j = 1; j <= fileSize; j++) {
        let box = document.createElement("div");
        box.setAttribute("class", "box");

        box.innerHTML = `
            <div class="pic">
                <img alt="" src="./img/pictures/${folderName}/${folderName + j}.jpg">
            </div>
        `;

        container.appendChild(box);
    }
}

// 解析url参数
function parseUrl() {
    let parms = location.search;
    let result = parms.match(/[^?&]*=[^&]*/g);
    parms = {};
    for(let i in result){
        let temp = result[i].split('=');
        parms[temp[0]] = temp[1];
    }
    return parms;
}

window.onload = waterfall;
window.onresize = waterfall;
window.selected = parseUrl()["page"];