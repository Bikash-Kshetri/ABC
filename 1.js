document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    this.querySelector("i").classList.toggle("fa-times");
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.getAttribute("href") === "#") return;

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        }
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Verse Share Modal
  const shareBtns = document.querySelectorAll(".share-btn");
  const shareModal = document.getElementById("shareModal");
  const closeModal = document.querySelectorAll(".close-modal");
  const verseToShare = document.getElementById("verseToShare");

  shareBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const verseText = this.getAttribute("data-verse");
      verseToShare.textContent = verseText;
      shareModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Video Modal
  const videoCards = document.querySelectorAll(".video-card");
  const videoModal = document.getElementById("videoModal");
  const videoIframe = videoModal.querySelector("iframe");

  videoCards.forEach((card) => {
    card.addEventListener("click", function () {
      const videoUrl = "https://www.youtube.com/embed/7KXGZAEWzn0"; // Replace with actual video URL
      videoIframe.src = videoUrl;
      videoModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Close Modal
  closeModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";

      // Pause video when modal closes
      if (modal.id === "videoModal") {
        videoIframe.src = "";
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";

      // Pause video when modal closes
      if (e.target.id === "videoModal") {
        videoIframe.src = "";
      }
    }
  });

  // Share Options
  const shareOptions = document.querySelectorAll(".share-option");

  shareOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const verse = verseToShare.textContent;
      const encodedVerse = encodeURIComponent(verse);
      const pageUrl = encodeURIComponent(window.location.href);

      if (this.classList.contains("facebook")) {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedVerse}`,
          "_blank"
        );
      } else if (this.classList.contains("twitter")) {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedVerse}&url=${pageUrl}`,
          "_blank"
        );
      } else if (this.classList.contains("whatsapp")) {
        window.open(
          `https://wa.me/?text=${encodedVerse}%20${pageUrl}`,
          "_blank"
        );
      } else if (this.classList.contains("copy")) {
        navigator.clipboard.writeText(`${verse} - ${window.location.href}`);
        alert("Verse copied to clipboard!");
      }
    });
  });

  // Form Submission (prevent default for demo)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! This is a demo form.");
      this.reset();
    });
  });

  // Animation on Scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".about-content, .verse-container, .video-grid, .blog-grid, .contact-content"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".about-content, .verse-container, .video-grid, .blog-grid, .contact-content"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);
});
