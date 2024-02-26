const ham = document.querySelector('.ham');
const menu = document.querySelector('ul.main-menu');
const links = menu.querySelectorAll('li');

var tl = gsap.timeline({ paused: true });

tl.to(menu, {
  duration: 1,
  opacity: 1,
  height: '100vh',
  ease: 'expo.inOut',
});
tl.from(
  links,
  {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: 'expo.inOut',
  },
  '-=0.5',
);

tl.reverse();

ham.addEventListener('click', () => {
  tl.reversed(!tl.reversed());
});

document.getElementById('menu-toggle').addEventListener('click', function () {
  document.body.classList.toggle('nav-open');
});

const nav = document.querySelector('nav');

ham.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

const menuToggle = document.querySelector('#menu-toggle');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('nav-open');
});
