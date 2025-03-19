document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const primaryNavigation = document.getElementById("primary-navigation");
  const themeToggle = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");
  const langToggle = document.getElementById("lang-toggle");
  const enFlag = document.getElementById("en-flag");
  const frFlag = document.getElementById("fr-flag");
  const backToTopButton = document.getElementById("back-to-top");
  const flipButtons = document.querySelectorAll(".flip-btn");
  const sections = document.querySelectorAll("section");
  const softSkillCards = document.querySelectorAll(".soft-skill-card");

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", () => {
      const isExpanded =
        mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      primaryNavigation.setAttribute("data-visible", !isExpanded);

      if (!isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", () => {
      if (primaryNavigation.hasAttribute("data-visible")) {
        mobileNavToggle.setAttribute("aria-expanded", false);
        primaryNavigation.removeAttribute("data-visible");
        document.body.style.overflow = "";
      }
    });
  }

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme = localStorage.getItem("theme");

  // Appliquer le thème sauvegardé ou celui préféré par l'utilisateur
  if (savedTheme === "light") {
    enableLightMode();
  } else if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
    enableDarkMode();
  }

  function enableDarkMode() {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  }

  function enableLightMode() {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("light-mode")) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    });
  }

  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage === "en") {
    translateToEnglish();
  } else {
    translateToFrench();
  }

  function translateToEnglish() {
    const elementsToTranslate = document.querySelectorAll("[data-en]");
    for (const element of elementsToTranslate) {
      element.textContent = element.getAttribute("data-en");
    }
    enFlag.style.display = "none";
    frFlag.style.display = "block";
    localStorage.setItem("language", "en");
  }

  function translateToFrench() {
    const elementsToTranslate = document.querySelectorAll("[data-fr]");
    for (const element of elementsToTranslate) {
      element.textContent = element.getAttribute("data-fr");
    }
    enFlag.style.display = "block";
    frFlag.style.display = "none";
    localStorage.setItem("language", "fr");
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      if (enFlag.style.display === "none") {
        translateToFrench();
      } else {
        translateToEnglish();
      }
    });
  }

  for (const button of flipButtons) {
    button.addEventListener("click", function () {
      const card = this.closest(".project-card-inner");
      card.classList.toggle("is-flipped");
    });
  }

  softSkillCards.forEach((card) => {
    card.addEventListener("click", function () {
      const inner = this.querySelector(".soft-skill-card-inner");
      inner.classList.toggle("is-flipped");
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    }
  }, observerOptions);

  for (const section of sections) {
    observer.observe(section);
  }

  const anchors = document.querySelectorAll('a[href^="#"]');
  for (const anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth"
        });
      }
    });
  }

  if ("loading" in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    for (const img of lazyImages) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    }
  } else {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      }
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    for (const lazyImage of lazyImages) {
      if (lazyImage.dataset.src) {
        lazyImageObserver.observe(lazyImage);
      }
    }
  }

  document.body.classList.add("loaded");

  const carousels = document.querySelectorAll(".mobile-carousel");

  function addScrollIndicators() {
    if (window.innerWidth <= 768) {
      for (const carousel of carousels) {
        const scrollWidth = carousel.scrollWidth;
        const clientWidth = carousel.clientWidth;

        if (scrollWidth > clientWidth) {
          carousel.closest(".section").classList.add("has-carousel");
        } else {
          carousel.closest(".section").classList.remove("has-carousel");
        }
      }
    }
  }
  for (const carousel of carousels) {
    // Ajouter la détection de fin de défilement
    carousel.addEventListener(
      "scroll",
      function () {
        // Petite fonction pour débounce le scroll
        if (carousel.scrollTimeout) {
          clearTimeout(carousel.scrollTimeout);
        }

        carousel.scrollTimeout = setTimeout(() => {
          // Vérifier qu'il y a des éléments dans le carousel
          const firstItem = carousel.querySelector(".mobile-carousel-item");
          if (!firstItem) return;

          // Calculer l'élément le plus visible
          const scrollPosition = carousel.scrollLeft;
          const itemWidth = firstItem.offsetWidth;
          if (itemWidth === 0) return; // Protection supplémentaire

          const currentIndex = Math.round(scrollPosition / itemWidth);

          // Mise à jour des dots si présents
          const parentSection = carousel.closest(".section");
          if (parentSection) {
            const dots = parentSection.querySelectorAll(".mobile-carousel-dot");
            if (dots.length > 0) {
              dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
              });
            }
          }
        }, 150);
      },
      { passive: true }
    );
  }
});
