


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
