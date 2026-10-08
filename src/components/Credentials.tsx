import { Award, GraduationCap } from 'lucide-react';
import { certifications, education } from '../content';
import { SectionLabel } from './shared';

export function Credentials() {
  return <section id="credentials" className="section credentials-section" aria-labelledby="credentials-title">
    <div className="container">
      <SectionLabel number="05">FOUNDATIONS</SectionLabel>
      <h2 id="credentials-title" data-reveal>Always <em>learning.</em></h2>
      <div className="credentials-layout">
        <div className="credential-group" data-reveal><h3 className="credential-label"><GraduationCap size={21} aria-hidden="true" />EDUCATION</h3>{education.map(item => <article className="education-item" key={item.degree}><p className="credential-date">{item.dates}</p><h4>{item.degree}</h4><p className="credential-field">{item.field}</p><p className="credential-school">{item.school}</p></article>)}</div>
        <div className="credential-group certification-group" data-reveal><h3 className="credential-label"><Award size={21} aria-hidden="true" />CERTIFICATIONS</h3>{certifications.map((item, index) => <article className="certification-item" key={item}><span className="certification-symbol" aria-hidden="true">{index === 0 ? 'aws' : <span className="microsoft-mark"><i /><i /><i /><i /></span>}</span><h4>{item}</h4></article>)}<p className="credential-note">Continuing to build on the fundamentals<br />of data engineering and cloud platforms.</p></div>
      </div>
    </div>
  </section>;
}
