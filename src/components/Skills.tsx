import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories, categoryIds, skills } from '../content';
import type { Category } from '../content';
import { SectionLabel } from './shared';

export function Skills() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [selected, setSelected] = useState(skills[0]);
  const matches = skills.filter(skill => filter === 'All' || skill.category === filter);
  const changeFilter = (next: Category | 'All') => {
    setFilter(next);
    setSelected(skills.find(skill => next === 'All' || skill.category === next) ?? skills[0]);
  };
  return <section id="skills" className="section skills-section" aria-labelledby="skills-title">
    <div className="container">
      <SectionLabel number="02">MY TOOLKIT</SectionLabel>
      <div className="section-heading" data-reveal><h2 id="skills-title">The building blocks<br />of my <em>work.</em></h2><p>Different tools. One goal.<br />Turn raw data into something useful.</p></div>
      <div className="skill-toolbar"><div className="skill-filters" role="group" aria-label="Filter skills by category">{(['All', ...categories] as const).map(category => <button type="button" key={category} aria-pressed={filter === category} className={filter === category ? 'is-selected' : ''} onClick={() => changeFilter(category)}>{category}</button>)}</div><span className="skills-count" aria-live="polite">{matches.length} elements</span></div>
      <div className="skills-grid" aria-label="Technology building blocks">{skills.map(skill => {
        const dim = filter !== 'All' && skill.category !== filter;
        return <button type="button" key={skill.name} className={`skill-tile category-${categoryIds[skill.category]} ${dim ? 'is-dimmed' : ''} ${selected.name === skill.name ? 'is-selected' : ''}`} aria-label={skill.name} aria-pressed={selected.name === skill.name} aria-describedby="skill-description" onMouseEnter={() => setSelected(skill)} onFocus={() => setSelected(skill)} onClick={() => setSelected(skill)}><span className="tile-category" aria-hidden="true"><span /></span><span className="skill-symbol">{skill.symbol}</span><span className="skill-name">{skill.name}</span></button>;
      })}</div>
      <div className={`skill-insight category-${categoryIds[selected.category]}`}>
        <div className="insight-symbol" aria-hidden="true">{selected.symbol}</div>
        <div className="insight-copy"><div className="insight-heading"><h3>{selected.name}</h3><span>{selected.category}</span></div><p id="skill-description">{selected.description} {selected.context}</p></div><ArrowUpRight size={20} aria-hidden="true" className="insight-arrow" />
      </div>
      <p className="section-footnote">Hover, focus, or tap an element to explore. Filters highlight a category while keeping the whole toolkit in view.</p>
    </div>
  </section>;
}
