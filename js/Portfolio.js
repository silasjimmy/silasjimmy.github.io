/* Portfolio */

class Portfolio {
  constructor(el) {
    this.DOM = {}
    this.DOM.el = el;

    this.DOM.parent = this.DOM.el.parentNode;

    this.DOM.header = this.DOM.el.querySelector('header');
    this.DOM.dropdown = this.DOM.header.querySelector('.dropdown');
    this.DOM.sidenavOpen = this.DOM.header.querySelector('.sidenav-open');

    this.DOM.dropdownTrigger = this.DOM.dropdown.querySelector('.dropdown-trigger');
    this.DOM.dropdownContent = this.DOM.dropdown.querySelector('.dropdown-content');

    this.DOM.sidenav = this.DOM.el.querySelector('.sidenav');
    this.DOM.sidenavClose = this.DOM.sidenav.querySelector('.sidenav-close');

    this.DOM.carousel = this.DOM.el.querySelector('.carousel');
    this.DOM.nextSlideBtn = this.DOM.carousel.querySelector('.next');
    this.DOM.prevSlideBtn = this.DOM.carousel.querySelector('.prev');
    this.DOM.slides = [...this.DOM.carousel.querySelector('.carousel-items').children];
    this.DOM.indicators = [...this.DOM.carousel.querySelector('.indicators').children];
    this.slidesTotal = this.DOM.slides.length;

    this.isCardrevealed = false;
    this.isSidenavOpen = false;
    this.current = 0;

    this.DOM.cardsContainer = this.DOM.el.querySelector('.cards-container');
    this.DOM.cards = [...this.DOM.cardsContainer.children];

    this.DOM.slides[this.current].classList.add('active-slide');
    this.DOM.indicators[this.current].classList.add('active--indicator');

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        this.DOM.header.classList.add("navbar-on-scroll");
      } else {
        this.DOM.header.classList.remove("navbar-on-scroll");
      }
    });

    this.DOM.sidenav.addEventListener('click', (e) => {
      if (e.target.id != "sidenav-link") return;
      this.closeSidenav();
    });

    this.DOM.nextSlideBtn.addEventListener('click', () => this.moveTo("next"));

    this.DOM.prevSlideBtn.addEventListener('click', () => this.moveTo("prev"));

    this.DOM.sidenavOpen.addEventListener('click', () => this.openSidenav());

    this.DOM.sidenavClose.addEventListener('click', () => this.closeSidenav());

    this.DOM.dropdownContent.addEventListener('click', e => {
      // Get the previous mode
      let prevMode = this.DOM.parent.className;
      // Get the new mode
      let currentMode = e.target.id === "dark" ? "dark-mode" : "light-mode";
      // Replace the previous mode with current mode
      this.DOM.parent.classList.replace(prevMode, currentMode);
      // Replace the text in dropdown trigger
      this.DOM.dropdownTrigger.textContent = e.target.textContent;
    });

    this.DOM.cardsContainer.addEventListener('click', (e) => {
      if (e.target.className != "btn") return;

      let btn = e.target;
      let cardIndex = [...btn.parentElement.parentElement.parentElement.children].indexOf(btn.parentElement.parentElement);

      if (this.isCardrevealed) this.hideCard(btn, cardIndex);
      else this.revealCard(btn, cardIndex);
    });
  }

  moveTo(direction) {
    // Slide item animation method.
    const animateItems = () => {
      anime.timeline({
        begin: () => this.DOM.slides[this.current].classList.add("active-slide")
      }).add({
        targets: this.DOM.slides[this.current].querySelectorAll('.item > img'),
        width: [0, "100%"],
        easing: 'easeInOutQuad',
        duration: 1000
      }).add({
        targets: this.DOM.slides[this.current].querySelectorAll('.item > .item-title > h5'),
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1000
      });
    };

    // Remove the classes from the previous slide and indicator.
    this.DOM.slides[this.current].classList.remove("active-slide");
    this.DOM.indicators[this.current].classList.remove('active-indicator');

    // Determine the current slide index.
    this.current = direction === 'next' ? this.current < this.slidesTotal-1 ? this.current + 1 : 0 : this.current > 0 ? this.current - 1 : this.slidesTotal-1;

    // Animate the slide items.
    animateItems();

    // Add the active indicator class to the current indicator.
    this.DOM.indicators[this.current].classList.add('active-indicator');
  }

  revealCard(btn, cardIndex) {
    // Zoom out the the cards.
    anime({
      targets: '.card',
      scale: [{value: 1.03, duration: 250, easing: 'easeOutQuad'},
              {value: 0, duration: 800, delay: 100, easing: 'easeInExpo'}],
      delay: anime.stagger(200, {from: cardIndex, easing: 'linear'}),
      complete: () => {
        this.DOM.cardsContainer.classList.replace("cards", "card-reveal");
        this.DOM.cards[cardIndex].classList.add("reveal");
        this.DOM.cards[cardIndex].style.transform = "scale(1)";
        btn.textContent = "less";
        this.isCardrevealed = true;
        this.showLargeCard();
      }
    });
  }

  hideCard(btn, cardIndex) {
    // Hide the large card.
    anime.timeline({
      duration: 800,
      easing: 'easeInOutSine'
    }).add({
      targets: '.reveal',
      opacity: [1, 0]
    }).add({
      targets: '.card-reveal',
      scale: [1, 0],
      complete: () => {
        this.DOM.cardsContainer.classList.replace("card-reveal", "cards");
        this.DOM.cards[cardIndex].classList.remove("reveal");
        // this.DOM.cards[cardIndex].style.opacity = "1";
        this.DOM.cardsContainer.style.transform = "scale(1)";
        btn.textContent = "more";
        this.isCardrevealed = false;
        // Show the small cards.
        this.showSmallCards();
      }
    });
  }

  showLargeCard() {
    // Show the large card.
    anime.timeline({
      duration: 800,
      easing: 'easeInOutSine'
    }).add({
      targets: '.card-reveal',
      scale: [0, 1]
    }).add({
      targets: '.reveal',
      opacity: [0, 1]
    });
  }

  showSmallCards() {
    // Show the small cards.
    anime({
      targets: '.card',
      opacity: [0, 1],
      scale: [{value: 1.03, duration: 800, easing: 'easeInQuad'},
              {value: 1, duration: 250, easing: 'easeInExpo'}],
      delay: anime.stagger(200, {easing: 'linear'})
    });
  }

  openSidenav() {
    anime.timeline({
      begin: () => this.DOM.sidenav.style.display = "flex"
    }).add({
      targets: '.sidenav',
      opacity: [0, 1],
      duration: 500,
      easing: 'easeInQuad'
    }).add({
      targets: '.link',
      scale: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
      delay: anime.stagger(200, {easing: 'linear'})
    }, "+=250");
  }

  closeSidenav() {
    anime.timeline({
      complete: () => this.DOM.sidenav.style.display = "none"
    }).add({
      targets: '.link',
      scale: [1, 0],
      easing: 'easeInExpo',
      duration: 700,
      delay: anime.stagger(200, {easing: 'linear'})
    }).add({
      targets: '.sidenav',
      opacity: [1, 0],
      duration: 500,
      easing: 'easeOutQuad'
    }, "+=150");
  }
}

new Portfolio(document.querySelector(".main"));
