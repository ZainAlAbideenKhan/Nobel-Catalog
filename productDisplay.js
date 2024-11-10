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
    let file = new fetchExcell(
      "https://my.microsoftpersonalcontent.com/personal/6f6dbe47ed41720e/_layouts/15/download.aspx?UniqueId=7fe63a90-4a6a-49cd-8a0d-7559b953fecf&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJmYzBlZmYzOS05NGQyLTQxZDUtODM0NS0wOGU5YjMyYTRmYWUiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCIsImFwcGlkIjoiZGU4YmM4YjUtZDlmOS00OGIxLWE4YWQtYjc0OGRhNzI1MDY0IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL215Lm1pY3Jvc29mdHBlcnNvbmFsY29udGVudC5jb21AOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIiwiZXhwIjoiMTczMTIzNjM5MiJ9.HGEK0hbZdt6tCqFgmKOjT91yx6TSyj8xLbmFfZ3XVw9_57NrcbjaMxnZRjco3v0LHRBdLPbnH7mxjOejtjcLRvgJRvyLbcbx0fP-jV6KnYL9Df2YeiMdySARCJtPnP1jo_JTlBjpcOKZpJJ9qUbUkgZHcooO88BcP-d5hAg3v3omi3tkffjeIkQx9wYJVmYA9oxTRMcsMzN2eOVu9nlhksBtvIDycRl4l55gzI2OrF8sCkbBBlQegxc6jmP7rHGnOCCUQVgFQNJyukYNOdgsc-OgGzUE4TF_GT710TanOFAq15SGHLqkSgKKg6rqzFLnUwP-aJJNDi2QHRMd8pfXip7VSQTWOGNut5iQRCvEqKxFaBXZ_5p7lTJtlnhniWIhRPZNkGkR0P13LWi6SJcZUzlQ94hTTH5MFHNayKyS1cjrDFId2LYeVKSXPaEIF5VMP-hE4iYI1u_kYncGKS46Pg.GnoMqJ_51M9JoIvBqT7umDNzP4WFlWlWRkRBO32zxDg&ApiVersion=2.0"
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
