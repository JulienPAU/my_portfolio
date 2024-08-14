const darkModeIcon = document.getElementById("darkModeIcon");
const lightModeIcon = document.getElementById("lightModeIcon");

function toggleDarkMode() {
  const night = document.querySelector(".body_container");
  const headerLight = document.querySelector(".header_navbar");
  const descriptionLight = document.querySelector(".description_section");
  const descripImgLight = document.querySelector(".description-img");
  const techLight = document.querySelector(".section_tech");
  const projectLight = document.querySelector(".section_projet");
  const musicLight = document.querySelector(".music_container");
  const footerLight = document.querySelector(".footer_navbar");
  
  night.classList.toggle("dark-mode");
  headerLight.classList.toggle("shadow_light");
  descriptionLight.classList.toggle("description_light");
  descripImgLight.classList.toggle("descrip_img-light");
  techLight.classList.toggle("tech_light");
  musicLight.classList.toggle("tech_light");
  projectLight.classList.toggle("section_light");
  footerLight.classList.toggle("footer_light");
  
  // Basculer entre les icônes
  darkModeIcon.style.display = darkModeIcon.style.display === "none" ? "inline-block" : "none";
  lightModeIcon.style.display = lightModeIcon.style.display === "none" ? "inline-block" : "none";
}

darkModeIcon.addEventListener("click", toggleDarkMode);
lightModeIcon.addEventListener("click", toggleDarkMode);



const translateToEnglish = document.getElementById('translateToEnglish');
const translateToFrench = document.getElementById('translateToFrench');

function translatePage(toLang) {
  const elements = document.querySelectorAll('[data-fr][data-en]');
  elements.forEach(el => {
    el.innerHTML = el.getAttribute(`data-${toLang}`);
  });
  
  translateToEnglish.style.display = toLang === 'fr' ? 'inline-block' : 'none';
  translateToFrench.style.display = toLang === 'en' ? 'inline-block' : 'none';
}

translateToEnglish.addEventListener('click', () => translatePage('en'));
translateToFrench.addEventListener('click', () => translatePage('fr'));