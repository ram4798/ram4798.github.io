import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StrictMode } from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '../components/Navigation';
import { Skills } from '../components/Skills';
import { Work } from '../components/Work';
import { Hero } from '../components/Hero';
import { Contact } from '../components/Contact';
import { profile, skills } from '../content';
import { MockIntersectionObserver } from './setup';

describe('skills exploration', () => {
  it('highlights the selected category and keeps every skill readable', async () => {
    const user = userEvent.setup();
    const { container } = render(<Skills />);
    await user.click(screen.getByRole('button', { name: 'Languages' }));
    expect(screen.getByRole('button', { name: 'Languages' }).getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelectorAll('.skill-tile').length).toBe(skills.length);
    expect(container.querySelectorAll('.is-dimmed').length).toBe(skills.length - 4);
    expect(screen.getByText('4 elements')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'SQL' }));
    expect(screen.getByRole('heading', { name: 'SQL' })).toBeTruthy();
    expect(screen.getByText(/Used for performance reporting at AMD/)).toBeTruthy();
  });

  it('reveals technology details on keyboard focus', () => {
    render(<Skills />);
    act(() => screen.getByRole('button', { name: 'FastAPI' }).focus());
    expect(screen.getByRole('heading', { name: 'FastAPI' })).toBeTruthy();
    expect(document.activeElement?.getAttribute('aria-label')).toBe('FastAPI');
  });
});

describe('work panels and case-study dialogs', () => {
  it('expands a different panel and restores focus after closing its details', async () => {
    const user = userEvent.setup();
    render(<Work />);
    const select = screen.getByRole('button', { name: 'Explore Workflow and Test Planning Platform' });
    await user.click(select);
    expect(select.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('button', { name: 'Explore Performance Data Lakehouse' }).getAttribute('aria-expanded')).toBe('false');
    const trigger = screen.getByRole('button', { name: 'View Details' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Workflow and Test Planning Platform' })).toBeTruthy();
    expect(within(dialog).getByText(/cookie-based JWT authentication/)).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(within(dialog).getByRole('button', { name: 'Close case study' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('');
  });

  it('handles the native Escape/cancel action', async () => {
    const user = userEvent.setup();
    render(<Work />);
    await user.click(screen.getByRole('button', { name: 'View Details' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('navigation', () => {
  it('opens the menu, closes on navigation, and closes on Escape with focus returned', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')).toBe('true');
    await user.click(screen.getByRole('link', { name: 'Skills' }));
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false');
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open menu' }));
  });
});

describe('single-play portfolio introduction', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function(this: HTMLMediaElement) { this.dispatchEvent(new Event('playing')); return Promise.resolve(); });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function(this: HTMLMediaElement) { this.dispatchEvent(new Event('pause')); });
  });

  it('autoplays once even in Strict Mode, preserves pause position, and only replays on a click', async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(<StrictMode><Hero /></StrictMode>);
    const video = container.querySelector('video')!;
    expect(video.loop).toBe(false);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(1);
    expect(video.getAttribute('src')).toBe(profile.video);
    expect(video.muted).toBe(false);
    expect(video.currentTime).toBe(0);
    rerender(<StrictMode><Hero /></StrictMode>);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Pause introduction' }).classList.contains('video-toggle')).toBe(true);
    expect(container.querySelector('.intro-trigger')).toBeNull();
    expect(within(container.querySelector('.video-controls')!).queryByRole('button', { name: /pause|resume|restart|replay/i })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Mute introduction' }));
    expect(video.muted).toBe(true);
    video.currentTime = 4;
    await user.click(screen.getByRole('button', { name: 'Pause introduction' }));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(video.classList.contains('is-visible')).toBe(true);
    expect(video.currentTime).toBe(4);
    await user.click(screen.getByRole('button', { name: 'Resume introduction' }));
    expect(video.currentTime).toBe(4);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    expect(video.muted).toBe(true);
    fireEvent.ended(video);
    expect(video.classList.contains('is-visible')).toBe(false);
    rerender(<StrictMode><Hero /></StrictMode>);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole('button', { name: 'Play introduction' }));
    expect(video.currentTime).toBe(0);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
    fireEvent.ended(video);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
  });

  it('pauses out of view and does not automatically resume when the scene returns', () => {
    render(<Hero />);
    act(() => MockIntersectionObserver.instances[0].intersect(false));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Resume introduction' })).toBeTruthy();
    act(() => MockIntersectionObserver.instances[0].intersect(true));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  });

  it('keeps the poster visible on a media failure and allows a manual retry', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new DOMException('Unsupported media', 'NotSupportedError'));
    const user = userEvent.setup();
    const { container } = render(<Hero />);
    expect((await screen.findByRole('alert')).textContent).toContain('couldn’t play');
    expect(container.querySelector('video')?.classList.contains('is-visible')).toBe(false);
    expect(screen.getByAltText(/Rama seated at a desk/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Play introduction' }));
    expect(screen.getByRole('button', { name: 'Pause introduction' })).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('falls back to one muted playback when autoplay with sound is blocked', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new DOMException('Autoplay blocked', 'NotAllowedError'));
    const user = userEvent.setup();
    const { container } = render(<Hero />);
    const video = container.querySelector('video')!;
    await screen.findByRole('button', { name: 'Pause introduction' });
    expect(video.muted).toBe(true);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole('alert')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Unmute introduction' }));
    expect(video.muted).toBe(false);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    fireEvent.ended(video);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it('stops automatic attempts if all autoplay is blocked and waits for a click', async () => {
    vi.mocked(HTMLMediaElement.prototype.play)
      .mockRejectedValueOnce(new DOMException('Autoplay blocked', 'NotAllowedError'))
      .mockRejectedValueOnce(new DOMException('Muted autoplay blocked', 'NotAllowedError'));
    const user = userEvent.setup();
    const { container, rerender } = render(<Hero />);
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('button', { name: 'Play introduction' })).toBeTruthy();
    rerender(<Hero />);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole('button', { name: 'Play introduction' }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
    expect(container.querySelector('video')!.muted).toBe(false);
  });
});

describe('direct contact', () => {
  it('copies the exact email and displays a confirmed success', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<Contact />);
    await user.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(writeText).toHaveBeenCalledWith(profile.email);
    expect(screen.getByRole('status').textContent).toBe('Copied!');
    expect(screen.getByRole('link', { name: 'Email Me' }).getAttribute('href')).toBe(`mailto:${profile.email}`);
    expect(screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href')).toBe(profile.linkedin);
  });

  it('reports a failed copy without showing success', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error('Blocked')) } });
    render(<Contact />);
    await user.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(screen.getByRole('status').textContent).toContain('Copy didn’t work');
    expect(screen.queryByText('Copied!')).toBeNull();
  });
});
