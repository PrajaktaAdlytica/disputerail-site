# DisputeRail homepage — design QA

Updated: 16 October 2026. Scope: all 30 approved IA routes, synthetic demo, homepage intro film, responsive layouts, and the Vercel static deployment setup.

Status: build and automated demo/hosting checks pass. The detailed browser findings below include the earlier interaction and responsive checks; the current final pass also confirmed that the intro is present above the hero, the site presents synthetic records and human approval boundaries, and no real delivery, bank writes, or authentication is implied. This is prototype QA, not a legal review, accessibility certification, performance guarantee, or production banking approval.

## Visual evidence and comparison

Source: `../disputerail-riso-casework-v2.png`, reviewed together with actual browser captures. `docs/source-comparison.jpg` places the source opening and browser opening at equal widths in one comparison image. Source is 1086 × 1448; its opening/teal-process area is compared with the 1440 × 900 browser viewport. This checks composition and visual direction, not a claim of a pixel-identical poster reproduction: the user subsequently selected the Case Fold logo, approved the brand-kit typography, and requested full-height chapters with the complete IA.

Real browser evidence: `docs/home-desktop.jpg`, `docs/home-mobile.jpg`, `docs/home-tablet.jpg`, `docs/evidence-desktop.jpg`, `docs/review-desktop.jpg`, `docs/controls-desktop.jpg`, `docs/offers-desktop.jpg`, `docs/demo-correction-desktop.jpg`. Desktop captures use 1440 × 900; the principal mobile capture uses 390 × 844. Screenshots with interactive content reflect their captured demo state, not live financial records.

## Findings corrected during comparison

1. Hero case details were too small and the printed folder edge was hidden. Enlarged the dossier type and adjusted its inset so the source-like layered edge stays visible.
2. Native anchor navigation applied both scroll padding and scroll margin, creating an excessive gap. Removed the duplicate offset; browser measurement now puts the evidence chapter at 84px under the sticky header.
3. Collapsed offers initially showed only short tags. They now expose the complete distinct job descriptions; each expanded panel supplies the module artifact and details.
4. The mobile dossier was too dense. Stacked its identity/details, enlarged key text and preserved warning/reviewer states.
5. Moved original illustration masters out of public assets. The dossier ships as lossless WebP and the review illustration as optimized WebP.

## Visual checks

| Area | Result |
| --- | --- |
| Typography | Bold five-line sans opening; editorial Fraunces section emphasis; local fonts loaded; labels, values and warnings remain real selectable HTML |
| Layout and spacing | Balanced opening text/dossier split, ruled evidence spread, distinct module index, investigator scene and controls ledger; chapter-sized compositions; sticky-header anchor offset verified |
| Color and tokens | Approved cream/navy/teal/orange system, mint and peach chapter surfaces, red reserved for evidence errors; controls chapter uses reversed ink/paper hierarchy |
| Image quality | Textured dossier edges and original Riso investigator artwork; no stretched assets, stock brand logos or rasterized product text; illustrations include appropriate alt text |
| Copy and states | Issuer-side scope, all five proposed jobs, explicit synthetic labels, missing authorization, source/version, held notice, unsupported Reg Z and hypothetical prices are visible |
| Responsive behavior | No document horizontal overflow at 1440, 768, 390 or 320 CSS pixels. Mobile menu, single-column evidence/demo/pilot layout and stacked footer checked. Taller mobile sections retain natural scrolling |

## Functional browser checks

- All five offer buttons expanded the expected job/panel. The pilot selector carries the selected offer into the inquiry.
- Calculation disclosure showed the ten counted illustrative business days, assumptions, conditional outer date, source and non-approved rule-pack status. Escape closed the dialog and returned focus to its trigger.
- The classification demo was tested from Reg E to unsupported Reg Z with a correction reason. It cleared dates and provisional-credit proposals, required approval again and retained the old state in history. Correcting back recalculated fixture dates without restoring approval. Reset restored the original synthetic state.
- Required empty inquiry fields prevented preparation. A synthetic local inquiry produced an explicit “not sent” draft state, with no registered pilot or subscription claim. Closing returned to the page.
- FAQ expanded and collapsed with its correct answer. Mobile navigation reached the pilot chapter. Menus, footer actions, privacy and source disclosures are functional, with no dead placeholder routes.
- Motion toggle was tested both ways. Paused mode keeps all content readable and restores native scrolling; enabled mode initializes Lenis. CSS and initialization honor the OS reduced-motion preference. OS preference switching was inspected in code, not emulated through an unsupported browser API.
- Keyboard Tab produced a visible solid focus outline. Native modal focus containment, Escape handling, labelled inputs, skip link and heading hierarchy are present. This is a targeted keyboard/structure check, not a claim of a complete assistive-technology audit.
- Browser console error query returned no application errors during the final check.

