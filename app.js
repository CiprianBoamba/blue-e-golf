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

(function ($) {
  'use strict';
  $.fn.sliderResponsive = function (settings) {
    var set = $.extend(
      {
        slidePause: 5000,
        fadeSpeed: 800,
        showArrows: 'on',
        hideDots: 'off',
        hoverZoom: 'on',
        titleBarTop: 'off',
      },
      settings,
    );

    var $slider = $(this);
    var size = $slider.find('> div').length;
    var position = 0;

    // Add a Dot for each slide
    $slider.append('<ul></ul>');
    $slider.find('> div').each(function () {
      $slider.find('> ul').append('<li></li>');
    });

    $slider.find('div:first-of-type').addClass('show');

    $slider.find('li:first-of-type').addClass('showli');

    $slider.find('> div').not('.show').fadeOut();

    if (set.showArrows === 'on') {
      $slider.addClass('showArrows');
    }

    if (set.hideDots === 'on') {
      $slider.addClass('hideDots');
    }

    if (set.hoverZoom === 'off') {
      $slider.addClass('hoverZoomOff');
    }

    if (set.titleBarTop === 'on') {
      $slider.addClass('titleBarTop');
    }

    $slider.find('> .right').click(nextSlide);

    $slider.find('> .left').click(prevSlide);

    function nextSlide() {
      position = $slider.find('.show').index() + 1;
      if (position > size - 1) position = 0;
      changeCarousel(position);
    }

    function prevSlide() {
      position = $slider.find('.show').index() - 1;
      if (position < 0) position = size - 1;
      changeCarousel(position);
    }

    $slider.find(' > ul > li').click(function () {
      position = $(this).index();
      changeCarousel($(this).index());
    });

    function changeCarousel() {
      $slider.find('.show').removeClass('show').fadeOut();
      $slider.find('> div').eq(position).fadeIn(set.fadeSpeed).addClass('show');
      // The Dots
      $slider.find('> ul').find('.showli').removeClass('showli');
      $slider.find('> ul > li').eq(position).addClass('showli');
    }

    return $slider;
  };
})(jQuery);

$(document).ready(function () {
  $('#slider-top').sliderResponsive({
    hoverZoom: 'on',
    hideDots: 'off',
    fadeSpeed: 300,
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
