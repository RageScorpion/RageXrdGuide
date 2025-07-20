document.addEventListener("DOMContentLoaded", function () {
    fetch("/includes/pktable.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("table-container").innerHTML = html;
        });
});