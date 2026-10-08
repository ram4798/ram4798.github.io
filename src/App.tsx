import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.setAttribute('data-seen', 'true'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
    elements.forEach(element => { element.classList.add('reveal-enabled'); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('reveal-enabled')); };
  }, []);
  return <div id="top"><Navigation /><main id="main"><Hero /><About /><Skills /><Work /><Experience /><Credentials /><Contact /></main><Footer /></div>;
}
