# Mobile Menu Troubleshooting Guide

## Current Status
The mobile menu code is **correctly implemented** in the repository. If it's not working, follow these troubleshooting steps:

## Quick Fixes

### 1. Hard Refresh Your Browser
**This fixes 90% of issues!**
- **Windows/Linux**: Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: Press `Cmd + Shift + R`
- **Alternative**: Open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

### 2. Check Browser Console
1. Press `F12` to open Developer Tools
2. Click the "Console" tab
3. Look for any red error messages
4. Common errors to look for:
   - "Failed to load resource" - CSS/JS files not loading
   - "Cannot read property" - JavaScript errors
   - "Uncaught TypeError" - JavaScript errors

### 3. Verify Files Are Loading
1. Open DevTools (F12)
2. Go to "Network" tab
3. Refresh the page
4. Check that these files load successfully (status 200):
   - `css/main.css`
   - `css/components.css`
   - `js/main.js`

### 4. Test on Mobile Device
- Open on actual mobile device or
- Use browser's device emulation:
  1. Press `F12` for DevTools
  2. Click the mobile/tablet icon (or press `Ctrl+Shift+M`)
  3. Select a mobile device from dropdown
  4. Refresh the page

## How the Mobile Menu Works

### HTML Structure (index.html)
```html
<button class="navbar-toggle" id="navbarToggle">
    <span></span>
    <span></span>
    <span></span>
</button>

<ul class="navbar-menu" id="navbarMenu">
    <!-- menu items -->
</ul>
```

### CSS (components.css)
- **Desktop**: Button is hidden (`display: none`)
- **Mobile (< 768px)**: 
  - Button shows (`display: flex`)
  - Menu is hidden off-screen (`transform: translateY(-150%)`)
  - When `.active` class added: Menu slides down

### JavaScript (main.js)
- Listens for click on `#navbarToggle`
- Toggles `.active` class on both button and menu
- Animates button to X shape
- Slides menu down/up

## Manual Test

### Step 1: Check Button Visibility
1. Resize browser to < 768px width
2. You should see three horizontal lines (☰) in top-right
3. If not visible, check CSS is loading

### Step 2: Test Click
1. Click the three-line button
2. Button should animate to X
3. Menu should slide down from top
4. Click again - menu should slide up

### Step 3: Check JavaScript
Open browser console and run:
```javascript
// Check if elements exist
console.log(document.getElementById('navbarToggle'));
console.log(document.getElementById('navbarMenu'));

// Manually toggle menu
document.getElementById('navbarMenu').classList.toggle('active');
```

## Still Not Working?

### Check File Paths
Make sure you're opening the file correctly:
- ✅ Using a local server (e.g., Live Server in VS Code)
- ✅ Or opening via `file:///` protocol
- ❌ NOT just double-clicking the HTML file (may cause path issues)

### Verify CSS Variables
The CSS uses custom properties. Check if `css/main.css` is loaded (it defines the variables).

### Check for Conflicting CSS
Look for any custom CSS that might be overriding the mobile menu styles.

## Test Page
Use the included `mobile-menu-test.html` file:
1. Open `mobile-menu-test.html` in browser
2. This is a minimal test page
3. If this works, the issue is elsewhere in your main page
4. If this doesn't work, check browser console for errors

## Contact Support
If none of these steps work, provide:
1. Screenshot of browser console (F12 → Console tab)
2. Screenshot of Network tab showing loaded files
3. Browser name and version
4. Device/screen size you're testing on
