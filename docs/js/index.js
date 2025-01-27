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
    { selector: ".section_contact", className: "section_light" },
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
    const translation = el.getAttribute(`data-${toLang}`);
    if (translation) {
      // Trouver l'icône (ou tout autre élément enfant)
      const iconElement = Array.from(el.childNodes).find(
        (node) => node.nodeType === Node.ELEMENT_NODE
      );

      // Réinitialiser le contenu (texte uniquement, pas l'icône)
      el.innerHTML = "";
      const textNode = document.createTextNode(translation);

      // Réinsérer dans le bon ordre : icône + texte

      el.appendChild(textNode); // Place le texte traduit à côté

      if (iconElement) {
        el.appendChild(iconElement); // Garde l'icône à gauche
      }
    }
  });

  // Basculer les boutons de traduction
  translateToEnglish.style.display = toLang === "fr" ? "inline-block" : "none";
  translateToFrench.style.display = toLang === "en" ? "inline-block" : "none";

  // Vérifier les icônes après le changement de langue
  resetIcons();
}

function resetIcons() {
  // Vérifiez si le mode sombre est activé et ajustez les icônes
  const isDarkModeActive = document
    .querySelector(".body_container")
    .classList.contains("dark-mode");
  darkModeIcon.style.display = isDarkModeActive ? "none" : "inline-block";
  lightModeIcon.style.display = isDarkModeActive ? "inline-block" : "none";
}

translateToEnglish.addEventListener("click", () => translatePage("en"));
translateToFrench.addEventListener("click", () => translatePage("fr"));

document.querySelectorAll(".flip-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Bouton cliqué :", button);
    const cardInner = button.closest(".card-inner");
    console.log("Element parent trouvé :", cardInner);
    if (cardInner) {
      cardInner.classList.toggle("flipped");
    }
  });
});
