import { fetchExcell } from "./fileGetter.js";

class productDisplay {
  constructor() {
    this.element = document.querySelector(".product-display");
    this.data = [];
    this.catg = {};
  }
  /**
   * First to execute and loads the data from excell sheet
   */
  run() {
    let file = new fetchExcell(".\\catelog.xlsx");

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
   * Main mehtod control dom manupilation(adding of product tiles) and scroll.
   */
  Main() {
    this.getCategories();
    Object.keys(this.catg).forEach((cat_name) => {
      this.setHtmlCategory(cat_name);
    });
    for (let i = 1; i < this.data.length; i++) {
      const html = this.getHtml(i);
      this.setHtml(this.data[i][3], html);
    }
  }
  /**
   * retruns categories array present in the dataset
   */
  getCategories() {
    let categories = [];
    for (let i = 1; i < this.data.length; i++) {
      categories.push(this.data[i][3]);
    }
    const distinct = [...new Set(categories)];
    distinct.forEach((cat) => {
      this.catg[cat] = "";
    });
  }
  /**
   * return html text of a product in a category
   * @param {number} index - index of product in a category
   */
  getHtml(index) {
    let html = `
    <div class="tile">
      <div class="image">
        <img src=".\\resources\\${this.data[index][4]}">
      </div>
      <div class="details">
        <div class="name">${this.data[index][0]}</div>
        <div class="price">${this.data[index][1]}</div>
        <div class="desc">${this.data[index][2]}</div>
      </div>
    </div>
    `;

    return html;
  }
  /**
   * sets dom of a product tile in a category
   * @param {string} category - name of category in which product tile will be added
   * @param {string} html - html string for dom
   */
  setHtml(category, html) {
    let parent = this.element.querySelector(`section[data-name='${category}']`);
    parent = parent.querySelector(".tile-container");
    parent.insertAdjacentHTML("beforeend", html);
  }
  /**
   * Sets dom of category
   * @param {string} category - category to be built
   */
  setHtmlCategory(category) {
    const id = Math.floor(1000 + Math.random() * 9000);
    let html = `<section class="display-section" id="disp-sect-${id}" data-name="${category}">
      <div class="sect-info">
        <div class="title">
          ${category}
        </div>
      </div>
      <div class="tile-container"></div>
    </section>`;
    this.element.insertAdjacentHTML("beforeend", html);
  }
}

let catelog = new productDisplay();
catelog.run();
