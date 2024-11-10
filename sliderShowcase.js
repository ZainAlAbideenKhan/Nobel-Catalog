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
    let file = new fetchExcell(
      "https://my.microsoftpersonalcontent.com/personal/6f6dbe47ed41720e/_layouts/15/download.aspx?UniqueId=2b78d71c-00fb-4c37-a9cf-d201d629d5da&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJmYzBlZmYzOS05NGQyLTQxZDUtODM0NS0wOGU5YjMyYTRmYWUiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCIsImFwcGlkIjoiZGU4YmM4YjUtZDlmOS00OGIxLWE4YWQtYjc0OGRhNzI1MDY0IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL215Lm1pY3Jvc29mdHBlcnNvbmFsY29udGVudC5jb21AOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIiwiZXhwIjoiMTczMTIzNzI2OCJ9.oX_KDnzqz4vbpge-QKM3hXWQvyAoPGLU5JZgXYOfjT_8ho8m1w3Js8LePFR0ujjOkHWbuewmDfxN3Y0OfUeOF2g9y3oQsuPtbRULlbLSdC4PAtTJ3j2jQxwvr6D-pNhA_OgUPsa39xjRrH8n1PDB8BR3RUmhD0wYlO8OUMpuiXevfjydtKS-9DlMW77GDmvhhcli61bG8LJ6LkOrFSxJz_-rSbJLuso__J88RhFvJmFzUE5EsKJ7nSIXKboR97zBcdc3VgNkoJGZApjAHtPQ3x51MKENCMVsXlk_7ZD-cr9JoXuLSISHHywdVC-StLcXVn6uzpjn2lmPr8riGRI9UF95eZYpozh2BRITPRCfahdOJDNaq-qqyykmwVgfyIubC5lnMrKM38dWsYEMCZ8acJlntQYGw1VpwCX43CSy9lBeSCassHE2BTOecGQH_6r_253xF8DxvttGmgMg0sjA5Q.6TYSKqQPj-JYcuNUYcJceVO0lbxTD4zSZEArawZAOUU&ApiVersion=2.0"
    );

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
