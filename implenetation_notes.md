# FocusWrite: Academic Integrity Feature Implementation Guide

## Introduction

This guide provides implementation instructions for enhancing the FocusWrite application with additional academic integrity features. Each feature is designed to help maintain focus and ensure assessment validity while being minimally intrusive to the student experience.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Implementation Approach](#implementation-approach)
3. [Feature 1: Keyboard Shortcut Monitoring](#feature-1-keyboard-shortcut-monitoring)
4. [Feature 2: Context Menu Prevention](#feature-2-context-menu-prevention)
5. [Feature 3: Text Selection Tracking](#feature-3-text-selection-tracking)
6. [Feature 4: Print Function Detection](#feature-4-print-function-detection)
7. [Feature 5: Clipboard Operation Monitoring](#feature-5-clipboard-operation-monitoring)
8. [Feature 6: Window Resize Detection](#feature-6-window-resize-detection)
9. [Feature 7: Developer Tools Detection](#feature-7-developer-tools-detection)
10. [Feature 8: Multiple Monitors Detection](#feature-8-multiple-monitors-detection)
11. [Feature 9: Inactivity Timeout Tracking](#feature-9-inactivity-timeout-tracking)
12. [Feature 10: Browser Storage Access Monitoring](#feature-10-browser-storage-access-monitoring)
13. [Helper Functions](#helper-functions)
14. [Integration with AWS Architecture](#integration-with-aws-architecture)
15. [Testing Approach](#testing-approach)

## Getting Started

Before implementing these features, ensure you have:

- Access to the current FocusWrite codebase
- Understanding of the existing violation tracking mechanism
- Basic knowledge of JavaScript event handling
- Familiarity with AWS Lambda and API Gateway (for cloud integration)

## Implementation Approach

Each feature should be implemented following these steps:

1. Create the event listener or monitor function
2. Integrate with the existing violation tracking system
3. Test in multiple browsers (Chrome, Firefox, Safari, Edge)
4. Add appropriate user messaging
5. Deploy to test environment

**Note:** Add these features incrementally, testing thoroughly after each addition.

## Feature 1: Keyboard Shortcut Monitoring

This feature detects when students use potentially problematic keyboard shortcuts.

### Implementation

```javascript
// Add to task.js after other event listeners
document.addEventListener('keydown', function(e) {
  // Only track shortcuts if assignment has started (not in confirmation block)
  if (divTextAndLinksBlock.classList.contains('d-none')) {
    return;
  }
  
  // Set of monitored key combinations
  const monitoredCombinations = [
    { keys: ['Control', 'c'], description: "Copy content" },
    { keys: ['Control', 'v'], description: "Paste content" },
    { keys: ['Control', 'p'], description: "Print page" },
    { keys: ['Alt', 'Tab'], description: "Switch application" },
    { keys: ['F12'], description: "Developer tools" },
    { keys: ['Control', 'Shift', 'i'], description: "Developer tools" },
    { keys: ['Control', 'Shift', 'c'], description: "Developer tools inspector" }
  ];
  
  // Get all currently pressed keys
  const pressedKeys = [];
  if (e.ctrlKey) pressedKeys.push('Control');
  if (e.altKey) pressedKeys.push('Alt');
  if (e.shiftKey) pressedKeys.push('Shift');
  if (e.metaKey) pressedKeys.push('Meta'); // Command key on Mac
  
  // Add the specific key
  pressedKeys.push(e.key);
  
  // Check if the combination matches any monitored ones
  for (const combo of monitoredCombinations) {
    // Check if all keys in the combination are pressed
    const allKeysPressed = combo.keys.every(key => 
      pressedKeys.includes(key) || 
      // Handle case sensitivity for letter keys
      (key.length === 1 && pressedKeys.includes(key.toLowerCase()))
    );
    
    // Check if only the keys in the combination are pressed
    const onlyComboKeysPressed = pressedKeys.length === combo.keys.length;
    
    if (allKeysPressed && onlyComboKeysPressed) {
      recordFocusReminder("Restricted keyboard shortcut", 
        `Attempted to use keyboard shortcut: ${combo.keys.join('+')}`,
        `Using keyboard shortcuts like ${combo.keys.join('+')} during assessments is not permitted as it may compromise academic integrity.`
      );
      
      e.preventDefault();
      return false;
    }
  }
});
```

### Integration Notes

This code should be added near other event listeners in task.js. It prevents common shortcuts that could compromise assessment integrity while logging the attempt.

## Feature 2: Context Menu Prevention

This feature prevents and logs attempts to use the browser's right-click menu.

### Implementation

```javascript
// Add to task.js after other event listeners
document.addEventListener('contextmenu', function(e) {
  // Only prevent context menu if assignment has started
  if (!divTextAndLinksBlock.classList.contains('d-none')) {
    e.preventDefault();
    
    recordFocusReminder("Context menu attempt", 
      "Attempted to open browser right-click menu",
      "The right-click menu is disabled during assessments to maintain focus on the writing task."
    );
    
    return false;
  }
});
```

### Integration Notes

This feature should be integrated carefully to ensure it doesn't interfere with any legitimate right-click functionality within the editor itself. Consider adding a check to allow right-clicks inside the TinyMCE editor frame.

## Feature 3: Text Selection Tracking

This feature monitors attempts to select text outside the editor area.

### Implementation

```javascript
// Add to task.js after other event listeners
document.addEventListener('selectstart', function(e) {
  // Only track selection if assignment has started and not inside editor
  if (!divTextAndLinksBlock.classList.contains('d-none') && !insideEditor) {
    // Allow selection in specific areas like resources
    const allowedSelectionAreas = [
      document.getElementById('promptLink'),
      document.getElementById('uploadedResourcesLinks'),
      document.getElementById('externalLinks')
    ];
    
    // Check if selection started in allowed areas
    let inAllowedArea = false;
    for (const area of allowedSelectionAreas) {
      if (area && area.contains(e.target)) {
        inAllowedArea = true;
        break;
      }
    }
    
    if (!inAllowedArea) {
      e.preventDefault();
      
      recordFocusReminder("Text selection attempt", 
        "Attempted to select text outside the editor",
        "Selecting text outside the editor is restricted during assessments to prevent copying content between applications."
      );
      
      return false;
    }
  }
});
```

### Integration Notes

The implementation allows text selection within permitted areas like resource sections while preventing it elsewhere. This feature should be coordinated with the TinyMCE configuration to ensure proper interaction.

## Feature 4: Print Function Detection

This feature detects and logs attempts to print the page.

### Implementation

```javascript
// Add to task.js after other event listeners
window.addEventListener('beforeprint', function(e) {
  // Only track if assignment has started
  if (!divTextAndLinksBlock.classList.contains('d-none')) {
    recordFocusReminder("Print attempt", 
      "Attempted to print page content",
      "Printing during an assessment is not permitted to maintain academic integrity."
    );
    
    // In some browsers, we can't actually prevent printing,
    // but we can at least log the attempt
  }
});

// Additional prevention through CSS
// Add this to your CSS file
@media print {
  body {
    display: none;
  }
}

// Additional keyboard shortcut prevention (already covered in Feature 1)
```

### Integration Notes

Different browsers handle print prevention differently. This combined approach (event listener + CSS) provides the best cross-browser coverage. Note that some browsers may still allow printing, but the attempt will be logged.

## Feature 5: Clipboard Operation Monitoring

This feature monitors and logs clipboard operations.

### Implementation

```javascript
// Add to task.js after other event listeners
document.addEventListener('copy', function(e) {
  // Only monitor if assignment has started and not inside editor
  if (!divTextAndLinksBlock.classList.contains('d-none') && !insideEditor) {
    e.preventDefault();
    
    recordFocusReminder("Copy attempt", 
      "Attempted to copy content outside the editor",
      "Copying content outside the editor is restricted during assessments."
    );
    
    return false;
  }
});

document.addEventListener('paste', function(e) {
  // We want to allow paste inside the editor but track it
  if (!divTextAndLinksBlock.classList.contains('d-none')) {
    if (insideEditor) {
      // Allow paste but record it
      recordFocusReminder("Content pasted", 
        "Content pasted into editor",
        "Note: Pasting content into the editor has been recorded for review."
      );
    } else {
      // Prevent paste outside editor
      e.preventDefault();
      
      recordFocusReminder("Paste attempt", 
        "Attempted to paste content outside the editor",
        "Pasting content outside the editor is restricted during assessments."
      );
      
      return false;
    }
  }
});

document.addEventListener('cut', function(e) {
  // Allow cut inside editor, prevent elsewhere
  if (!divTextAndLinksBlock.classList.contains('d-none') && !insideEditor) {
    e.preventDefault();
    
    recordFocusReminder("Cut attempt", 
      "Attempted to cut content outside the editor",
      "The cut operation is only permitted within the editor during assessments."
    );
    
    return false;
  }
});
```

### Integration Notes

This implementation allows clipboard operations within the TinyMCE editor but prevents them elsewhere. The paste operation within the editor is permitted but logged for review.

## Feature 6: Window Resize Detection

This feature monitors significant changes to the window size.

### Implementation

```javascript
// Add to task.js after DOMContentLoaded event
let originalWidth = 0;
let originalHeight = 0;
let windowResizeTimeout = null;

// After enterFullscreen() is called, record the original dimensions
function recordOriginalWindowDimensions() {
  originalWidth = window.innerWidth;
  originalHeight = window.innerHeight;
}

// Add this to btnBegin event listener after enterFullscreen() is called
document.getElementById("btnBegin").addEventListener("click", () => {
  // Existing code...
  
  // After entering fullscreen, record original dimensions
  // Allow a slight delay for fullscreen to initialize
  setTimeout(recordOriginalWindowDimensions, 500);
});

// Add resize event listener
window.addEventListener('resize', function() {
  // Only track if assignment has started
  if (!divTextAndLinksBlock.classList.contains('d-none')) {
    // Clear any existing timeout
    if (windowResizeTimeout) {
      clearTimeout(windowResizeTimeout);
    }
    
    // Set a new timeout to avoid multiple triggers for a single resize
    windowResizeTimeout = setTimeout(function() {
      // Check if the resize is significant (more than 100px in either dimension)
      const widthChange = Math.abs(window.innerWidth - originalWidth);
      const heightChange = Math.abs(window.innerHeight - originalHeight);
      
      if (widthChange > 100 || heightChange > 100) {
        recordFocusReminder("Window resize", 
          `Browser window was significantly resized (Width: ${widthChange}px, Height: ${heightChange}px)`,
          "Significantly changing the browser window size during an assessment is restricted."
        );
        
        // Update original dimensions to prevent repeated triggers
        originalWidth = window.innerWidth;
        originalHeight = window.innerHeight;
      }
    }, 500);
  }
});
```

### Integration Notes

This implementation has built-in debouncing to prevent multiple alerts during continuous resize operations. The size threshold (100px) can be adjusted based on your requirements.

## Feature 7: Developer Tools Detection

This feature attempts to detect when browser developer tools are opened.

### Implementation

```javascript
// Add to task.js after other initialization code
let devToolsDetectionInterval = null;

function startDevToolsDetection() {
  let previousDevToolsOpen = false;
  
  devToolsDetectionInterval = setInterval(function() {
    // Only check if assignment has started
    if (divTextAndLinksBlock.classList.contains('d-none')) {
      return;
    }
    
    // Method 1: Check window dimensions (works in some browsers)
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    // Method 2: Check console logging timing (alternative method)
    let devToolsOpen = false;
    
    const startTime = performance.now();
    console.log('%c', 'font-size:0;');
    const endTime = performance.now();
    
    if (endTime - startTime > 10) {
      devToolsOpen = true;
    }
    
    // Combine methods
    devToolsOpen = devToolsOpen || widthThreshold || heightThreshold;
    
    // Only record when the state changes to open
    if (devToolsOpen && !previousDevToolsOpen) {
      recordFocusReminder("Developer tools", 
        "Possible attempt to open browser developer tools",
        "Using browser developer tools during an assessment is not permitted."
      );
    }
    
    previousDevToolsOpen = devToolsOpen;
  }, 2000);
}

function stopDevToolsDetection() {
  if (devToolsDetectionInterval) {
    clearInterval(devToolsDetectionInterval);
    devToolsDetectionInterval = null;
  }
}

// Start detection when assignment starts
document.getElementById("btnBegin").addEventListener("click", () => {
  // Existing code...
  
  startDevToolsDetection();
});

// Stop detection when assignment ends
document.getElementById("confirmSubmitBtn").addEventListener("click", async () => {
  // Existing code...
  
  stopDevToolsDetection();
});
```

### Integration Notes

This feature uses multiple detection techniques because no single method is 100% reliable across all browsers. It's important to note that some browsers may still find ways to open developer tools without detection.

## Feature 8: Multiple Monitors Detection

This feature attempts to detect the use of multiple monitors.

### Implementation

```javascript
// Add to task.js after other initialization code
let multiScreenDetectionInterval = null;

function startMultiScreenDetection() {
  multiScreenDetectionInterval = setInterval(function() {
    // Only check if assignment has started
    if (divTextAndLinksBlock.classList.contains('d-none')) {
      return;
    }
    
    // Check for multiple screens using screen properties
    if (window.screen.availWidth > window.screen.width + 100 || 
        window.screenLeft < -100 || 
        window.screenTop < -100 || 
        window.screenLeft > window.screen.availWidth || 
        window.screenTop > window.screen.availHeight) {
      
      recordFocusReminder("Multiple screens", 
        "Possible use of multiple monitors detected",
        "Using multiple monitors during an assessment may compromise academic integrity and is not permitted."
      );
      
      // Only record once, then reset the interval
      clearInterval(multiScreenDetectionInterval);
      setTimeout(startMultiScreenDetection, 30000); // Restart check after 30 seconds
    }
  }, 5000);
}

function stopMultiScreenDetection() {
  if (multiScreenDetectionInterval) {
    clearInterval(multiScreenDetectionInterval);
    multiScreenDetectionInterval = null;
  }
}

// Start detection when assignment starts
document.getElementById("btnBegin").addEventListener("click", () => {
  // Existing code...
  
  startMultiScreenDetection();
});

// Stop detection when assignment ends
document.getElementById("confirmSubmitBtn").addEventListener("click", async () => {
  // Existing code...
  
  stopMultiScreenDetection();
});
```

### Integration Notes

This detection method is based on screen properties that may indicate the presence of multiple monitors. It's not foolproof but can catch many common multi-monitor setups.

## Feature 9: Inactivity Timeout Tracking

This feature monitors and records extended periods of inactivity.

### Implementation

```javascript
// Add to task.js after other initialization code
let inactiveTime = 0;
const inactivityThreshold = 180; // 3 minutes
let inactivityInterval = null;

function resetInactivityTimer() {
  inactiveTime = 0;
}

function startInactivityMonitoring() {
  // Reset timer on start
  resetInactivityTimer();
  
  // Set up the interval
  inactivityInterval = setInterval(() => {
    // Only monitor if assignment has started
    if (divTextAndLinksBlock.classList.contains('d-none')) {
      return;
    }
    
    inactiveTime++;
    
    if (inactiveTime >= inactivityThreshold) {
      recordFocusReminder("Extended inactivity", 
        `No activity detected for ${inactivityThreshold} seconds`,
        "Extended periods of inactivity during an assessment are recorded for review."
      );
      
      // Reset timer after logging
      resetInactivityTimer();
    }
  }, 1000);
  
  // Reset timer on user activity
  const activityEvents = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart', 'touchmove'];
  
  activityEvents.forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
  });
  
  // Also reset when editor content changes
  if (window.myEditor) {
    window.myEditor.on('input', resetInactivityTimer);
  }
}

function stopInactivityMonitoring() {
  if (inactivityInterval) {
    clearInterval(inactivityInterval);
    inactivityInterval = null;
  }
}

// Start monitoring when assignment starts
document.getElementById("btnBegin").addEventListener("click", () => {
  // Existing code...
  
  startInactivityMonitoring();
});

// Stop monitoring when assignment ends
document.getElementById("confirmSubmitBtn").addEventListener("click", async () => {
  // Existing code...
  
  stopInactivityMonitoring();
});
```

### Integration Notes

This feature tracks user activity through multiple event types to ensure accurate detection. The inactivity threshold (3 minutes) can be adjusted based on your requirements and assessment types.

## Feature 10: Browser Storage Access Monitoring

This feature monitors attempts to access browser storage.

### Implementation

```javascript
// Add to task.js after other initialization code
function setupStorageMonitoring() {
  // Only set up monitoring if assignment has started
  if (divTextAndLinksBlock.classList.contains('d-none')) {
    return;
  }
  
  // Save original methods
  const originalLocalStorageGetItem = localStorage.getItem;
  const originalLocalStorageSetItem = localStorage.setItem;
  const originalSessionStorageGetItem = sessionStorage.getItem;
  const originalSessionStorageSetItem = sessionStorage.setItem;
  
  // Define allowed keys (those used by the application)
  const allowedLocalStorageKeys = [
    'loggedInUser', 
    'selectedAssignment', 
    'preferredFontSize'
  ];
  
  // Override localStorage methods
  localStorage.getItem = function(key) {
    if (!allowedLocalStorageKeys.includes(key)) {
      recordFocusReminder("Storage access attempt", 
        `Attempted to access localStorage key: ${key}`,
        "Accessing browser storage outside of the application's normal operation is not permitted."
      );
    }
    return originalLocalStorageGetItem.call(localStorage, key);
  };
  
  localStorage.setItem = function(key, value) {
    if (!allowedLocalStorageKeys.includes(key)) {
      recordFocusReminder("Storage modification attempt", 
        `Attempted to modify localStorage key: ${key}`,
        "Modifying browser storage outside of the application's normal operation is not permitted."
      );
    }
    return originalLocalStorageSetItem.call(localStorage, key, value);
  };
  
  // Similar for sessionStorage if needed
  
  // Restore original methods when assessment ends
  document.getElementById("confirmSubmitBtn").addEventListener("click", async () => {
    // Restore original methods
    localStorage.getItem = originalLocalStorageGetItem;
    localStorage.setItem = originalLocalStorageSetItem;
    sessionStorage.getItem = originalSessionStorageGetItem;
    sessionStorage.setItem = originalSessionStorageSetItem;
    
    // Existing code...
  });
}

// Set up monitoring when assignment starts
document.getElementById("btnBegin").addEventListener("click", () => {
  // Existing code...
  
  // Wait a short time to ensure all normal initialization has completed
  setTimeout(setupStorageMonitoring, 1000);
});
```

### Integration Notes

This implementation overrides the storage methods to detect unauthorized access while still allowing normal application usage. The `allowedLocalStorageKeys` array should be updated to include all keys legitimately used by your application.

## Helper Functions

Add this standard function to record focus reminders (previously called violations):

```javascript
// Add this function to task.js to standardize recording focus reminders
function recordFocusReminder(type, description, teacherNote) {
  const reminder = {
    id: "reminder" + (violations.length + 1),
    type: type,
    timestamp: new Date().toISOString(),
    description: description,
    teacherNote: teacherNote || `${type} was detected during the assessment.`,
    studentComment: "NONE"
  };
  
  // Add to the violations array (keep the original name for compatibility)
  violations.push(reminder);
  
  console.log("Focus reminder recorded:", reminder);
  
  // Optionally display a subtle notification to the student
  showFocusReminderNotification(type);
  
  return reminder;
}

// Add a function to show a subtle notification to students
function showFocusReminderNotification(type) {
  // Create notification element if it doesn't exist
  let notificationEl = document.getElementById('focusReminderNotification');
  
  if (!notificationEl) {
    notificationEl = document.createElement('div');
    notificationEl.id = 'focusReminderNotification';
    notificationEl.style.position = 'fixed';
    notificationEl.style.bottom = '20px';
    notificationEl.style.right = '20px';
    notificationEl.style.padding = '10px 15px';
    notificationEl.style.backgroundColor = 'rgba(255, 193, 7, 0.9)';
    notificationEl.style.color = '#000';
    notificationEl.style.borderRadius = '5px';
    notificationEl.style.zIndex = '1000';
    notificationEl.style.opacity = '0';
    notificationEl.style.transition = 'opacity 0.3s ease-in-out';
    document.body.appendChild(notificationEl);
  }
  
  // Update text and show notification
  notificationEl.textContent = `Focus reminder: ${type}`;
  notificationEl.style.opacity = '1';
  
  // Hide after 3 seconds
  setTimeout(() => {
    notificationEl.style.opacity = '0';
  }, 3000);
}
```

## Integration with AWS Architecture

When migrating to AWS, these focus reminder features can be integrated with Lambda functions:

```javascript
// Inside sendToDb function, update to work with AWS Lambda API
async function sendToDb() {
  // Keep existing local persistence
  pendingPayload = {
    email: user.email,
    submitted: confirmSubmitClicked,
    assignmentId: assignment.id,
    submittedAt: new Date().toISOString(),
    points: assignment.points,
    finalText: textareaBuffer,
    // Rename from violations to focusReminders in backend only
    focusReminders: violations // Keep original name in frontend for compatibility
  };

  if (!pendingPayload) return;
  
  try {
    // Option 1: Call Lambda directly via API Gateway
    const response = await fetch("https://your-api-gateway-url.execute-api.region.amazonaws.com/prod/submissions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Add auth if using Cognito
      },
      body: JSON.stringify(pendingPayload),
    });

    if (response.ok) {
      console.log('Submission recorded successfully to AWS');
    } else {
      throw new Error("Failed to save submission.");
    }
  } catch (err) {
    console.error(err);
    // Fall back to localStorage for offline usage
    localStorage.setItem("pendingSubmission", JSON.stringify(pendingPayload));
    console.log('Saved to localStorage for later sync');
  }
}
```

## Testing Approach

For each feature implementation:

1. **Unit Testing**: Test each feature in isolation
2. **Integration Testing**: Test how features interact with each other
3. **Cross-Browser Testing**: Verify functionality in Chrome, Firefox, Safari, and Edge
4. **User Experience Testing**: Ensure features are minimally intrusive to legitimate students

**Test Cases for Each Feature:**
- Verify detection functionality works as expected
- Confirm events are properly recorded in the format expected by the backend
- Test edge cases (e.g., rapid repeated actions)
- Ensure proper handling when offline or connection is disrupted

**Sample Test Case Documentation:**

| Feature | Test Case | Expected Behavior | Chrome | Firefox | Safari | Edge |
|---------|-----------|-------------------|--------|---------|--------|------|
| Keyboard Shortcuts | Press Ctrl+C outside editor | Blocked & recorded | ✓ | ✓ | ✓ | ✓ |
| Keyboard Shortcuts | Press Ctrl+C inside editor | Allowed | ✓ | ✓ | ✓ | ✓ |
| Context Menu | Right-click outside editor | Blocked & recorded | ✓ | ✓ | ✓ | ✓ |
| Text Selection | Select text outside editor | Blocked & recorded | ✓ | ✓ | ✓ | ✓ |