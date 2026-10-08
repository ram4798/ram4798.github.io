import { ArrowUpRight } from 'lucide-react';
import { experience } from '../content';
import { SectionLabel, Tags } from './shared';

export function Experience() {
  return <section id="experience" className="section experience-section" aria-labelledby="experience-title">
    <div className="container">
      <SectionLabel number="04">THE JOURNEY SO FAR</SectionLabel>
      <div className="section-heading" data-reveal><h2 id="experience-title">Experience,<br /><em>in practice.</em></h2><p>Building, learning, and making<br />data a little more useful.</p></div>
      <ol className="timeline">{experience.map(item => <li className={`timeline-item ${item.current ? 'is-current' : ''}`} key={item.company} data-reveal>
        <div className="timeline-date"><span className="timeline-dot" aria-hidden="true" /><p>{item.dates}</p>{item.current && <span className="current-label">CURRENT</span>}</div>
        <div className="timeline-content"><p className="timeline-role">{item.role}</p><h3>{item.company}</h3><ul className="experience-bullets">{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><Tags items={item.tags} /></div>
      </li>)}<li className="timeline-next"><span className="timeline-dot next-dot" aria-hidden="true" /><span className="next-word">Next</span><a className="text-link" href="#contact">Let’s see what we can build together<ArrowUpRight size={18} aria-hidden="true" /></a></li></ol>
    </div>
  </section>;
}
