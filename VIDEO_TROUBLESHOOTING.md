# Video Loading Troubleshooting Guide

## Issue: Videos Not Loading Properly

### What Was Fixed

1. **HTML Improvements**
   - Added unique IDs to both video elements (`heroBackgroundVideo` and `heroFeatureVideo`)
   - Changed `preload="auto"` to `preload="metadata"` for better performance
   - Removed `fetchpriority="high"` which can cause issues in some browsers
   - Added fallback text for browsers that don't support video

2. **JavaScript Enhancements**
   - Added comprehensive video loading logic with error handling
   - Implemented automatic retry mechanism if video stalls
   - Added fallback to poster image if video fails to load
   - Ensured videos resume playing after tab visibility changes
   - Added user interaction fallback if autoplay is blocked

3. **How It Works**
   - Videos are initialized when the page loads
   - Each video is set to muted, autoplay, loop, and playsinline
   - If autoplay is blocked by browser, video will play on first user click
   - If video stalls, it automatically attempts to reload
   - Console logs show the status of video loading for debugging

### Testing Checklist

- [ ] Open browser console (F12) and check for video initialization messages
- [ ] Look for "🎥 Initializing video" messages
- [ ] Look for "✅ Video loaded successfully" messages
- [ ] Look for "▶️ Video playing" messages
- [ ] If you see "⚠️ Autoplay prevented", click anywhere on the page to start video
- [ ] Check that both background and feature videos are playing

### Common Issues and Solutions

#### Issue: Video shows black screen
**Solution**: The video file might be corrupted or in an unsupported format
- Verify the video file exists at `assets/videos/99688-655952695_small.mp4`
- Try opening the video directly in browser: `http://localhost/assets/videos/99688-655952695_small.mp4`
- Ensure video is in MP4 format with H.264 codec

#### Issue: Video doesn't autoplay
**Solution**: Browser autoplay policies require muted videos
- Our fix ensures videos are muted
- If still blocked, click anywhere on the page to start playback
- Check browser console for autoplay warnings

#### Issue: Video loads slowly
**Solution**: Video file might be too large
- Current setting uses `preload="metadata"` for faster initial load
- Video will start playing as soon as enough data is buffered
- Consider compressing the video file if it's larger than 5MB

#### Issue: Video stops playing when switching tabs
**Solution**: Our code handles this automatically
- Videos will resume when you return to the tab
- Check console for "resume failed" messages if this doesn't work

#### Issue: Poster image doesn't show
**Solution**: Verify poster image exists
- Check that `assets/images/hero-background.png` exists
- If video fails, poster will be used as background

### Browser Compatibility

✅ **Supported Browsers**:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile Safari (iOS 10+)
- Chrome Mobile (Android 5+)

⚠️ **Known Limitations**:
- Some browsers block autoplay even with muted videos
- Low Power Mode on mobile devices may prevent autoplay
- Slow network connections may cause buffering

### Performance Tips

1. **Optimize Video File**
   - Recommended size: 2-5 MB
   - Recommended resolution: 1920x1080 or lower
   - Recommended codec: H.264
   - Recommended format: MP4

2. **Network Considerations**
   - Videos use `preload="metadata"` to load faster
   - Poster images provide instant visual feedback
   - Videos load progressively (streaming)

3. **Mobile Optimization**
   - `playsinline` attribute prevents fullscreen on iOS
   - Muted videos are more likely to autoplay on mobile
   - Consider using lower resolution video for mobile

### Debug Commands

Open browser console and run these commands to check video status:

```javascript
// Check if videos exist
console.log('Background Video:', document.getElementById('heroBackgroundVideo'));
console.log('Feature Video:', document.getElementById('heroFeatureVideo'));

// Check video state
const bgVideo = document.getElementById('heroBackgroundVideo');
console.log('Paused:', bgVideo.paused);
console.log('Current Time:', bgVideo.currentTime);
console.log('Duration:', bgVideo.duration);
console.log('Ready State:', bgVideo.readyState);

// Manually play video
document.getElementById('heroBackgroundVideo').play();
document.getElementById('heroFeatureVideo').play();
```

### File Structure Verification

Ensure these files exist:
```
bourgeoisclinic.com/
├── assets/
│   ├── videos/
│   │   └── 99688-655952695_small.mp4  ✓ (Required)
│   └── images/
│       └── hero-background.png  ✓ (Recommended as fallback)
├── js/
│   └── main.js  ✓ (Updated with video logic)
└── index.html  ✓ (Updated with video IDs)
```

### Next Steps if Still Not Working

1. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for any error messages in red
   - Share error messages for further troubleshooting

2. **Verify Video File**
   - Navigate directly to: `http://localhost/assets/videos/99688-655952695_small.mp4`
   - Video should play in browser
   - If not, re-download or re-encode the video

3. **Test in Different Browser**
   - Try Chrome, Firefox, and Safari
   - If works in one but not others, it's a browser-specific issue

4. **Check Network Tab**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Reload page
   - Look for the video file request
   - Check if it returns 200 (success) or error code

### Contact Support

If videos still don't load after trying all solutions:
1. Share browser console errors
2. Share Network tab screenshot
3. Specify which browser and version you're using
4. Describe exactly what you see (black screen, poster only, etc.)
