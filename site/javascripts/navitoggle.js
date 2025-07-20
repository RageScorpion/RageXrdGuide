document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".md-nav__item").forEach(function (item) {
        let subNav = item.querySelector(".md-nav__list");
        if (subNav) {
            item.classList.add("has-submenu");
            item.addEventListener("click", function (e) {
                if (e.target.tagName !== "A") {
                    subNav.classList.toggle("collapsed");
                    e.stopPropagation();
                }
            });
        }
    });
});
