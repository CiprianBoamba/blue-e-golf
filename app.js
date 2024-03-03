/**  -- Hamburger Menu Functionality -- */

const menuToggleOpen = document.querySelector('#menu-toggle-open');
const menuToggleClose = document.querySelector('#menu-toggle-close');
const menu = document.querySelector('.menu');

const tl = gsap.timeline({
  paused: true,
});

tl.to('.menu', {
  x: 0,
  duration: 0.6,
  ease: 'expo.inOut',
});

tl.from('.menu nav a', {
  y: 40,
  opacity: 0,
  duration: 0.4,
  ease: 'expo.out',
  stagger: 0.1,
});

tl.from('.social', {
  y: 40,
  opacity: 0,
  duration: 0.4,
  ease: 'expo.out',
});

function quickReverse() {
  const reverseTl = gsap.timeline({
    onComplete: () => tl.pause(0),
  });

  reverseTl.to(
    '.social',
    {
      y: 40,
      opacity: 0,
      duration: 0.2,
      ease: 'expo.in',
    },
    0,
  );

  reverseTl.to(
    '.menu nav a',
    {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'expo.in',
      stagger: 0.05,
    },
    0,
  );

  reverseTl.to(
    '.menu',
    {
      x: '-100%',
      duration: 0.5,
      ease: 'expo.in',
    },
    0,
  );
}

menuToggleOpen.addEventListener('click', function () {
  tl.restart();

  gsap.to(menuToggleOpen, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      menuToggleOpen.style.visibility = 'hidden';
      menuToggleClose.style.visibility = 'visible';
      menuToggleClose.style.opacity = 1;
    },
  });
});

menuToggleClose.addEventListener('click', function () {
  quickReverse();

  gsap.to(menuToggleClose, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      menuToggleClose.style.visibility = 'hidden';
      menuToggleOpen.style.visibility = 'visible';
      gsap.to(menuToggleOpen, {
        opacity: 1,
        duration: 0.3,
      });
    },
  });
});

menuToggleOpen.addEventListener('click', () => tl.play());
menuToggleClose.addEventListener('click', quickReverse);

/**  -- Search Button Functionality -- */
const searchClose = document.querySelector('.search-close');
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
const searchQueryDisplay = document.querySelector('.search-query-display');

searchClose.addEventListener('click', () => {
  searchOverlay.style.display = 'none';
  searchBtn.style.display = 'block';
  searchQueryDisplay.textContent = '';
});

searchBtn.addEventListener('click', () => {
  searchBtn.style.display = 'none';
  searchOverlay.style.display = 'block';
});
searchButton.addEventListener('click', (event) => {
  event.preventDefault();

  const searchValue = searchText.value;
  searchQueryDisplay.innerHTML = `Search for : <i>${searchValue}</i>`;
  searchText.value = '';
});

/**  -- Top Slider Functionality -- */

$('.slider').each(function () {
  let $this = $(this);
  let $group = $this.find('.slide_group');
  let $slides = $this.find('.slide');
  let bulletArray = [];
  let currentIndex = 0;
  let timeout;

  function move(newIndex) {
    let animateLeft, slideLeft;

    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }

    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');

    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft,
    });
    $group.animate(
      {
        left: animateLeft,
      },
      function () {
        $slides.eq(currentIndex).css({
          display: 'none',
        });
        $slides.eq(newIndex).css({
          left: 0,
        });
        $group.css({
          left: 0,
        });
        currentIndex = newIndex;
      },
    );
  }

  $('.next_btn').on('click', function () {
    if (currentIndex < $slides.length - 1) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });

  $('.previous_btn').on('click', function () {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move($slides.length - 1);
    }
  });

  $.each($slides, function (index) {
    let $button = $('<a class="slide_btn">&bull;</a>');

    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button
      .on('click', function () {
        move(index);
      })
      .appendTo('.slide_buttons');
    bulletArray.push($button);
  });
});

// Listen to the scroll event

gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray('.text');

textElements.forEach((text) => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 80%',
      end: 'center 20%',
      scrub: true,
    },
  });
});
