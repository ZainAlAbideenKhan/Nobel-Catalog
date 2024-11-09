class main {
  constructor() {
    this.mediaFire = window.innerWidth >= 630 ? false : true;
  }
  setUI() {
    document
      .querySelector("nav .burger")
      .addEventListener("click", this.toggleNav);
  }
  toggleNav() {
    if (document.querySelector("nav").clientHeight == 70) {
      document.querySelector("nav .nav-btns-cntr").style.display = "flex";
      document.querySelectorAll("nav .burger div").forEach((element) => {
        element.style.background = "#fff";
      });
      document.querySelector("nav .burger").style.background = "#000";
      document.querySelector("nav").style.height = "60vh";
    } else {
      setTimeout(() => {
        document.querySelector("nav .nav-btns-cntr").style.display = "";
      }, 200);
      document.querySelectorAll("nav .burger div").forEach((element) => {
        element.style.background = "";
      });
      document.querySelector("nav .burger").style.background = "";
      document.querySelector("nav").style.height = "";
    }
  }
}

window.addEventListener("load", () => {
  let admin = new main();
  admin.setUI();
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth >= 630) {
    admin.mediaFire = false;
  } else {
    admin.mediaFire = true;
  }
});
