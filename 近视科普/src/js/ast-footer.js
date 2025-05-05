const footerTemp = document.createElement("template");

footerTemp.innerHTML = `
    <link rel="stylesheet" href="./css/base/reset.css">
    <link rel="stylesheet" href="./css/base/default.css">
    <link rel="stylesheet" href="./css/ast-footer.css">
    
    <footer>
        <span>守护视力,从今天开始</span>
        <hr>
        
    </footer>
`;

(function () {
    class AstFooter extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: "closed"});
            let content = footerTemp.content;

            shadow.appendChild(content);
        }
    }
    window.customElements.define("ast-footer", AstFooter);
})();