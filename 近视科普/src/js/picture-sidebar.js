let pictureSideBarTemp = document.createElement("template");

pictureSideBarTemp.innerHTML = `
    <link rel="stylesheet" href="./css/base/reset.css">
    <link rel="stylesheet" href="./css/base/default.css">
    <link rel="stylesheet" href="./css/sidebar.css">

    <div id="picture_sidebar">
        <span id="side_bar_title">导航</span>
        <ul id="side_bar_list">
            <li class="side_bar_item"><a href="javascript:">关于我们</a></li> 
            
        </ul>
    </div>
`;

(function () {
    class PictureSideBar extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: "open"});
            let content = pictureSideBarTemp.content;

            shadow.appendChild(content);
        }
    }
    window.customElements.define("picture-sidebar", PictureSideBar);
})();


// 添加滚动粘滞，必须在加载完之后添加，否则获取的offsetTop不准
window.addEventListener("load", function () {
    // 计算不包含marginTop的偏移量
    let container = document.getElementById("picture_view_container");
    let styleOfContainer = getComputedStyle(container);
    let marginTop = parseInt(styleOfContainer.marginTop);
    // offsetTop包含marginTop，将marginTop减去
    let offsetTop = container.offsetTop - marginTop;

    let fixedOffset = marginTop;
    let shadowRoot = document.getElementsByTagName("picture-sidebar")[0].shadowRoot;
    let sidebar = shadowRoot.getElementById("picture_sidebar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > offsetTop) {
            sidebar.style.position = "fixed";
            sidebar.style.top = fixedOffset + "px";
        } else {
            sidebar.style.position = "static";
        }
    });
});
