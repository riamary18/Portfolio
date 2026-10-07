/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. NAVBAR
     ======================================================= */

  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }

    updateActiveNav();
  }

  function updateActiveNav() {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();


  /* =======================================================
     2. SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    // Fallback for older browsers
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     3. MOBILE HAMBURGER MENU
     ======================================================= */

  const hamburger = document.getElementById("hamburger");
  const navContainer = document.querySelector(".nav-links");

  if (hamburger && navContainer) {

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navContainer.classList.toggle("open");
    });

    // Close menu after clicking a navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navContainer.classList.remove("open");
      });
    });

  }


  /* =======================================================
     4. HAMBURGER ANIMATION
     ======================================================= */

  const hamburgerStyle = document.createElement("style");

  hamburgerStyle.textContent = `
    .hamburger span {
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    .hamburger.active span:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }
  `;

  document.head.appendChild(hamburgerStyle);


  /* =======================================================
     5. SMOOTH SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        const offset = 80;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

    });

  });


  /* =======================================================
     6. HERO PARALLAX
     ======================================================= */

  const heroInner = document.querySelector(".hero-inner");

  if (heroInner) {

    window.addEventListener("scroll", () => {

      const scrollPosition = window.scrollY;

      if (scrollPosition < window.innerHeight) {

        const movement = scrollPosition * 0.1;

        heroInner.style.transform =
          `translateY(${movement}px)`;

      }

    });

  }


  /* =======================================================
     7. CURSOR GLOW
     Desktop only
     ======================================================= */

  if (window.innerWidth > 768) {

    const cursorGlow = document.createElement("div");

    cursorGlow.className = "cursor-glow";

    cursorGlow.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background:
        radial-gradient(
          circle,
          rgba(200,184,154,0.04) 0%,
          transparent 70%
        );
      transform: translate(-50%, -50%);
      transition:
        left 0.15s ease,
        top 0.15s ease;
      mix-blend-mode: screen;
    `;

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (event) => {

      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;

    });

  }


  /* =======================================================
     8. TECH TAG RIPPLE
     ======================================================= */

  const tags = document.querySelectorAll(
    ".tech-tags span, .skill-pills span"
  );

  const rippleStyle = document.createElement("style");

  rippleStyle.textContent = `
    @keyframes rippleAnim {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(rippleStyle);

  tags.forEach((tag) => {

    tag.addEventListener("click", (event) => {

      const rect = tag.getBoundingClientRect();

      const size = Math.max(
        rect.width,
        rect.height
      );

      const ripple = document.createElement("span");

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(200,184,154,0.3);
        transform: scale(0);
        animation: rippleAnim 0.5s linear;
        left: ${event.clientX - rect.left - size / 2}px;
        top: ${event.clientY - rect.top - size / 2}px;
        pointer-events: none;
      `;

      tag.style.position = "relative";
      tag.style.overflow = "hidden";

      tag.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 500);

    });

  });


  /* =======================================================
     9. PROJECT CARD TILT
     Desktop only
     ======================================================= */

  if (window.innerWidth > 768) {

    const projectCards =
      document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

      card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -4;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform = "";

        card.style.transition =
          "transform 0.4s ease, border-color 0.35s ease, box-shadow 0.35s ease";

      });

    });

  }


  /* =======================================================
     10. ROTATING TYPING EFFECT
     ======================================================= */

  const roleElement =
    document.getElementById("rotating-role");

  if (roleElement) {

    const roles = [
      "Data Scientist",
      "AI/ML Engineer",
      "Master's Student @ FAU",
      "Computer Scientist",
      "Computer Vision Engineer",
      "Former Bosch AI Intern"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {

      const currentRole = roles[roleIndex];

      if (!deleting) {

        roleElement.textContent =
          currentRole.substring(
            0,
            characterIndex + 1
          );

        characterIndex++;

        if (characterIndex === currentRole.length) {

          setTimeout(() => {
            deleting = true;
            typeRole();
          }, 1800);

          return;
        }

      } else {

        roleElement.textContent =
          currentRole.substring(
            0,
            characterIndex - 1
          );

        characterIndex--;

        if (characterIndex === 0) {

          deleting = false;

          roleIndex =
            (roleIndex + 1) % roles.length;

        }

      }

      setTimeout(
        typeRole,
        deleting ? 50 : 80
      );

    }

    typeRole();

  }


  /* =======================================================
     11. PROJECT SHOW MORE / SHOW LESS
     ======================================================= */

  const toggleButton =
    document.getElementById("toggleProjects");

  const extraProjects =
    document.querySelectorAll(".extra-project");

  let projectsExpanded = false;

  if (toggleButton && extraProjects.length > 0) {

    toggleButton.addEventListener("click", () => {

      projectsExpanded = !projectsExpanded;

      extraProjects.forEach((project, index) => {

        if (projectsExpanded) {

          project.style.display = "block";

          setTimeout(() => {
            project.classList.add("show");
          }, index * 120);

        } else {

          project.classList.remove("show");

          setTimeout(() => {
            project.style.display = "none";
          }, 300);

        }

      });

      toggleButton.textContent =
        projectsExpanded
          ? "Show Less"
          : "Show More";

    });

  }


  /* =======================================================
     12. PROFILE IMAGE TILT
     Desktop only
     ======================================================= */

  if (window.innerWidth > 768) {

    const profileImage =
      document.querySelector(".hero-image img");

    if (profileImage) {

      profileImage.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            profileImage.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateY =
            ((x - centerX) / centerX) * 2;

          const rotateX =
            ((centerY - y) / centerY) * 2;

          profileImage.style.transform =
            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

        }
      );

      profileImage.addEventListener(
        "mouseleave",
        () => {

          profileImage.style.transform =
            "rotateX(0deg) rotateY(0deg) scale(1)";

        }
      );

    }

  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;

      if (url) {
        window.open(url, '_blank');
      }
    });
  });
  
});