// Utility functions
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const toggleClass = (el, cls, force) => el?.classList.toggle(cls, force);
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Event delegation helper
const delegate = (parent, selector, event, handler) => {
  parent.addEventListener(event, e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  });
};

// Navigation handler
const handleNavigation = () => {
  delegate(document, '.nav-link', 'click', function(e) {
    const href = this.getAttribute('href');
    if (!href?.startsWith('#')) return;

    e.preventDefault();
    $$('.nav-link').forEach(l => toggleClass(l, 'active', false));
    toggleClass(this, 'active', true);

    const targetId = href.slice(1);
    $$('.section').forEach(s => toggleClass(s, 'hidden', s.id !== targetId));
    scrollToTop();
  });
};

// Archive filter handler
const handleArchiveLinks = () => {
  delegate(document, '.archive-link', 'click', function(e) {
    e.preventDefault();
    $$('.archive-link').forEach(l => toggleClass(l, 'active', false));
    toggleClass(this, 'active', true);

    const month = this.dataset.month;
    const monthText = this.textContent;
    console.log(`Filtering posts for: ${month}`);
    
    // Filter logic here - could be expanded to actual filtering
    $$('.blog-card').forEach(card => {
      const dateText = $('.post-date', card)?.textContent;
      // Add filtering based on dateText and month
    });
  });
};

// Smooth scroll for hash links
const handleSmoothScroll = () => {
  delegate(document, 'a[href^="#"]', 'click', function(e) {
    const href = this.getAttribute('href');
    if (href?.length > 1 && !this.classList.contains('archive-link')) {
      const target = $(href);
      if (target) scrollToTop();
    }
  });
};

// Animate cards on scroll (Intersection Observer)
const animateCards = () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { target } = entry;
        Object.assign(target.style, { opacity: '0', transform: 'translateY(20px)' });
        
        setTimeout(() => {
          Object.assign(target.style, {
            transition: 'all 0.5s ease',
            opacity: '1',
            transform: 'translateY(0)'
          });
        }, 100);
        
        observer.unobserve(target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  $$('.blog-card').forEach(card => observer.observe(card));
};

// Keyboard shortcuts
const handleKeyboardNav = () => {
  const navLinks = $$('.nav-link');
  const keyMap = { '1': 0, '2': 1, '3': 2 };
  
  document.addEventListener('keydown', e => {
    const index = keyMap[e.key];
    if (index !== undefined) navLinks[index]?.click();
  });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  handleNavigation();
  handleArchiveLinks();
  handleSmoothScroll();
  animateCards();
  handleKeyboardNav();
  console.log('Blog initialized ✨');
});
