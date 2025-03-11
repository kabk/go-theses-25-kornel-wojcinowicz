


// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}   



docReady(function() {

	// functions
	// go
	// here

  const el = document.querySelector('button.open-on-mobile');

  el.onclick = () => el.classList.toggle('is-opened');


});


document.addEventListener("DOMContentLoaded", function() {
  // A variable to store the bottom position of the last placed sidenote within the chapter
  let prevNoteBottom = {};

  document.querySelectorAll('sup[data-note]').forEach(function(sup) {
    const noteNum = sup.getAttribute('data-note');
    const sidenote = document.getElementById('sidenote-' + noteNum);
    if (sidenote) {
      const article = sup.closest('.chapter');
      // We'll use the article's id as a key so that notes in each chapter are handled independently
      const articleId = article.id;
      if (!prevNoteBottom[articleId]) {
        prevNoteBottom[articleId] = 0;
      }
      const supRect = sup.getBoundingClientRect();
      const articleRect = article.getBoundingClientRect();
      // Compute initial top offset relative to the article, subtracting 10px if needed to adjust vertical alignment
      let offsetTop = supRect.top - articleRect.top - 20;
      
      // If the computed offset is too close to the previous note in this article, adjust it:
      const minGap = 30; // desired gap in pixels between sidenotes
      if (offsetTop < prevNoteBottom[articleId] + minGap) {
        offsetTop = prevNoteBottom[articleId] + minGap;
      }
      
      // Position the sidenote
      sidenote.style.top = offsetTop + 'px';
      sidenote.style.right = '0';
      sidenote.style.width = '200px';  // or adjust as desired
      sidenote.style.position = 'absolute';
      
      // Update prevNoteBottom for this chapter: current top offset plus the height of the note
      prevNoteBottom[articleId] = offsetTop + sidenote.offsetHeight;
    }
  });
});

function repositionSidenotes() {
  let prevNoteBottom = {};

  document.querySelectorAll('sup[data-note]').forEach(function(sup) {
    const noteNum = sup.getAttribute('data-note');
    const sidenote = document.getElementById('sidenote-' + noteNum);
    if (sidenote) {
      const article = sup.closest('.chapter');
      const articleId = article.id;
      if (!prevNoteBottom[articleId]) {
        prevNoteBottom[articleId] = 0;
      }
      const supRect = sup.getBoundingClientRect();
      const articleRect = article.getBoundingClientRect();
      let offsetTop = supRect.top - articleRect.top - 18;
      
      const minGap = 10; 
      if (offsetTop < prevNoteBottom[articleId] + minGap) {
        offsetTop = prevNoteBottom[articleId] + minGap;
      }
      
      sidenote.style.top = offsetTop + 'px';
      sidenote.style.right = '-420px';
      sidenote.style.width = '500px';
      sidenote.style.position = 'absolute';
      // sidenote.style.marginLeft = '20px';
      
      prevNoteBottom[articleId] = offsetTop + sidenote.offsetHeight;
    }
  });
}

document.addEventListener("DOMContentLoaded", repositionSidenotes);
window.addEventListener('resize', repositionSidenotes);



window.addEventListener('load', () => {
  // 1) Select all tracks with these classes
  const allTracks = document.querySelectorAll('.marquee-track1, .marquee-track2, .marquee-track3, .marquee-track4, .marquee-track5, .marquee-track6');
  
allTracks.forEach((track, index) => {
    // 1) Measure the actual width
    const totalWidth = track.scrollWidth; 
    // 2) Set track's width if needed
    track.style.width = totalWidth + 'px';

    // 3) Create a unique animation name for each track
    const animationName = `marqueeLoop${index}`;

    // 4) Create a unique class name so each track can get a custom duration
    //    You can pass any speed you want, e.g. 8s, 12s, etc.
    const speedSeconds = 15;  // <-- CHANGE THIS to whatever you want
    const className = `dynamic-marquee-${index}`;

    // 5) Build the <style> text
    const styleText = `
      @keyframes ${animationName} {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth / 2}px);
        }
      }

      /* The main animation rule, e.g. 5s, linear, infinite */
      .${className} {
        animation: ${animationName} ${speedSeconds}s linear infinite;
      }

      /* Pause on hover: fully works because it's normal CSS, 
         not overridden by inline styles. */
      .${className}:hover {
        animation-play-state: paused;
      }
    `;

    // 6) Inject that into a new <style> element
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styleText;
    document.head.appendChild(styleEl);

    // 7) Finally, add the class to the track
    track.classList.add(className);
  });
});