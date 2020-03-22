document.addEventListener('DOMContentLoaded', function() {
    const intro = document.querySelector('.intro');
    const trackContainer = document.querySelector('.micromachine-track-container');
    document.querySelector('.intro .layover').addEventListener('click', function layoverClick(event) {
        trackContainer.classList.remove('hidden');
        intro.classList.add('hidden');
    });
});
