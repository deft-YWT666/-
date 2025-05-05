(function () {
    let h1 = document.querySelectorAll("#content h1");

    // 动态添加标签
    let sideBar = document.getElementsByTagName("side-bar")[0];
    for (let i = 0; i < h1.length; i++) {
        let target = h1[i];
        // 设置a标签
        let a = document.createElement("a");
        a.setAttribute("href", "javascript:");
        a.innerHTML = target.innerHTML;

        // 添加点击事件
        a.addEventListener("click", function () {
            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        })

        sideBar.appendChild(a);
    }
})();