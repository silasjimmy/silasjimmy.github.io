class Portfolio {
  constructor(el) {
    this.DOM = {};
    this.DOM.el = el;

    this.DOM.elBody = this.DOM.el.parentNode;
    this.DOM.main = this.DOM.el.querySelector('.main');
    this.DOM.header = this.DOM.main.querySelector('header');
    this.DOM.dropdown = this.DOM.header.querySelector('.dropdown');
    this.DOM.dropdownTrigger = this.DOM.dropdown.querySelector('.dropdown_trigger');
    this.DOM.dropdownContent = this.DOM.dropdown.querySelector('.dropdown_content');
    this.DOM.sidenavOpen = this.DOM.header.querySelector('.open');
    this.DOM.sidenav = this.DOM.el.querySelector('.sidenav');
    this.DOM.sidenavClose = this.DOM.sidenav.querySelector('.close');
    this.DOM.carouselContainer = this.DOM.main.querySelector('.work_content > .container');
    this.DOM.nextSlideBtn = this.DOM.carouselContainer.querySelector('.next > .next_slide');
    this.DOM.prevSlideBtn = this.DOM.carouselContainer.querySelector('.prev > .prev_slide');
    this.DOM.slides = Array.from(this.DOM.carouselContainer.querySelectorAll('.carousel-item'));
    this.DOM.indicators = Array.from(this.DOM.carouselContainer.querySelectorAll('.indicator'));
    this.slidesTotal = this.DOM.slides.length;
    this.current = 0;

    this.DOM.slides[this.current].classList.add('active--slide', 'fade--in');
    this.DOM.indicators[this.current].classList.add('active--indicator');

    // console.log(this.DOM.elBody);

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        this.DOM.header.classList.add("header-on-scroll");
      } else {
        this.DOM.header.classList.remove("header-on-scroll");
      }
    });

    this.DOM.sidenav.addEventListener('click', (e) => {
      if (e.target.id != "sidenav__link") return;
      this.DOM.sidenav.classList.toggle('sidenav--open')
    })

    this.DOM.nextSlideBtn.addEventListener('click', () => this.moveTo("next"));

    this.DOM.prevSlideBtn.addEventListener('click', () => this.moveTo("prev"));

    this.DOM.sidenavOpen.addEventListener('click', () => this.DOM.sidenav.classList.toggle('sidenav--open'));

    this.DOM.sidenavClose.addEventListener('click', () => this.DOM.sidenav.classList.toggle('sidenav--open'));

    this.DOM.dropdownContent.addEventListener('click', e => {
      // Get the previous mode
      let prevMode = this.DOM.elBody.className;
      // Get the new mode
      let currentMode = e.target.id === "dark" ? "dark--mode" : "light--mode";
      // Replace the previous mode with current mode
      this.DOM.elBody.classList.replace(prevMode, currentMode);
      // Replace the text in dropdown trigger
      this.DOM.dropdownTrigger.textContent = e.target.textContent;
    })
  }

  moveTo(direction) {
    this.DOM.slides[this.current].classList.remove("active--slide", "fade--in");
    this.DOM.indicators[this.current].classList.remove('active--indicator');

    this.current = direction === 'next' ? this.current < this.slidesTotal-1 ? this.current + 1 : 0 : this.current > 0 ? this.current - 1 : this.slidesTotal-1;

    this.DOM.slides[this.current].classList.add("active--slide", "fade--in");
    this.DOM.indicators[this.current].classList.add('active--indicator');
  }
}

new Portfolio(document.querySelector('.body'));
