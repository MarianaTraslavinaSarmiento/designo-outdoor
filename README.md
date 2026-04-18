# Designo Ceilings — Outdoor Living Website v2

## Complete Folder Structure

```
designo-outdoor/
├── decks.html          ← Decks (Trex + Wood sections)
├── patios.html         ← Patios (Flagstone + Pavers + Concrete)
├── porches.html        ← Porches (Screened + Covered + Front)
├── pergolas.html       ← Pergolas
├── custom.html         ← Custom Work
├── about.html          ← About Us
├── css/style.css
├── js/main.js
└── images/
    ├── decks/
    │   ├── trex/
    │   │   ├── trex-01-thumb.jpg   ← shown in grid
    │   │   ├── trex-01a.jpg        ← featured photo in modal (first = full width)
    │   │   ├── trex-01b.jpg
    │   │   └── trex-01c.jpg
    │   └── wood/
    │       └── (same pattern)
    ├── patios/
    │   ├── flagstone/
    │   ├── pavers/
    │   └── concrete/
    ├── porches/
    │   ├── screened/
    │   ├── covered/
    │   └── front/
    ├── pergolas/
    └── custom/
```

---

## How to Add a New Project

### 1. Upload your photos to the correct folder
Example for Trex project #4:
- `images/decks/trex/trex-04-thumb.jpg`  (grid thumbnail)
- `images/decks/trex/trex-04a.jpg`  (first = featured full-width in modal)
- `images/decks/trex/trex-04b.jpg`
- `images/decks/trex/trex-04c.jpg`

### 2. Copy a project-card block in the HTML
Find the comment `<!-- ADD MORE TREX CARDS HERE -->` and paste before it:

```html
<div class="project-card"
  data-title="Trex Transcend Deck — Alexandria, VA"
  data-city="Alexandria, VA"
  data-tags="Trex Composite, Transcend Series, Alexandria VA"
  data-desc="Your 150-300 word SEO-rich description here. Include city name naturally 2-3x."
  data-photos='["images/decks/trex/trex-04a.jpg","images/decks/trex/trex-04b.jpg","images/decks/trex/trex-04c.jpg"]'>
  <img src="images/decks/trex/trex-04-thumb.jpg" alt="Trex composite deck Alexandria VA" loading="lazy" />
  <div class="project-card__overlay"><span class="project-card__label">Alexandria, VA — Trex Transcend</span></div>
  <div class="project-card__badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M10 14L21 3"/><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg></div>
</div>
```

---

## Grid Behavior
- 3 equal columns on desktop, 2 on tablet/mobile
- Every card is exactly 4:3 — no exceptions, no distortion
- Any photo size works — object-fit:cover handles it automatically
- Adding more cards = grid grows downward, stays perfectly uniform

---

## SEO City Rotation
Rotate through these cities across projects:
Alexandria VA, Arlington VA, Springfield VA, Fairfax VA, McLean VA,
Vienna VA, Burke VA, Reston VA, Woodbridge VA, Lorton VA,
Potomac MD, Bethesda MD, Rockville MD, Silver Spring MD, Washington DC

---

## Image Tips
- Format: JPG
- Thumbnails: 800x600px minimum
- Modal photos: 1200x900px+ for crispness
- No spaces in filenames: use `trex-04a.jpg` not `trex 04 a.jpg`
