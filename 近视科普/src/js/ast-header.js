const headerTemp = document.createElement("template");

headerTemp.innerHTML = `
    <link rel="stylesheet" href="./css/base/reset.css">
    <link rel="stylesheet" href="./css/base/default.css">
    <link rel="stylesheet" href="./css/ast-header.css">
    
    <header>
        <div id="nav_logo">
            <img id="nav_logo_img" src="./img/logo.png" alt="icon">
            <span id="nav_logo_title">守护“视”界，“睛”彩“视”界</span>
        </div>
        <ul id="nav_list">
            <li class="nav_item">
                <a href="javascript:">首页</a>
            </li>
            <li class="nav_item">
                <a href="javascript:">科普知识</a>
                <ul class="menu">
                    <li class="menu_item"><a href="javascript:">近视科普</a> </li>
                    
                </ul>
            </li>
            <li class="nav_item">
                <a href="javascript:">防控措施</a>
                <ul class="menu">
                    <li class="menu_item"><a href="javascript:">近视防控</a> </li>
                    
                </ul>
            </li>
            <li class="nav_item">
                <a href="javascript:">热门话题</a>
                <ul class="menu">
                    <li class="menu_item"><a href="javascript:">新闻</a></li>
                    <li class="menu_item"><a href="javascript:">每日一荐</a></li>
                    <li class="menu_item"><a href="javascript:">相关政策</a></li>
                    <li class="menu_item"><a href="javascript:">猜你想看</a></li>
                   
                </ul>
            </li>
            <li class="nav_item">
                <a href="javascript:">关于我们</a>
            </li>
        </ul>
    </header>
`;

(function () {
    class AstHeader extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: 'closed'});
            let content = headerTemp.content;

            let navSelected = parseInt(this.getAttribute("nav-selected"));

            // 设置导航栏选中样式
            let navALabels = content.querySelectorAll(".nav_item>a");
            navALabels[navSelected].setAttribute("id", "nav_selected");

            // nav栏首页和图片库添加跳转
            if (navSelected !== 0) {
                navALabels[0].onclick = function () {
                    location.href = "./index.html";
                }
            }
            if (navSelected !== navALabels.length - 1) {
                navALabels[navALabels.length - 1].onclick = function () {
                    location.href = "./pictures.html?page=0";
                }
            }

            // menu设置跳转
            let menus = content.querySelectorAll(".menu");
            for (let i = 0; i < menus.length; i++) {
                let aLabels = menus[i].getElementsByTagName("a");
                for (let j = 0; j < aLabels.length; j++) {
                    let url = "./nav" + (i + 1) + "-page" + (j + 1) + ".html";
                    aLabels[j].onclick = function () {
                        location.href = url;
                    }
                }
            }

            shadow.appendChild(content);
        }
    }
    window.customElements.define("ast-header", AstHeader);
})();