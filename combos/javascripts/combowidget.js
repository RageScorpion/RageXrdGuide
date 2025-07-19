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

document.addEventListener('DOMContentLoaded', () => {
    // Find all combo widget containers
    const comboWidgets = document.querySelectorAll('.combo-widget');

    comboWidgets.forEach(widget => {
        const tabButtons = widget.querySelectorAll('.combo-tab-button');
        const contentPanels = widget.querySelectorAll('.combo-variation-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;

                // Remove 'active' class from all buttons and hide all content panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                contentPanels.forEach(panel => panel.style.display = 'none');

                // Add 'active' class to the clicked button
                button.classList.add('active');

                // Display the target content panel
                const targetPanel = widget.querySelector(`#${targetId}`);
                if (targetPanel) {
                    targetPanel.style.display = 'block';

                    // Optional: If you have embedded YouTube iframes that auto-play
                    // and you want to stop them when switching tabs:
                    contentPanels.forEach(panel => {
                        const iframe = panel.querySelector('iframe');
                        if (iframe && iframe.src.includes('youtube.com')) {
                            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                        }
                    });
                    // And then play the new one if it's currently paused (less common to auto-play on tab switch)
                    // const newIframe = targetPanel.querySelector('iframe');
                    // if (newIframe && newIframe.src.includes('youtube.com')) {
                    //     newIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    // }
                }
            });
        });
    });
});

// Re-initialize tabs after every MkDocs page load
if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
        const tabbedWidgetGroups = document.querySelectorAll('.tabbed-widget-group');
        tabbedWidgetGroups.forEach((group, index) => {
            const firstTabButton = group.querySelector('.tab-button');
            if (firstTabButton) firstTabButton.click();
        });
    });
}

