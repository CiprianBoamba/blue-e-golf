/**  -- Hamburger Menu Functionality -- */

const ham = document.querySelector('.ham');
const menu = document.querySelector('ul.main-menu');
const links = menu.querySelectorAll('li');

var tl = gsap.timeline({ paused: true });

tl.set(menu, {
  x: () => -menu.offsetWidth,
});

// Animate the menu to slide in from the left
tl.to(menu, {
  duration: 1,
  x: 0,
  opacity: 1,
  ease: 'expo.inOut',
});

// Animate the links
tl.from(
  links,
  {
    duration: 0.5,
    opacity: 0,
    x: -20,
    stagger: {
      amount: 0.5,
      start: 0,
    },
    ease: 'expo.inOut',
  },
  '-=0.75',
);

tl.reverse();

ham.addEventListener('click', () => {
  tl.reversed(!tl.reversed());
});

document.getElementById('menu-toggle').addEventListener('click', function () {
  document.body.classList.toggle('nav-open');
});

/**  -- Search  Functionality -- */

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon');
  const closeIcon = document.querySelector('.close');

  const searchToggle = (obj) => {
    const container = obj.closest('.search-wrapper');
    container.classList.toggle('active');

    if (!container.classList.contains('active')) {
      container.querySelector('.search-input').value = '';
    }
  };

  searchIcon.addEventListener('click', () => searchToggle(searchIcon));
  closeIcon.addEventListener('click', () => searchToggle(closeIcon));
});
