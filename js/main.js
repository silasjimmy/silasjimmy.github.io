// class Site {
//   constructor(el) {
//     this.el = el;
//     console.log("Hello!");
//     console.log(document.getElementsByTagName("body"));

//   }
// }

// const site = new Site(document.getElementsByTagName("body"));

function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

function animateNavbar() {
  console.log(document.getElementById("navbar"));
}

animateNavbar();