//To switch video sources
function switchVideoSource(buttonElement, sourceType) {
    // Find the parent video-wrapper for this button
    var videoWrapper = buttonElement.closest('.video-wrapper');
    if (!videoWrapper) {
        console.error("Video wrapper not found for button:", buttonElement);
        return;
    }

    // Deactivate all source buttons within this video-wrapper
    var buttons = videoWrapper.querySelectorAll('.video-source-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Activate the clicked button
    buttonElement.classList.add('active');

    // Hide all video containers
    var videoContainers = videoWrapper.querySelectorAll('.video-container');
    videoContainers.forEach(container => container.classList.remove('active'));

    // Show the selected video container
    var selectedContainer = videoWrapper.querySelector('.' + sourceType + '-video');
    if (selectedContainer) {
        selectedContainer.classList.add('active');
    } else {
        console.warn("No video container found for source type:", sourceType);
    }
}

function generateGroupedToggleableRightSideToc() {
    console.log("TOC Generation: Starting grouped toggleable TOC (Revised for H2 combo starters)...");

    const tocContainer = document.getElementById("custom-toc"); // Make sure this ID matches your HTML!
    if (!tocContainer) {
        console.warn("TOC Generation: Container #custom-toc not found. Aborting.");
        return;
    }
    tocContainer.innerHTML = ''; // Clear previous content

    const tocList = document.createElement("ul");
    tocList.classList.add("custom-toc-list");

    // Define your top-level TOC categories and their corresponding data-category values.
    // The key is the display name, the value is the data-category attribute.
    const topLevelCategories = {
        "PK Combos": "pk-combos"
    };

    // This will store references to the ul elements for each category,
    // so we can append child combo starters to them.
    const categoryChildUls = {};
    const categoryParentLis = {}; // To store the parent li for toggle control

    // 1. Create the top-level (conceptual) categories first
    for (const displayName in topLevelCategories) {
        const categorySlug = topLevelCategories[displayName];

        const parentLi = document.createElement("li");
        parentLi.classList.add('toc-item-parent'); // Class for styling parent

        const toggleWrapper = document.createElement('div');
        toggleWrapper.classList.add('toc-header-wrapper');
        toggleWrapper.style.cursor = 'pointer';

        const toggleSpan = document.createElement('span');
        toggleSpan.classList.add('toc-toggle-button');

        const categoryLink = document.createElement('a');
        categoryLink.textContent = displayName;
        // This link can point to a section on the page if you have one for the category,
        // otherwise it just serves as display text. For now, we'll make it jump to the first combo of that category.
        categoryLink.href = `#${categorySlug}`; // Placeholder link for now, will be updated if first child found.

        toggleWrapper.appendChild(toggleSpan);
        toggleWrapper.appendChild(categoryLink);
        parentLi.appendChild(toggleWrapper);
        tocList.appendChild(parentLi);

        const childUl = document.createElement('ul');
        childUl.classList.add('toc-child-list');
        parentLi.appendChild(childUl);

        categoryChildUls[categorySlug] = childUl; // Store child UL reference for appending combo starters
        categoryParentLis[categorySlug] = parentLi; // Store parent LI reference for toggle class

        // Set initial toggle state based on requirements
        if (displayName === "PK Combos") {
            parentLi.classList.remove('is-toggled-in'); // PK Combos starts closed
            toggleSpan.textContent = '►'; // Right arrow
        } else {
            parentLi.classList.add('is-toggled-in'); // Other categories open by default
            toggleSpan.textContent = '▼'; // Down arrow
        }

        // Add toggle listener to the entire wrapper
        toggleWrapper.addEventListener('click', (e) => {
            // Only toggle if not clicking directly on the category link
            if (e.target !== categoryLink) {
                parentLi.classList.toggle('is-toggled-in');
                toggleSpan.textContent = parentLi.classList.contains('is-toggled-in') ? '▼' : '►';
            }
        });
    }

    // 2. Find all actual H2 combo starters and place them under their categories
    // We only select H2s, as per your requirement.
    const comboStarters = document.querySelectorAll('h2');
    console.log("TOC Generation: Found H2 combo starters:", comboStarters.length, comboStarters);

    comboStarters.forEach(heading => {
        const category = heading.dataset.category; // Get the data-category attribute
        const headingText = heading.textContent.trim();

        let id = heading.id;
        if (!id) {
            id = headingText.toLowerCase()
                       .replace(/[^a-z0-9\s-]/g, '')
                       .replace(/\s+/g, '-')
                       .replace(/^-+|-+$/g, '');
            heading.id = id; // Assign ID to the actual H2 for linking
        }

        const link = document.createElement("a");
        link.href = '#' + id;
        link.textContent = headingText;

        const li = document.createElement('li');
        li.classList.add('toc-item-child'); // Class for child styling (indentation)
        li.appendChild(link);

        if (category && categoryChildUls[category]) {
            // Append to the correct category's child list
            categoryChildUls[category].appendChild(li);

            // If this is the first combo starter for a category, update the category's link to point here
            if (!categoryParentLis[category].querySelector('.toc-header-wrapper a').href.includes('#')) {
                categoryParentLis[category].querySelector('.toc-header-wrapper a').href = '#' + id;
            }
        } else {
            // Debugging: If an H2 is found but doesn't have a matching data-category
            // or if the category is not defined in topLevelCategories.
            console.warn(`H2 "${headingText}" (ID: ${id}) has no matching data-category ("${category}") or top-level category defined. It will not appear in the grouped TOC.`);
            // You might want to add a fallback here if you have H2s that should appear
            // as standalone top-level items without children, but they don't have data-category.
            // For now, they will be explicitly ignored.
        }
    });

    tocContainer.appendChild(tocList);
    console.log("TOC Generation: Grouped toggleable TOC successfully generated.");

    // Smooth scrolling for all links
    tocList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.hash) {
            const targetId = e.target.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Call this function using your document$.subscribe method
if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
        console.log("TOC Generation: document$.subscribe fired, generating grouped toggleable TOC.");
        generateGroupedToggleableRightSideToc();
    });
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("TOC Generation: DOMContentLoaded fired, generating grouped toggleable TOC.");
        generateGroupedToggleableRightSideToc();
    });
}


        // Add toggle listener
        toggleWrapper.addEventListener('click', (e) => {
            console.log("Toggle Wrapper Clicked!", e.target); // Debug 1: Confirm click event
            // Only toggle if not clicking directly on the category link
            // This is important because the link itself handles scrolling, not toggling
            if (e.target !== categoryLink) { // Ensure the link itself is not the target of the toggle
                parentLi.classList.toggle('is-toggled-in');
                toggleSpan.textContent = parentLi.classList.contains('is-toggled-in') ? '▼' : '►';
                console.log("Toggle state changed. New classes on parentLi:", parentLi.classList); // Debug 2: See class changes
                console.log("New arrow:", toggleSpan.textContent); // Debug 3: See arrow change
            } else {
                console.log("Clicked on the category link, not toggling."); // Debug 4: If clicking on the link
            }
        });
 // End of topLevelCategories loop
