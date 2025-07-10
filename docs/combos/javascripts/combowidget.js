function openTab(evt, tabName) {
    // --- Start Debugging Logs ---
    console.groupCollapsed("Tab Clicked: " + evt.currentTarget.textContent + " (Target: " + tabName + ")");
    console.log("Event target:", evt.currentTarget);
    // --- End Debugging Logs ---

    var i; // Declare 'i' once

    // Find the immediate parent of the clicked button (which should be .tab-buttons)
    const tabButtonsContainer = evt.currentTarget.parentNode;
    if (!tabButtonsContainer || !tabButtonsContainer.classList.contains('tab-buttons')) {
        console.error("ERROR: Clicked element's parent is not .tab-buttons. HTML structure might be incorrect.");
        console.groupEnd(); // End this log group on error
        return;
    }
    console.log("Found tabButtonsContainer:", tabButtonsContainer);

    // Find the shared parent container that holds BOTH the .tab-buttons and the .tab-content divs for this widget.
    // This is the .tabbed-widget-group
    const currentTabGroup = tabButtonsContainer.closest('.tabbed-widget-group');

    if (!currentTabGroup) {
        console.error("ERROR: .tab-buttons container not inside .tabbed-widget-group. Cannot open tab.");
        console.error("Please ensure your widget is wrapped in <div class=\"tabbed-widget-group\">...</div> in your Markdown.");
        console.groupEnd(); // End this log group on error
        return;
    }
    console.log("Found currentTabGroup:", currentTabGroup);


    // Deactivate all tab-buttons within this specific widget group
    const tablinks = currentTabGroup.querySelectorAll(".tab-button");
    console.log("Found", tablinks.length, "tab buttons in this group.");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    console.log("All tab buttons in group deactivated.");


    // Hide all tab-content elements within this specific widget group
    const tabcontent = currentTabGroup.querySelectorAll(".tab-content");
    console.log("Found", tabcontent.length, "tab content divs in this group.");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    console.log("All tab content divs in group hidden.");


    // Activate the clicked button
    evt.currentTarget.classList.add("active");
    console.log("Activated clicked button.");

    // Show the target tab content (identified by its unique global ID)
    const targetTabContent = document.getElementById(tabName);
    if (targetTabContent) {
        targetTabContent.classList.add("active");
        console.log("Activated target content div with ID:", tabName);
    } else {
        console.error("ERROR: Target tab content with ID '" + tabName + "' not found.");
        console.error("Please check if the ID in your HTML (e.g., id=\"your_content_id\") matches the onclick attribute (e.g., onclick=\"openTab(event, 'your_content_id')\").");
    }
    console.groupEnd(); // End the log group for this tab click
}


// Ensure the first tab is active for each widget on page load
document.addEventListener('DOMContentLoaded', function() {
    console.groupCollapsed("DOM fully loaded: Initializing Tabs");
    console.log("Scanning for .tabbed-widget-group elements to initialize...");

    const tabbedWidgetGroups = document.querySelectorAll('.tabbed-widget-group');
    if (tabbedWidgetGroups.length === 0) {
        console.warn("WARNING: No .tabbed-widget-group elements found on the page. Tabs might not initialize.");
    }

    tabbedWidgetGroups.forEach((group, index) => {
        console.log("--- Processing tab group Index:", index, "---");
        const firstTabButton = group.querySelector('.tab-button');
        if (firstTabButton) {
            console.log("Simulating click on first button:", firstTabButton.textContent);
            // Simulate a click on this first button.
            // This will trigger the openTab function, which is now correctly scoped.
            firstTabButton.click();
        } else {
            console.warn("WARNING: No .tab-button found in tab group Index:", index, ". Skipping initialization for this group.");
        }
    });
    console.groupEnd(); // End the DOMContentLoaded log group
});