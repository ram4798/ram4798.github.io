import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation, profile } from '../content';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let next = '';
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= Math.min(240, window.innerHeight * .3)) next = item.id;
      }
      setActive(next);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => { window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [open]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={header} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell container">
        <a className="wordmark" href="#top" aria-label="Rama Gangumalla, back to top">Rama<span>.</span></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        <nav id="main-navigation" aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
          {navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => { setActive(item.id); setOpen(false); }}>{item.label}</a>)}
        </nav>
        <a className="nav-email" href={`mailto:${profile.email}`} aria-label="Email Rama"><span className="availability-dot" />Let’s connect<span aria-hidden="true">↗</span></a>
      </div>
    </header>
  </>;
}
