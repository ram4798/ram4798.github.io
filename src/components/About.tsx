import { useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { profile } from '../content';
import { SectionLabel } from './shared';
import type { PointerEvent } from 'react';

export function About() {
  const card = useRef<HTMLDivElement>(null);
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    card.current?.style.setProperty('--tilt-x', `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * -5}deg`);
    card.current?.style.setProperty('--tilt-y', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 5}deg`);
  };
  const reset = () => { card.current?.style.setProperty('--tilt-x', '0deg'); card.current?.style.setProperty('--tilt-y', '0deg'); };

  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <div className="container">
      <SectionLabel number="01">ABOUT ME</SectionLabel>
      <div className="about-layout">
        <div className="about-copy" data-reveal>
          <h2 id="about-title">Hi, I’m <em>Rama.</em></h2>
          <p className="about-lead">I like making complex data<br className="desktop-break" /> useful to the people who need it.</p>
          {profile.bio.map(paragraph => <p key={paragraph} className="body-copy">{paragraph}</p>)}
          <a className="text-link" href="#experience">Follow my journey<ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="profile-wrap" data-reveal>
          <div ref={card} className="profile-card" onPointerMove={tilt} onPointerLeave={reset}>
            <div className="profile-card-top"><span>Rama Gangumalla</span><span aria-hidden="true">↗</span></div>
            <div className="profile-photo"><img src={profile.portrait} width="1206" height="793" loading="lazy" decoding="async" alt="Portrait of Rama Gangumalla" /><div className="profile-photo-shade" /></div>
            <div className="profile-info"><h3>{profile.name}</h3><p>{profile.role}</p><div className="profile-meta"><span><MapPin size={12} aria-hidden="true" />Austin, TX</span><span className="profile-id">RG / DE</span></div><p className="profile-tools">Python / SQL / Databricks / Azure</p></div>
          </div>
          <span className="card-note">A little structure. A lot of curiosity.</span>
        </div>
      </div>
      <dl className="highlights" data-reveal>
        <div><dt>Experience</dt><dd>4<span>+</span></dd><dd className="metric-caption">Years building data systems</dd></div>
        <div><dt>AMD · Daily volume</dt><dd className="metric-word">Millions</dd><dd className="metric-caption">Performance-test results processed</dd></div>
        <div><dt>AMD · Processing</dt><dd>25<span>%</span></dd><dd className="metric-caption">Less processing time vs. prior Spark jobs</dd></div>
        <div><dt>Wayfair · Reporting</dt><dd>30<span>%</span></dd><dd className="metric-caption">Lower reporting-query runtime</dd></div>
      </dl>
    </div>
  </section>;
}
