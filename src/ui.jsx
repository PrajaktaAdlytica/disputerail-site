import React from 'react';
export function Icon({name,className='',...props}){return <svg className={`icon ${name==='arrow-down'?'icon-down':''} ${className}`} aria-hidden="true" {...props}><use href={`/brand/icons/sprite.svg#${name==='arrow-down'?'arrow-right':name==='alert-triangle'?'warning':name}`}/></svg>}
export function Arrow(){return <span className="arrow-slot" aria-hidden="true"><Icon name="arrow-up-right"/><Icon name="arrow-up-right"/></span>}
export function Button({children,onClick,href,variant='',className='',hover='flip',...props}){const Tag=href?'a':'button';return <Tag href={href} onClick={onClick} className={`button ${hover} ${variant} ${className}`} {...props}><span>{children}</span><Arrow/>{hover==='flip'&&<i className="corner-fold" aria-hidden="true"/>}</Tag>}
export function Stamp({children,className=''}){return <span className={`stamp ${className}`}>{children}</span>}
export function Folio({number,label,dark=false}){return <div className={`folio ${dark?'light':''}`}><span>{number}</span><span>{label}</span><span className="folio-rule"/><span>DisputeRail / field notes</span></div>}
export function ChapterHeading({eyebrow,children,copy}){return <div className="chapter-heading"><p className="eyebrow">{eyebrow}</p><h2>{children}</h2>{copy&&<p className="chapter-lead">{copy}</p>}</div>}
export const offerSlug=o=>o.name.toLowerCase().replaceAll(' ','-');
