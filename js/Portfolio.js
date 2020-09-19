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
    this.current = 0;

    this.DOM.cardsContainer = this.DOM.el.querySelector('.cards-container');
    this.DOM.cards = [...this.DOM.cardsContainer.children]
    // console.log(this.DOM.cards);

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
      this.DOM.sidenav.classList.toggle('sidenav-closed')
    });

    this.DOM.nextSlideBtn.addEventListener('click', () => this.moveTo("next"));

    this.DOM.prevSlideBtn.addEventListener('click', () => this.moveTo("prev"));

    this.DOM.sidenavOpen.addEventListener('click', () => this.DOM.sidenav.classList.toggle('sidenav-closed'));

    this.DOM.sidenavClose.addEventListener('click', () => this.DOM.sidenav.classList.toggle('sidenav-closed'));

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

      this.revealCard(e.target);
    })

  }

  moveTo(direction) {

    this.DOM.slides[this.current].classList.remove("active-slide");
    this.DOM.indicators[this.current].classList.remove('active-indicator');

    this.current = direction === 'next' ? this.current < this.slidesTotal-1 ? this.current + 1 : 0 : this.current > 0 ? this.current - 1 : this.slidesTotal-1;

    this.DOM.slides[this.current].classList.add("active-slide");
    this.DOM.indicators[this.current].classList.add('active-indicator');

  }

  revealCard(buttonElement) {

    let cardIndex = [...buttonElement.parentElement.parentElement.parentElement.children].indexOf(buttonElement.parentElement.parentElement);

    if (this.isCardrevealed) {

      // Replace the current class with new one
      this.DOM.cardsContainer.classList.replace("card-reveal", "cards");

      // Add the reveal class to the card.
      this.DOM.cards[cardIndex].classList.remove("reveal");

      // Change the button text.
      buttonElement.textContent = "more";

      // Reset the boolean
      this.isCardrevealed = false;

    } else {

      this.DOM.cardsContainer.classList.replace("cards", "card-reveal");

      this.DOM.cards[cardIndex].classList.add("reveal");

      buttonElement.textContent = "less";

      this.isCardrevealed = true;

    }
  }
}

new Portfolio(document.querySelector(".main"));
