import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Volume2, VolumeX } from 'lucide-react';
import { profile } from '../content';
import { ResumeLink } from './shared';

const autoplayBlocked = (failure: unknown) => failure instanceof DOMException && failure.name === 'NotAllowedError';

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const autoplayAttempted = useRef(false);
  const playRequest = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState('');

  const pause = () => { playRequest.current += 1; video.current?.pause(); };

  useEffect(() => {
    if (!scene.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }, { threshold: .1 });
    observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);

  const play = async (restart: boolean, automatic = false) => {
    const media = video.current;
    if (!media) return;
    const request = ++playRequest.current;
    setError('');
    if (!loaded || error) { media.src = profile.video; media.load(); setLoaded(true); }
    if (restart || ended) { media.currentTime = 0; }
    if (restart || !loaded || ended || (!automatic && !visible)) { media.muted = false; setMuted(false); }
    setEnded(false);
    const failed = (failure: unknown) => {
      if (request !== playRequest.current) return;
      setVisible(false);
      setPlaying(false);
      if (!automatic || !autoplayBlocked(failure)) setError('The introduction couldn’t play. Please try again.');
    };
    try { await media.play(); } catch (failure) {
      if (request !== playRequest.current) return;
      if (automatic && autoplayBlocked(failure)) {
        media.muted = true;
        setMuted(true);
        try { await media.play(); } catch (fallbackFailure) { failed(fallbackFailure); }
      } else { failed(failure); }
    }
  };

  useEffect(() => {
    if (autoplayAttempted.current) return;
    autoplayAttempted.current = true;
    void play(true, true);
  }, []);

  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-inner container">
      <div className="hero-copy">
        <p className="hero-intro"><span className="small-cross" aria-hidden="true">✳</span>HI, I’M RAMA GANGUMALLA</p>
        <h1 id="hero-title">Data<br />Engineer<span className="accent-period">.</span></h1>
        <p className="hero-description">I build data pipelines, analytics platforms, and tools that help teams make sense of their data.</p>
        <p className="hero-expertise">Python <span>·</span> SQL <span>·</span> Databricks <span>·</span> Azure <span>·</span> Power BI</p>
        <div className="hero-actions"><a href="#work" className="button button-primary">View My Work<ArrowUpRight size={19} aria-hidden="true" /></a><ResumeLink /></div>
        <p className="hero-location"><MapPin size={14} aria-hidden="true" />Based in Austin, Texas</p>
        {error && <p className="video-error" role="alert">{error}</p>}
      </div>
      <div className="hero-art" ref={scene}>
        <div className="hero-poster"><img src={profile.hero} width="1196" height="995" alt="Rama seated at a desk beside a monitor in a softly lit technology workspace" fetchPriority="high" /></div>
        <video ref={video} className={`hero-video ${visible ? 'is-visible' : ''}`} preload="auto" playsInline loop={false} aria-label="Rama’s spoken portfolio introduction" onPlaying={() => { setVisible(true); setPlaying(true); }} onPause={() => setPlaying(false)} onEnded={() => { playRequest.current += 1; setPlaying(false); setEnded(true); setVisible(false); }} onError={() => { playRequest.current += 1; setError('The introduction couldn’t play. Please try again.'); setVisible(false); setPlaying(false); }} />
        <button type="button" className="video-toggle" aria-label={playing ? 'Pause introduction' : visible && !ended ? 'Resume introduction' : 'Play introduction'} title={playing ? 'Click the video to pause' : 'Click the video to play'} onClick={() => playing ? pause() : void play(ended)} />
        <div className="scene-blend" aria-hidden="true" />
        <span className="scene-caption"><span className="availability-dot" />DATA. SYSTEMS. POSSIBILITIES.</span>
        {loaded && <div className="video-controls" aria-label="Introduction video controls">
          <button type="button" aria-label={muted ? 'Unmute introduction' : 'Mute introduction'} aria-pressed={muted} onClick={() => { const next = !muted; if (video.current) video.current.muted = next; setMuted(next); }}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button>
        </div>}
      </div>
      <div className="hero-bottom"><a href="#about" className="scroll-note"><ArrowDown size={15} aria-hidden="true" />A LITTLE MORE ABOUT ME</a><span className="hero-bottom-note">Pipelines to platforms.</span></div>
    </div>
  </section>;
}
