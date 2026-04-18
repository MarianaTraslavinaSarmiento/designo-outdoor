/* ═══════════════════════════════════════════════════════
   DESIGNO CEILINGS — main.js
   Handles: sidebar toggle, scroll reveal, project modal,
            photo grid, fullscreen image viewer
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────
     SIDEBAR (mobile toggle)
  ────────────────────────────────────────────────────── */
  var sidebar    = document.getElementById('sidebar');
  var hamburger  = document.getElementById('hamburger');

  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    hamburger.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    hamburger.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.contains('sidebar--open') ? closeSidebar() : openSidebar();
    });
  }

  overlay.addEventListener('click', closeSidebar);

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  /* ──────────────────────────────────────────────────────
     SCROLL REVEAL
  ────────────────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ──────────────────────────────────────────────────────
     PROJECT MODAL
     Opens when any .project-card is clicked.
     Reads data attributes: data-title, data-city,
     data-tags, data-desc, data-photos (JSON array of paths)
  ────────────────────────────────────────────────────── */
  var modal       = document.getElementById('modal');
  var modalPhotos = document.getElementById('modal-photos');
  var modalTitle  = document.getElementById('modal-title');
  var modalTags   = document.getElementById('modal-tags');
  var modalDesc   = document.getElementById('modal-desc');
  var modalBack   = document.getElementById('modal-back');
  var modalClose  = document.getElementById('modal-close');

  if (!modal) return; // About page has no modal

  function openModal(card) {
    var title  = card.getAttribute('data-title')  || 'Project';
    var city   = card.getAttribute('data-city')   || '';
    var tags   = card.getAttribute('data-tags')   || '';
    var desc   = card.getAttribute('data-desc')   || '';
    var photos = [];

    try {
      photos = JSON.parse(card.getAttribute('data-photos') || '[]');
    } catch (e) {
      photos = [];
    }

    // ── Title & description
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    // ── Tags
    modalTags.innerHTML = '';
    tags.split(',').forEach(function (tag) {
      var t = tag.trim();
      if (t) {
        var span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = t;
        modalTags.appendChild(span);
      }
    });

    // ── Photo grid
    //    First photo = featured (full width), rest = uniform 4:3 cards
    modalPhotos.innerHTML = '';

    if (photos.length === 0) {
      // No photos defined — show placeholder message
      var msg = document.createElement('p');
      msg.style.cssText = 'padding:32px;color:#999;font-size:13px;grid-column:1/-1;';
      msg.textContent = 'Project photos coming soon.';
      modalPhotos.appendChild(msg);
    } else {
      photos.forEach(function (src, i) {
        var div = document.createElement('div');
        div.className = 'modal-photo' + (i === 0 ? ' modal-photo--featured' : '');

        var img = document.createElement('img');
        img.src     = src;
        img.alt     = title + ' — photo ' + (i + 1);
        img.loading = 'lazy';

        // Click to open fullscreen viewer
        div.addEventListener('click', function () {
          openViewer(src, title);
        });

        div.appendChild(img);
        modalPhotos.appendChild(div);
      });
    }

    // ── Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach click to every project card
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
  });

  if (modalBack)  modalBack.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Click outside panel closes modal
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // ESC key closes modal / viewer
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeViewer();
      closeModal();
    }
  });

  /* ──────────────────────────────────────────────────────
     FULLSCREEN IMAGE VIEWER
     Opens when a photo inside the modal is clicked
  ────────────────────────────────────────────────────── */
  var viewer      = document.getElementById('img-viewer');
  var viewerImg   = document.getElementById('viewer-img');
  var viewerClose = document.getElementById('viewer-close');

  function openViewer(src, alt) {
    viewerImg.src = src;
    viewerImg.alt = alt || '';
    viewer.classList.add('active');
    // Don't change body overflow — modal scroll stays locked
  }

  function closeViewer() {
    viewer.classList.remove('active');
    viewerImg.src = '';
  }

  if (viewerClose) viewerClose.addEventListener('click', closeViewer);
  if (viewer) {
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer) closeViewer();
    });
  }

  /* ──────────────────────────────────────────────────────
     IMAGE FADE-IN
     Images fade in naturally once loaded
  ────────────────────────────────────────────────────── */
  document.querySelectorAll('.project-card img').forEach(function (img) {
    img.style.opacity    = '0';
    img.style.transition = 'opacity 0.45s ease';

    if (img.complete && img.naturalWidth > 0) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', function () { img.style.opacity = '1'; });
      img.addEventListener('error', function () { img.style.opacity = '0.4'; }); // broken image stays dim
    }
  });

})();
