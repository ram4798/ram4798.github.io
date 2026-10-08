import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Database, Layers3, X } from 'lucide-react';
import { caseStudies } from '../content';
import type { CaseStudy } from '../content';
import { SectionLabel, Tags } from './shared';

function Pipeline({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return <div className={`pipeline ${compact ? 'is-compact' : ''}`} aria-label={`Conceptual process: ${steps.join(', then ')}`}>
    {steps.map((step, index) => <div className="pipeline-item" key={step}><div className="pipeline-node"><span className="pipeline-step" aria-hidden="true">{index === 0 ? <Database size={18} /> : index === steps.length - 1 ? <Layers3 size={18} /> : <span className="node-square" />}</span><span>{step}</span></div>{index < steps.length - 1 && <ArrowRight className="pipeline-connector" size={14} aria-hidden="true" />}</div>)}
  </div>;
}

function CaseStudyDialog({ study, dismiss }: { study: CaseStudy; dismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    close.current?.focus();
    return () => { document.body.style.overflow = priorOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="case-dialog" aria-labelledby="case-dialog-title" onCancel={event => { event.preventDefault(); dismiss(); }} onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
    <div className="dialog-inner">
      <div className="dialog-top"><span className="eyebrow">PROFESSIONAL WORK / {study.company}</span><button ref={close} type="button" className="icon-button" aria-label="Close case study" onClick={dismiss}><X size={22} /></button></div>
      <p className="dialog-category">{study.kind}</p>
      <h2 id="case-dialog-title">{study.title}</h2>
      <p className="dialog-intro">{study.description}</p>
      <Tags items={study.technologies} />
      <div className="dialog-section"><h3>The context</h3><p>{study.context}</p></div>
      <div className="dialog-pipeline"><Pipeline steps={study.pipeline} /><p>Conceptual process</p></div>
      <div className="dialog-section"><h3>What I built</h3><ul>{study.built.map(item => <li key={item}>{item}</li>)}</ul></div>
      {study.outcome && <div className="dialog-outcome"><strong>{study.outcome.value}</strong><div><h3>{study.outcome.label}</h3><p>{study.outcome.context}</p></div></div>}
      <p className="dialog-source">Based on professional experience. The diagram illustrates the process and contains no internal application data.</p>
    </div>
  </dialog>;
}

export function Work() {
  const [active, setActive] = useState(caseStudies[0].id);
  const [detail, setDetail] = useState<CaseStudy | null>(null);
  return <section id="work" className="section work-section" aria-labelledby="work-title">
    <div className="container">
      <SectionLabel number="03">PROFESSIONAL WORK</SectionLabel>
      <div className="section-heading" data-reveal><h2 id="work-title">Selected <em>work.</em></h2><p>A closer look at the systems<br />I’ve helped build.</p></div>
      <div className="work-panels">{caseStudies.map(study => {
        const selected = study.id === active;
        return <article key={study.id} className={`work-panel ${selected ? 'is-active' : ''}`} aria-labelledby={`title-${study.id}`}>
          <h3 id={`title-${study.id}`} className="sr-only">{study.title}</h3>
          <button type="button" className="panel-select" onClick={() => setActive(study.id)} aria-expanded={selected} aria-controls={`preview-${study.id}`} aria-label={`Explore ${study.title}`}><span className="panel-number">{study.number}</span><span className="panel-company">{study.company}</span><span className="panel-title">{study.shortTitle}</span><span className="panel-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span></button>
          <div id={`preview-${study.id}`} className="panel-content" hidden={!selected}>
            <span className="eyebrow">{study.kind}</span>
            <p className="panel-description">{study.description}</p>
            <Pipeline steps={study.pipeline} compact />
            <Tags items={study.technologies} />
            <div className="panel-bottom">{study.outcome ? <p className="panel-outcome"><strong>{study.outcome.value}</strong><span>{study.outcome.label}</span></p> : <p className="panel-outcome-text">{study.id === 'workflow-platform' ? 'From workflow discovery to lab submission.' : 'Current data. Flexible exploration.'}</p>}<button className="text-link" type="button" onClick={() => setDetail(study)}>View Details<ArrowUpRight size={18} aria-hidden="true" /></button></div>
          </div>
        </article>;
      })}</div>
      <div className="work-note"><span className="availability-dot" />Professional case studies from AMD and Wayfair. Select a panel to explore.</div>
    </div>
    {detail && <CaseStudyDialog study={detail} dismiss={() => setDetail(null)} />}
  </section>;
}
