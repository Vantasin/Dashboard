(function () {
  const MOBILE_BREAKPOINT = 768; // px

  function isMobileLike() {
    return window.innerWidth <= MOBILE_BREAKPOINT || 'ontouchstart' in window;
  }

  function updateBodyClasses() {
    const body = document.body;
    if (!body) return;

    if (isMobileLike()) {
      body.classList.add('bg-mobile');
      body.classList.remove('bg-desktop');
      setVhVar();
    } else {
      body.classList.add('bg-desktop');
      body.classList.remove('bg-mobile');
      clearVhVar();
    }
  }

  function setVhVar() {
    // iOS / mobile 100vh fix: use JS-calculated viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  function clearVhVar() {
    document.documentElement.style.removeProperty('--vh');
  }

  // Run on load
  window.addEventListener('load', updateBodyClasses);

  // Update on resize / orientation change
  window.addEventListener('resize', updateBodyClasses);
  window.addEventListener('orientationchange', updateBodyClasses);
})();