## Build checks

`npm run build` passed. `npm run test:sites` passed all four hosting/packaging tests. Required client/server/hosting output exists.

## Known launch dependencies

No real form delivery, CRM, analytics provider, account authentication, company social URLs, public deployment or custom domain is connected. The UI accurately labels these boundaries. Full product/offer pages, an expanded product demo and institution-specific reviewed rule packs are later phases. Homepage polish does not meet the separate live-pilot governance gates or establish product accuracy/buyer demand.

## Scroll motion correction

The user rejected the initial entrance-only motion. Replaced it with eight pinned sheet transitions: incoming chapters rise over the preceding page while the outgoing content scales back and dims; headings unmask, artifacts stage in and the investigator illustration wipes into view. Native scrolling determines progress and reverses it. Long chapters scroll to their end before pinning, preserving their content. Pause/reduced-motion mode removes all pins.

Browser verification on the live preview found eight pin spacers after reload and no application console errors. On forward scroll, the opening content reached scale 0.9541 at scrollY 442 with the next sheet at y384. Reverse scroll returned it to scale 0.9804 at scrollY 201 with the next sheet at y625. `docs/scroll-page-transition.jpg` is the actual mid-transition capture. Build and four runtime tests passed after the motion change.

Pause was verified with zero pin spacers. Mobile chapter navigation was rechecked after explicitly resuming Lenis before a chapter jump: Controls settled at top 72px beneath the header, with its heading mask cleared (`none`), eight story pins active and no horizontal overflow. The preview is left at the opening with motion enabled.

## Clean chapter resting positions

User reported a strip of a subsequent chapter after scrolling. Added settling only between readable chapter ranges and measured the real header height for minimum chapter coverage. Tall chapter interiors and the footer are excluded from snapping; motion pause tears down the settling listener and timer.

At the actual 775 × 804 browser viewport (72px header), a partial downward gesture settled the problem chapter at top 72px with the next chapter at y807, below the viewport. The next downward transition settled evidence at top 72px, with offers at y872. `docs/chapter-clean-rest.jpg` captures the complete settled problem chapter with no following-section strip. Build and all four runtime tests passed.

## Slower turns and momentum guard — supersedes settle-only behavior

The user still observed excessive speed and the following-sheet peek with free wheel momentum. Replaced the delayed settle approach with a one-chapter gesture controller. Turns now use a 1.5-second eased movement; further wheel/trackpad momentum is consumed until the turn finishes and the input has been quiet for 360ms. Longer content scrolls within bounded chapter ranges before a separate gesture advances. Touch gestures use the same controller; actual touchscreen behavior remains to be checked on a touch device.

Live browser regression: two successive large downward inputs (each three viewport pages) during a turn still landed only on `problem` at scrollY 754, chapter top 72px; the next chapter began at 807px, below the 804px viewport. A separate gesture advanced to evidence at scrollY 1489, top72px. A subsequent large input scrolled its longer content only to scrollY1557; offers remained at y804, outside the viewport. Pause removed all eight pins and the paged-input marker. Build and all four runtime tests passed. Actual proof: `docs/chapter-single-turn.jpg`.

## Repeated-input scroll blockage correction

The quiet-period momentum guard could perpetually consume repeated wheel events because every event refreshed `lastInput`. Removed that condition and its state. The guard now expires after the fixed 1.5-second turn and is never extended by wheel input. Repeated browser scroll batches progressed from the opening through the problem/evidence chapters to offers; the offers chapter settled at top72px, scrollY2289. Build and all four runtime tests passed. This supersedes the earlier quiet-input guard requirement.

