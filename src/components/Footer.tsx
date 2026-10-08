import { ArrowUp } from 'lucide-react';
import { profile } from '../content';

export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a href="#top" className="wordmark" aria-label="Back to top">Rama<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><a href="#top" className="back-to-top">Back to top<ArrowUp size={15} aria-hidden="true" /></a></div></footer>;
}
