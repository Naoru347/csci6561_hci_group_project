document.addEventListener("DOMContentLoaded", function () {
    const fontSizeSlider = document.getElementById("fontSizeSlider");
    const fontSizeValue = document.getElementById("fontSizeValue");
    const body = document.body;

    // Function to update font size
    function updateFontSize(size) {
        body.style.fontSize = size + "px";
        fontSizeValue.textContent = size;
        
        // Save preference in localStorage
        localStorage.setItem("preferredFontSize", size);
    }

    // Event listener for slider changes
    fontSizeSlider.addEventListener("input", function () {
        updateFontSize(this.value);
    });

    // Load saved font size from localStorage (if available)
    const savedFontSize = localStorage.getItem("preferredFontSize");
    if (savedFontSize) {
        fontSizeSlider.value = savedFontSize;
        updateFontSize(savedFontSize);
    } else {
        // Initialize with default value
        updateFontSize(fontSizeSlider.value);
    }
});