Reverse scrolling was also checked from offers (scrollY2289) back to evidence (scrollY1557), then to the evidence heading at top72px (scrollY1489). The following offer section remained below the viewport at y872. Both existing homepage preview tabs were refreshed to load the corrected controller. Actual capture: `docs/scroll-restored.jpg`.

## Separate pages / 15 October 2026

Extended the approved homepage into all 30 IA routes. Reused the local CaseFold logo, fonts, ink palette, textures, icons and route-specific animated hero scenes. New marketing chapters use the existing 1.5-second single-sheet controller. Forms and case workbench use ordinary scrolling for detailed interaction. Homepage scroll timing and momentum guard are preserved.

Browser validation:
- Opened every route at 390 × 844: one H1, no horizontal document overflow, no broken loaded images. Checked representative 1440 × 900 module, sign-in, report and product compositions.
- Checked a separate module page turn: current chapter settled at top 86px, next chapter began at 903px for a 900px viewport. No following-sheet sliver at rest.
- Verified mobile menu navigates to its selected module. Homepage Explore demo navigates to /demo. Corner-fold focus has a 145-degree Y turn with the old shutter hidden; shared CSS handles hover identically.
- Exercised the ten-record queue and full CASE-E14 flow: confirm classification → reject unsupported suggestion → advance synthetic evidence → approve credit proposal → load synthetic completion → explicit reviewer checklist/rationale → generate draft → acknowledge and approve draft → current report. Never performed an external action.
- Switched approved case to credit-card billing: both Reg E dates invalidated; finding, credit proposal and notice approval reset. Report reflects held state. Material corrections also clear reviewer acknowledgments; queue status derives from the replay.
- Validated sign-in preview response without credential lookup or sent email. Completed local pilot form with selected offer 3 and separate unchecked update consent. Found and fixed confirmation appearing below the viewport: local draft now receives focus and scrolls into view.
- Browser warnings exposed a homepage-specific #opening selector on the problem page's reused dossier. Replaced the trigger with the first local chapter fallback, without changing homepage motion.

Automated checks: production build and all eight demo-state/hosting tests pass. Vendor and motion chunks are separated; no oversized-bundle warning remains. Actual screenshots are in docs/module-desktop.png, module-mobile.png, sign-in-desktop.png, case-mobile.png, report-desktop.png and separate-pages-desktop.png.

Remaining production dependencies: authentication, form delivery, verified controller/contact/deletion route, approved legal/rule content and institutional pilot gates. These are explicitly disclosed in the interface. This pass delivers the local frontend requested; it does not claim a live banking product or public deployment.


## Expressive chapter refinement / 16 October 2026

User requested different entrance styles and a more vivid, visual scroll story. Implemented eight reversible scene reveals using React-owned `.story-scene` wrappers; the section anchors themselves stay untransformed. Kept the existing fixed-duration input guard and tall-section ranges. Added source/module SVG diagrams, traced relationships, date/illustration/icon staging and an animated module-artifact switch. Revised section environments with saturated orange and teal, cream paper, navy checkpoint and contrasting review-step cards.

Browser verification at 1440 × 900: observed the human-review circular reveal in progress, completed orange problem, teal offers, contrasting evidence and ink control scenes. Forward wheel input advanced evidence → offers; reverse wheel input returned review → offers and controls → demo. Settled scene transforms reach identity. The following scene remains masked/off-canvas until its own transition.

At 390 × 844: verified mobile homepage still state, source illustration, platform hero and mobile scene settling at the measured 68px header. Found off-canvas secondary-page sheets extending the document to 780px and fixed this with horizontal clipping on main; document width then equalled 390px. Pause motion removed every pin spacer and left zero transformed or hidden scenes; re-enabling restored the varied sequence. Tall mobile chapter content remains readable through interior scrolling. No case data, clocks, approvals, form delivery or authentication behavior was changed.

Build and all eight existing case-state/hosting tests pass. Captures: docs/motion-review-refresh.png and docs/motion-evidence-refresh.png.
