# Homepage intro integration

The approved 10-second coastal railway film is rendered with Remotion to `public/video/disputerail-coastal-intro.mp4` (H.264, 1920 × 1080, 30 fps, muted). The JPEG poster is approximately 90% smaller than the PNG preview.

`HomeIntro.jsx` inserts a full-height film section before the sticky site header and hero. Native `ended` calls the existing Lenis chapter navigation to land on `opening`. The header, chapter navigation and global motion toggle are hidden while the film intersects the viewport; their measured geometry remains intact. The film pauses off-screen and does not loop or auto-advance again after returning. Native scroll remains available above the first chapter anchor.

The film has Pause/Play, Skip/Continue and Replay controls. Reduced-motion or paused-site-motion mode starts with a poster. Autoplay rejection leaves Play and Continue available. Media errors leave Continue available. Mobile keeps the complete landscape composition visible and uses separate legible introductory copy. Film controls do not obscure the concept-preview disclosure.

Verified in the browser:
- Fresh desktop visit autoplayed the 10-second film and landed on the hero at scroll 720, with its top at header height 86 and the navbar visible.
- Pause stopped playback during the intro; the navbar remained hidden.
- At 390 × 844, no horizontal overflow; Continue landed at scroll 844 with the hero top equal to the 68px header.
- Chapter navigation still advanced into the existing story after the handoff.
- Toggling site motion preserves the hero position; scroll anchoring is disabled around pin-spacer changes.
- Production build and all four Sites packaging checks passed.

No publication or deployment was performed.
