'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const headerLinks = document.querySelectorAll('.nav__links .nav__link');
const slides = document.getElementsByClassName('testimonial ');
const dots = document.getElementsByClassName('.dots__dot');
const slidBtnRight = document.querySelectorAll('slider__btn--right');
const slidBtnLeft = document.querySelectorAll('slider__btn--left');
const sectionsReveal = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

// console.log(tabsContainer);
///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////
// Button Scrolling
btnScroll.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//////////////////////////////////////////////
// Page Navigation (Smooth scroll to sections)
headerLinks.forEach(element => {
  element.addEventListener('click', function (event) {
    event.preventDefault();

    const idLinks = this.getAttribute('href');
    const targetElement = document.querySelector(idLinks);

    targetElement.scrollIntoView({
      behavior: 'smooth',
    });
  });
});
//////////////////////////////////////////////
// Tabbed Component
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );
    tabsContent[index].classList.add('operations__content--active');
    tab.classList.add('operations__tab--active');
  });
});
//////////////////////////////////////////////
// Navigation link fadeout animation (opacity)
headerLinks.forEach(element => {
  element.addEventListener('mouseout', function () {
    headerLinks.forEach(allElements => {
      allElements.style.opacity = 1;
    });
  });

  element.addEventListener('mouseover', function () {
    headerLinks.forEach(other => {
      if (other !== element) {
        other.style.opacity = 0.5;
      }
    });
  });
});
//////////////////////////////////////////////
// Sticky Navigation
// way1:
// window.addEventListener('scroll', function () {
//   header.classList.toggle('sticky', window.scrollY >= section1.offsetTop);
// });

// way2(is better than):
const options = {
  threshold: '.4', // .4 === 40% of the section should be visible.
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
}, options);
sectionsReveal.forEach(section => {
  observer.observe(section);
});
//////////////////////////////////////////
// Reveal Sections

window.addEventListener('scroll', function () {
  const { innerHeight, scrollY } = window;
  sectionsReveal.forEach(section => {
    const { top: sectionTop, height: sectionHeight } =
      section.getBoundingClientRect();

    if (
      scrollY >
      sectionTop - innerHeight + sectionHeight / 3.5 /*Scroll Coordinates*/
    )
      section.classList.remove('section--hidden');
    else section.classList.add('section--hidden');
  });
});
//////////////////////////////////////////
// Lazy loading images
const lazyLoading = (target) => {
  const observeImg  = new IntersectionObserver((entries,observer)=>{
    entries.forEach((entry)=> {
      if (entry.isIntersecting) {
        const images = entry.target
        const src =images.getAttribute('data-src')
        images.setAttribute('src',src)
        images.classList.remove("lazy-img")
        observer.disconnect()
      }
    })
  })
  observeImg.observe(target)
}
imgTargets.forEach(lazyLoading)
//////////////////////////////////////////
// Slider

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
