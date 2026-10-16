import React, {useEffect, useRef, useState} from 'react';
import {Icon} from './ui';
import './homeIntro.css';

// The intro is a real first section, not a modal or a timed scroll lock.
export function HomeIntro({motion, onContinue, onVisibilityChange}) {
 const section = useRef(null);
 const film = useRef(null);
 const [playing, setPlaying] = useState(false);
 const [completed, setCompleted] = useState(false);
 const [failed, setFailed] = useState(false);
 const hasAdvanced = useRef(false);
 const visibilityCallback = useRef(onVisibilityChange);
 visibilityCallback.current = onVisibilityChange;

 useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
   const visible = entry.intersectionRect.height > 1;
   visibilityCallback.current(visible);
   if (!visible) film.current?.pause();
  }, {threshold: [0, 0.001, 0.01]});
  observer.observe(section.current);
  return () => observer.disconnect();
 }, []);

 useEffect(() => {
  const video = film.current;
  if (!motion || window.location.hash) {
   video.pause();
   return;
  }
  if (section.current.getBoundingClientRect().bottom > 0) {
   video.play().catch(() => setPlaying(false));
  }
 }, [motion]);

 function advance() {
  film.current.pause();
  hasAdvanced.current = true;
  onContinue();
 }
 function ended() {
  setCompleted(true);
  if (!hasAdvanced.current && section.current.getBoundingClientRect().bottom > 0) advance();
 }
 function togglePlayback() {
  const video = film.current;
  if (!video.paused) video.pause();
  else {
   if (video.ended) {video.currentTime = 0; hasAdvanced.current = false; setCompleted(false);}
   video.play().catch(() => setPlaying(false));
  }
 }
 return <section ref={section} id="brand-intro" className="home-intro" aria-label="DisputeRail coastal railway introduction" data-lenis-prevent>
  <video ref={film} className="home-intro-film" muted playsInline preload={motion?'auto':'none'}
   poster="/video/disputerail-intro-poster.jpg" autoPlay={motion && !window.location.hash}
   onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={ended}
   onError={() => {setFailed(true); setPlaying(false);}}
   aria-label="Coastal train journey. One allegation. Every source. A human decision. Prepare Regulation E case files; investigators decide.">
   <source src="/video/disputerail-coastal-intro.mp4" type="video/mp4"/>
  </video>
  <div className="intro-mobile-caption" aria-hidden="true"><span>DisputeRail / Opening film</span><p>One allegation.<br/>Every source.<br/><em>A human decision.</em></p></div>
  <div className="intro-film-controls">
   <span className="intro-film-label">{failed?'Film unavailable — continue below.':completed?'The next chapter: case preparation.':'Opening film / 10 seconds'}</span>
   <div>
    {!failed && <button type="button" className="intro-control" onClick={togglePlayback} aria-label={playing?'Pause intro':completed?'Replay intro':'Play intro'}><Icon name={playing?'pause':'play'}/><span>{playing?'Pause':completed?'Replay':'Play'}</span></button>}
    <button type="button" className="intro-control intro-continue" onClick={advance}><span>{completed||failed||!motion?'Continue to homepage':'Skip intro'}</span><Icon name="arrow-right"/></button>
   </div>
  </div>
 </section>;
}
