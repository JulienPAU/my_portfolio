const darkModeIcon = document.getElementById("darkModeIcon");
const lightModeIcon = document.getElementById("lightModeIcon");

function toggleDarkMode() {
  const elementsToToggle = [
    { selector: ".body_container", className: "dark-mode" },
    { selector: ".header_navbar", className: "shadow_light" },
    { selector: ".description_section", className: "description_light" },
    { selector: ".description-img", className: "descrip_img-light" },
    { selector: ".section_tech", className: "tech_light" },
    { selector: ".music_container", className: "tech_light" },
    { selector: ".section_projet", className: "section_light" },
    { selector: ".footer_navbar", className: "footer_light" }
  ];

  elementsToToggle.forEach((element) => {
    const el = document.querySelector(element.selector);
    if (el) {
      el.classList.toggle(element.className);
    }
  });

  // Basculer entre les icônes
  darkModeIcon.style.display =
    darkModeIcon.style.display === "none" ? "inline-block" : "none";
  lightModeIcon.style.display =
    lightModeIcon.style.display === "none" ? "inline-block" : "none";
}

darkModeIcon.addEventListener("click", toggleDarkMode);
lightModeIcon.addEventListener("click", toggleDarkMode);

const translateToEnglish = document.getElementById("translateToEnglish");
const translateToFrench = document.getElementById("translateToFrench");

function translatePage(toLang) {
  const elements = document.querySelectorAll("[data-fr][data-en]");
  elements.forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${toLang}`);
  });

  translateToEnglish.style.display = toLang === "fr" ? "inline-block" : "none";
  translateToFrench.style.display = toLang === "en" ? "inline-block" : "none";
}

translateToEnglish.addEventListener("click", () => translatePage("en"));
translateToFrench.addEventListener("click", () => translatePage("fr"));
