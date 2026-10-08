import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Linkedin } from 'lucide-react';
import { profile } from '../content';
import { ResumeLink, SectionLabel } from './shared';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(profile.email);
      else {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const field = document.createElement('textarea');
        field.value = profile.email;
        field.setAttribute('aria-hidden', 'true');
        field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.appendChild(field); field.select();
        const ok = document.execCommand('copy'); field.remove(); previous?.focus();
        if (!ok) throw new Error('Copy unavailable');
      }
      setCopyStatus('copied');
    } catch { setCopyStatus('failed'); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyStatus('idle'), 4000);
  };
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <div className="container contact-container">
      <SectionLabel number="06">GET IN TOUCH</SectionLabel>
      <div className="contact-heading" data-reveal><h2 id="contact-title">Let’s build<br />something <em>useful.</em></h2><ArrowUpRight className="contact-arrow" size={132} strokeWidth={1} aria-hidden="true" /></div>
      <p className="contact-description" data-reveal>Have a data engineering opportunity or a project in mind?<br />Let’s connect.</p>
      <div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Email Me<ArrowUpRight size={18} aria-hidden="true" /></a><a className="button button-outline" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Linkedin size={16} aria-hidden="true" /></a><ResumeLink className="button button-quiet" /></div>
      <div className="copy-email"><span>{profile.email}</span><button type="button" className="copy-button" aria-label={copyStatus === 'copied' ? 'Email address copied' : 'Copy email address'} onClick={() => void copyEmail()}>{copyStatus === 'copied' ? <Check size={15} /> : <Copy size={15} />}</button><span className="copy-status" role="status">{copyStatus === 'copied' ? 'Copied!' : copyStatus === 'failed' ? 'Copy didn’t work. Use the email link above.' : ''}</span></div>
    </div>
  </section>;
}
