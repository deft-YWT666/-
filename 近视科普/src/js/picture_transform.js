(function () {
    let container = document.getElementById("picture_container");
    let sidebar = document.getElementsByTagName("picture-sidebar")[0].shadowRoot;
    let aLabels = sidebar.querySelectorAll("a");

    // 根据参数展示图片
    let selected = window.selected;
    aLabels[selected].style.backgroundColor = "var(--side-bar-item-hover-color)";
    append(container, selected);

    // 添加点击事件
    for (let i = 0; i < aLabels.length; i++) {
        aLabels[i].index = i;
        aLabels[i].onclick = function () {
            location.href = "./pictures.html?page=" + this.index;
        }
    }
})();