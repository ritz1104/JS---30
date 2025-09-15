const nav = document.querySelector('.navbar');
const image = document.querySelector('.image');

const topOfImage = image.offsetHeight;

function fixNav() {
  if (window.scrollY >= topOfImage) {
    document.body.classList.add('fixed-nav');
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
