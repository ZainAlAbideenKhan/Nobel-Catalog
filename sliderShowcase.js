import { fetchExcell } from "./fileGetter.js";

class sliderShowcase {
  constructor(selector) {
    this.element = document.querySelector(`${selector}`);
    this.loopID = 0;
    this.loopIndex = 0;
    this.loopForward = 1;
    this.childCount = 0;
    this.data = [];
  }
  /**
   * First to ecxecute and loads the data from excell sheet
   */
  run() {
    let file = new fetchExcell(".\\slider_showcase.xlsx");

    (async () => {
      try {
        this.data = await file.fetchFile();
        this.Main();
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    })();
  }
  /**
   * Triggers setting, working and control of slides.
   */
  Main() {
    this.childCount = this.data.length - 1;
    for (let i = 1; i < this.data.length; i++) {
      let html = this.getHtml(i);
      this.setHtml(html);
    }
  }
  /**
   * returns html generated for each product
   * @param {Number} index - index of the row of a product (i = n - 1)
   */
  getHtml(index) {
    let row = this.data[index];
    let html = `
    <div class="slides">
      <div class="image-container">
        <img src=".\\resources\\${row[3]}" alt="">
      </div>
      <div class="text-container">
        <div class="title">${row[0]}</div>
        <div class="price">${row[1]}</div>
        <div class="desc">${row[2]}</div>
      </div>
    </div>
    `;
    return html;
  }

  setHtml(html) {
    this.element.insertAdjacentHTML("beforeend", html);
  }
  /**
   * slide the current slide to out of frame and brings the next slide to view, fully automatic method dosen't require any input just need to call toswitch to next window
   */
  slideNext = () => {
    if (this.loopIndex < this.childCount && this.loopForward) {
      if (this.loopIndex == 0) {
        this.element.children[0].style.left = "0";
      } else {
        let prev = this.element.children[this.loopIndex - 1];
        let next = this.element.children[this.loopIndex];

        prev.style.left = "-100vw";
        next.style.left = 0;
      }
      this.loopIndex++;
    } else {
      this.loopForward = 0;
      if (this.loopIndex == this.childCount) {
        this.element.children[this.childCount - 1].style.left = "100vw";
        this.element.children[this.childCount - 2].style.left = 0;
        this.loopIndex -= 2;
      } else {
        let next = this.element.children[this.loopIndex];
        let curr = this.element.children[this.loopIndex + 1];

        next.style.left = 0;
        curr.style.left = "100vw";
      }
      this.loopIndex--;
      if (this.loopIndex < 0) {
        this.loopIndex = 0;
        this.loopForward = 1;
      }
    }
  };

  startAutoSlide = (interval) => {
    this.loopID = setInterval(() => {
      this.slideNext();
    }, interval);
  };
}

// TEMP
let slider = new sliderShowcase(".slider-showcase");
slider.run();
setTimeout(() => {
  slider.startAutoSlide(3000);
}, 100);
