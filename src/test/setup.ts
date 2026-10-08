import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockImplementation((query: string) => ({
  matches: false, media: query, onchange: null,
  addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
})) });

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  target: Element | null = null;
  constructor(callback: IntersectionObserverCallback) { this.callback = callback; MockIntersectionObserver.instances.push(this); }
  observe(target: Element) { this.target = target; }
  unobserve() {}
  disconnect() {}
  intersect(value: boolean) { this.callback([{ target: this.target!, isIntersecting: value, intersectionRatio: value ? 1 : 0 } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function(this: HTMLDialogElement) { this.setAttribute('open', ''); } });
Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function(this: HTMLDialogElement) { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); } });

afterEach(() => { cleanup(); MockIntersectionObserver.instances = []; document.body.style.overflow = ''; });
