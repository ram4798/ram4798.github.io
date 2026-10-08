import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';
import { profile } from '../content';
import type { ReactNode } from 'react';

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span>{number}</span><span className="label-line" aria-hidden="true" />{children}</p>;
}

export function ResumeLink({ className = 'button button-outline' }: { className?: string }) {
  return <a className={className} href={profile.resume} download="Rama-Gangumalla-Resume.pdf">Download Resume<ArrowDownToLine size={17} aria-hidden="true" /></a>;
}

export function ExternalArrow() { return <ArrowUpRight size={19} aria-hidden="true" />; }

export function Tags({ items }: { items: string[] }) {
  return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
