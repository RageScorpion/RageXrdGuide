document.querySelectorAll("tr").forEach(row => {
    let characterCell = row.querySelector("td:first-child");
    if (!characterCell) return; // Skip if no character cell (header row)
function updateDisplay(isExpanded) {
        row.querySelectorAll("td:not(:first-child)").forEach(td => {
            let elements = Array.from(td.children).filter(el => el.tagName.toLowerCase() !== "hr"); // Non-hr elements
            let allElements = Array.from(td.children); // All elements including hr
 let visibleCount = isExpanded ? elements.length : 2; // Show all if expanded, else 2
allElements.forEach((el, index) => {
                let isHr = el.tagName.toLowerCase() === "hr";
                let shouldHide = index >= visibleCount * 2 - 1; // Adjust for 2 routes and separators
 if (isHr && index === allElements.length - 1) {
                    // Hide the last <hr> in each column
                    el.style.display = "none";
                } else {
                    el.style.display = shouldHide ? "none" : "";
                }
            });
        });
    }
characterCell.addEventListener("click", function () {
        let isExpanded = row.classList.toggle("expanded");
        updateDisplay(isExpanded);
    });
// **Initial setup**: Hide extra routes & hide last <hr>
    updateDisplay(false);
});
