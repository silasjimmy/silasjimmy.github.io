class Portfolio {
  constructor(el) {
    this.DOM = {};
    this.DOM.el = el;

    this.DOM.header = this.DOM.el.querySelector('header');

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        this.DOM.header.classList.add("header-on-scroll");
      } else {
        this.DOM.header.classList.remove("header-on-scroll");
      }
    })
  }
}

new Portfolio(document.querySelector('.main'));
