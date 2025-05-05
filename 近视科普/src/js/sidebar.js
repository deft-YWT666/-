let sideBarTemp = document.createElement("template");

sideBarTemp.innerHTML = `
    <link rel="stylesheet" href="./css/base/reset.css">
    <link rel="stylesheet" href="./css/base/default.css">
    <link rel="stylesheet" href="./css/sidebar.css">

    <div id="side_bar">
        <span id="side_bar_title">导航</span>
        <ul id="side_bar_list">
        </ul>
    </div>
`;

(function () {
    class SideBar extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: "open"});
            let content = sideBarTemp.content;

            // 获取host下的a标签
            let sideBar = document.getElementsByTagName("side-bar")[0];
            let aLabels = sideBar.getElementsByTagName("a");
            // 外部操作Shadow树则使用host对象的shadowRoot属性获取
            // let shadowRoot = sideBar.shadowRoot;

            // 添加a标签到sideBarList
            let sideBarList = content.getElementById("side_bar_list");
            while (aLabels.length !== 0) {
                let sideBarItem = document.createElement("li");
                sideBarItem.setAttribute("class", "side_bar_item");
                sideBarItem.appendChild(aLabels[0]);
                sideBarList.appendChild(sideBarItem);
            }

            shadow.appendChild(content);
        }
    }
    window.customElements.define("side-bar", SideBar);
})();


// 添加滚动粘滞，必须在加载完之后添加，否则获取的offsetTop不准
window.addEventListener("load", function () {
    // 计算不包含marginTop的偏移量
    let container = document.getElementById("view_container");
    let styleOfContainer = getComputedStyle(container);
    let marginTop = parseInt(styleOfContainer.marginTop);
    // offsetTop包含marginTop，将marginTop减去
    let offsetTop = container.offsetTop - marginTop;

    let fixedOffset = marginTop;
    let shadowRoot = document.getElementsByTagName("side-bar")[0].shadowRoot;
    let sidebar = shadowRoot.getElementById("side_bar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > offsetTop) {
            sidebar.style.position = "fixed";
            sidebar.style.top = fixedOffset + "px";
        } else {
            sidebar.style.position = "static";
        }
    });
});