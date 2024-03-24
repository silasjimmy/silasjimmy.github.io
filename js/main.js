class Portfolio {
  constructor(el) {
    this.el = el;
    this.hiddenContent = document.querySelector(".hidden--content");
    this.toggleBtn = document.getElementById("toggle--hidden");

    this.initEvents();
  }

  initEvents() {
    this.toggleBtn.addEventListener("click", () => this.toggleHiddenContent());
  }

  toggleHiddenContent() {
    if (this.hiddenContent.classList.contains("hide")) {
      this.hiddenContent.classList.remove("hide");
      this.toggleBtn.innerHTML = "show less";
    } else {
      this.hiddenContent.classList.add("hide");
      this.toggleBtn.innerHTML = "show more";
    }
  }
}

new Portfolio(document.getElementsByTagName("body"));
