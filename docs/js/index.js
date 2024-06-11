const darkMode = document.querySelector(".fa-toggle-on");
darkMode.addEventListener("click", (event) => {
  event.preventDefault();
  const night = document.querySelector(".body_container");
  const headerLight = document.querySelector(".header_navbar");
  const descriptionLight = document.querySelector(".description_section");
  const descripImgLight = document.querySelector(".description-img");
  const techLight = document.querySelector(".section_tech");
  const projectLight = document.querySelector(".section_projet");
   const musicLight = document.querySelector(".music_container")
  const footerLight = document.querySelector(".footer_navbar");
  night.classList.toggle("dark-mode");
  headerLight.classList.toggle("shadow_light");
  descriptionLight.classList.toggle("description_light");
  descripImgLight.classList.toggle("descrip_img-light");
  techLight.classList.toggle("tech_light");
  musicLight.classList.toggle("tech_light")
  projectLight.classList.toggle("section_light");
  footerLight.classList.toggle("footer_light");

});

