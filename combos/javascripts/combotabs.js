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
