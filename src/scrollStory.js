import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Independent printed scenes reveal from different directions and masks.
// Their measured scroll anchors stay fixed; every entrance reverses on scroll.
export function createScrollStory(root, smooth) {
  const pages = gsap.utils.toArray('.chapter', root);
  const header = () => document.querySelector('.site-header').offsetHeight;
  const available = () => window.innerHeight - header();
  const measureHeader = () => root.style.setProperty('--story-header', `${header()}px`);
  measureHeader();
  ScrollTrigger.addEventListener('refreshInit', measureHeader);

  // Animate a visual sheet without transforming the measured section itself.
  // Cancelling its natural vertical travel makes side/shutter/iris entrances real,
  // while keeping the proven scroll ranges and fixed input guard unchanged.
  const styles = ['slide-right','shutter','slide-left','iris','diagonal','split','unfold','ink'];
  const masks = {
    shutter: ['inset(50% 0% 50% 0%)','inset(0% 0% 0% 0%)'],
    iris: ['circle(0% at 73% 48%)','circle(150% at 73% 48%)'],
    diagonal: ['polygon(0% 0%,0% 0%,-35% 100%,-35% 100%)','polygon(0% 0%,135% 0%,100% 100%,0% 100%)'],
    split: ['inset(0% 50% 0% 50%)','inset(0% 0% 0% 0%)'],
    ink: ['circle(0% at 15% 80%)','circle(150% at 15% 80%)'],
  };
  pages.forEach((page,index) => {
    const scene=page.querySelector(':scope > .story-scene');
    if(scene)gsap.set(scene,{background:getComputedStyle(page).background,minHeight:'inherit'});
    gsap.set(page,{zIndex:index+1});
    if(index<pages.length-1)ScrollTrigger.create({
      id:`sheet-${page.id}`,trigger:page,
      start:()=>page.offsetHeight>available()+2?'bottom bottom':`top top+=${header()}`,
      end:()=>`+=${window.innerHeight}`,pin:true,pinSpacing:false,anticipatePin:1,invalidateOnRefresh:true,
    });
    if(!index||!scene)return;
    const style=styles[(index-1)%styles.length];page.dataset.transition=style;
    const from={y:()=>-available(),xPercent:style==='slide-right'?100:style==='slide-left'?-100:0,scale:style==='unfold'?.82:1,rotation:style==='unfold'?-5:0,opacity:style==='unfold'?0:1};
    const to={y:0,xPercent:0,scale:1,rotation:0,opacity:1,ease:'none',scrollTrigger:{trigger:page,start:'top bottom',end:()=>`top top+=${header()+2}`,scrub:true,invalidateOnRefresh:true}};
    if(masks[style]){from.clipPath=masks[style][0];to.clipPath=masks[style][1]}
    gsap.fromTo(scene,from,to);
    const previous=pages[index-1].querySelector('.chapter-inner, .hero-inner');
    if(previous)gsap.to(previous,{scale:.94,opacity:.65,rotation:style==='unfold'?2:0,ease:'none',scrollTrigger:{trigger:page,start:'top bottom',end:()=>`top top+=${header()}`,scrub:true,invalidateOnRefresh:true}});
    const sequence=gsap.timeline({scrollTrigger:{trigger:page,start:'top 92%',end:()=>`top top+=${header()+12}`,scrub:true,invalidateOnRefresh:true}});
    const heading=page.querySelectorAll('.chapter-heading h2');
    if(heading.length)sequence.from(heading,{x:style==='slide-left'?80:style==='slide-right'?-80:0,y:style==='shutter'?0:30,rotation:style==='unfold'?-3:0,opacity:.35,ease:'none'},0);
    const parts=page.querySelectorAll('.evidence-spread > *, .problem-file, .offer-row, .review-step, .controls-ledger article, .pilot-ticket, .demo-entry, .faq-list details, .fragment-sheet, .portfolio-row, .record-model article, .control-page-grid article, .resource-sheet, .commercial-sheet');
    if(parts.length)sequence.from(parts,{x:i=>style==='split'?(i%2?65:-65):style==='slide-left'?60:0,y:style==='iris'?0:35,rotation:style==='unfold'?3:0,opacity:.3,stagger:.045,ease:'none'},.1);
    const traces=page.querySelectorAll('.motion-trace');
    if(traces.length)sequence.from(traces,{strokeDashoffset:1,ease:'none',duration:.8},.1);
    const sheets=page.querySelectorAll('.diagram-sheet');
    if(sheets.length)sequence.from(sheets,{y:35,opacity:0,stagger:.07,transformOrigin:'50% 50%',ease:'none'},0);
    const date=page.querySelector('.big-date');
    if(date)sequence.from(date,{scale:.7,rotation:-8,transformOrigin:'30% 60%',ease:'none'},.2);
    const pictograms=page.querySelectorAll('.controls-ledger article > .icon, .control-page-grid article > .icon');
    if(pictograms.length)sequence.from(pictograms,{scale:.55,rotation:-18,stagger:.07,ease:'none'},.2);
    const illustration=page.querySelector('.investigator-scene img');
    if(illustration)sequence.from(illustration,{scale:1.14,rotation:3,transformOrigin:'60% 60%',ease:'none'},0);
  });

  if(root.querySelector('.dossier-wrap')) gsap.to('.dossier-wrap', {
    y: -90, rotation: -3, ease: 'none',
    scrollTrigger: { trigger: root.querySelector('#opening') || pages[0], start: 'top top', end: 'bottom top', scrub: true },
  });
  if(root.querySelector('.prep-step')) gsap.from('.prep-step', {
    y: 35, opacity: .3, stagger: .12, ease: 'none',
    scrollTrigger: { trigger: '.preparation-strip', start: 'top 97%', end: 'bottom 70%', scrub: true },
  });


  // One wheel/trackpad gesture turns one sheet. Consume the remaining momentum
  // only while the current animation is running. Input never extends this limit.
  // Tall sheets scroll within their own bounds before a new gesture turns them.
  let blockedUntil = 0;
  let touchY = null;
  let touchTravel = 0;
  root.dataset.storyMode = 'paged';
  const exempt = target => target instanceof Element && target.closest('dialog, .mobile-nav, input, textarea, select, [data-lenis-prevent]');
  const ranges = () => pages.map(page => {
    const anchor = page.parentElement.classList.contains('pin-spacer') ? page.parentElement : page;
    const start = Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - header());
    const overflow = Math.max(0, page.offsetHeight - available());
    return { page, start: Math.round(start), end: Math.floor(start + (overflow < 40 ? 0 : overflow)) };
  });
  const move = (delta, event) => {
    if (!delta || smooth.isStopped || exempt(event.target)) return;
    const bounds = ranges();
    const y = window.scrollY;
    // The opening film scrolls freely before the first chapter anchor.
    if (y < bounds[0].start - 5) return;
    const last = bounds[bounds.length - 1];
    // The footer has ordinary scrolling. Returning to the story is unrestricted.
    if (y > last.end + 4 || (y >= last.end - 4 && delta > 0)) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
    const now = performance.now();
    const busy = now < blockedUntil;
    if (busy) return;
    blockedUntil = 0;
    let index = bounds.findIndex((range, i) => y >= range.start - 5 && (i === bounds.length - 1 || y < bounds[i + 1].start - 5));
    index = Math.max(0, index);
    const current = bounds[index];
    const forward = delta > 0;
    const edge = forward ? current.end : current.start;
    if ((forward && y < edge - 5) || (!forward && y > edge + 5)) {
      const target = Math.max(current.start, Math.min(current.end, smooth.targetScroll + delta));
      if (Math.abs(target - edge) < 2) blockedUntil = now + 500;
      smooth.scrollTo(target, { duration: .4, force: true });
      return;
    }
    const next = bounds[index + (forward ? 1 : -1)];
    if (!next) return;
    blockedUntil = now + 1500;
    root.dataset.chapterTarget = next.page.id;
    smooth.scrollTo(forward ? next.start : next.end, {
      duration: 1.5,
      easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      force: true,
    });
  };
  const wheel = event => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? available() : 1);
    move(delta, event);
  };
  const touchStart = event => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
    touchTravel = 0;
  };
  const touchMove = event => {
    if (touchY === null || event.touches.length !== 1 || exempt(event.target)) return;
    const y = event.touches[0].clientY;
    const delta = touchY - y;
    touchY = y;
    touchTravel += delta;
    if (Math.abs(touchTravel) < 14) return;
    move(delta, event);
  };
  const touchEnd = () => { touchY = null; touchTravel = 0; };
  const releaseForNavigation = event => {
    if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, summary')) { blockedUntil = 0; }
  };
  window.addEventListener('wheel', wheel, { capture: true, passive: false });
  window.addEventListener('touchstart', touchStart, { passive: true });
  window.addEventListener('touchmove', touchMove, { capture: true, passive: false });
  window.addEventListener('touchend', touchEnd);
  window.addEventListener('pointerdown', releaseForNavigation);
  return () => {
    window.removeEventListener('wheel', wheel, true);
    window.removeEventListener('touchstart', touchStart);
    window.removeEventListener('touchmove', touchMove, true);
    window.removeEventListener('touchend', touchEnd);
    window.removeEventListener('pointerdown', releaseForNavigation);
    ScrollTrigger.removeEventListener('refreshInit', measureHeader);
    root.style.removeProperty('--story-header');
    delete root.dataset.storyMode;
    delete root.dataset.chapterTarget;
    pages.forEach(page=>delete page.dataset.transition);
  };
}
