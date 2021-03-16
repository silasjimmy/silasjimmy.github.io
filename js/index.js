class Portfolio {
  constructor(el) {
    this.body = el;
    this.scrollToTopBtnWrapper = el.querySelector(".scrollToTopBtn");
    this.scrollToTopBtn = this.scrollToTopBtnWrapper.querySelector(".scrollToTop");
    this.init();
  }

  init() {
    $('.sidenav').sidenav();

    $('.parallax').parallax();

    $('.carousel').carousel({
      numVisible: 3
    });

    $('.materialboxed').materialbox();

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $('.slider').slider({
      height: 350,
      indicators: false,
      interval: 4000,
      duration: 1000
    });

    window.addEventListener("scroll", e => this.scrollToTopBtnWrapper.style.display = e.target.documentElement.scrollTop > 600 ? "block" : "none");

    this.scrollToTopBtn.addEventListener('click', () => document.documentElement.scrollTop = 0);
  }
}

  new Portfolio(document.querySelector('body'));
