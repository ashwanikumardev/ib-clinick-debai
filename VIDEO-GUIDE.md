# How to Add the Dental Video

## Video Not Playing? Here's Why and How to Fix It

The video isn't playing because the video file doesn't exist yet. The website is currently showing the hero background image as a fallback, which looks great!

## Steps to Add the Video:

### Option 1: Download from Pixabay (Recommended)

1. **Go to Pixabay**:
   - Visit: https://pixabay.com/videos/dental-surgery-health-99688/

2. **Download the Video**:
   - Click the "Free Download" button
   - Choose "1920x1080" or "1280x720" resolution (smaller file size loads faster)
   - Save the video file

3. **Rename and Move**:
   - Rename the downloaded file to: `dental-clinic.mp4`
   - Move it to: `c:\Users\ashwi\Desktop\bourgeoisclinic.com\assets\videos\dental-clinic.mp4`

4. **Push to GitHub**:
   ```powershell
   cd c:\Users\ashwi\Desktop\bourgeoisclinic.com
   git add assets/videos/dental-clinic.mp4
   git commit -m "Add dental clinic background video"
   git push origin main
   ```

### Option 2: Use Any Other Dental Video

If you have another dental clinic video you'd like to use:

1. Make sure it's in MP4 format
2. Rename it to `dental-clinic.mp4`
3. Place it in `assets/videos/` folder
4. Push to GitHub

### Option 3: Keep Using the Image (Current State)

The website looks great with just the image! The hero section is designed to work perfectly with or without the video. If you're happy with how it looks now, you don't need to add a video at all.

---

## Current Status

✅ **Website is fully functional** - The hero background image is showing
✅ **Responsive design** - Works on all devices
✅ **Smooth animations** - All animations working perfectly
✅ **Modern color theme** - Teal/cyan/coral palette applied
✅ **WhatsApp button** - Working and visible

The video is **optional** - your website is complete and looks professional without it!

---

## Testing the Video

Once you add the video file:

1. Open `index.html` in your browser
2. The video should auto-play in the background
3. It will be muted and loop continuously
4. The teal overlay will be on top of the video

If the video doesn't play:
- Check the file path is correct
- Make sure the file is named exactly `dental-clinic.mp4`
- Try a different browser (Chrome works best for video)
- Check the video file isn't corrupted

---

## Video Specifications

For best performance, your video should be:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 or 1280x720
- **Duration**: 10-30 seconds (it will loop)
- **File Size**: Under 10MB for fast loading
- **Frame Rate**: 30fps

---

## Need Help?

If you have any issues adding the video, the website will continue to work perfectly with the background image. The design is built to be flexible!
