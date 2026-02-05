===========================================================
    INTERACTIVE 3D TILT PROPOSAL - PROJECT OVERVIEW
===========================================================

[DESCRIPTION]
An interactive, high-engagement web experience designed for 
proposals or special messages. The project features a 
dynamic 3D tilting card, a "runaway" No button, and a 
hidden letter mechanic.

[CORE FEATURES]
* 3D Tilt Effect: Responds to Mouse (Desktop), Touch (Mobile),
  and Gyroscope (Mobile Device Orientation).
* Persistent Music: Auto-starts on first user interaction 
  with manual toggle controls.
* "No" Button Logic: Moves randomly when hovered or touched, 
  becoming increasingly difficult to click while changing 
  text phrases.
* Dynamic Scaling: The central heart shape grows larger 
  each time the "No" button is attempted.
* Success State: Confetti/Sparkle animation upon clicking 
  "Yes" and a hidden message bottle reveal.

[FILE STRUCTURE]
* index.html  - The structural layout and UI elements.
* style.css   - Custom animations, glassmorphism, and layout.
* script.js    - The combined logic for tilt, music, and interaction.

[TECHNICAL NOTES]
* Tilt Physics: Limited to +/- 20 degrees to maintain 
  readability and UI integrity.
* Mobile Support: Includes specific handling for touch 
  events and iOS/Android gyroscope orientation.
* Compatibility: Optimized for modern browsers. iOS users 
  may need to interact with the screen once to trigger 
  audio/gyroscope permissions depending on browser settings.

[HOW TO CUSTOMIZE]
1. Phrases: Edit the 'noPhrases' array in script.js to 
   personalize the runaway button text.
2. Sensitivity: Adjust the divisor in handleTilt() to 
   increase or decrease rotation speed.
3. Assets: Replace 'bgMusic' and image sources in the 
   HTML to swap the theme.

===========================================================
                Created with Love & Code
===========================================================
