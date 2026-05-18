/**
 * Toggle Hamburger Menu
 */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/**
 * Navbar Scroll Effect
 */
window.addEventListener("scroll", function () {
  const navs = document.querySelectorAll("#desktop-nav, #hamburger-nav");
  navs.forEach(nav => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});

/**
 * Active Navigation Scroll Spy
 */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-links a, .menu-links a");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/**
 * Background Parallax Mouse Move Effect
 */
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  const floatingObjects = document.querySelectorAll(".floating-object");
  floatingObjects.forEach((object, index) => {
    // Unique multi-layered speed factor for high-end depth illusion
    const speed = (index + 1) * 0.008;
    const x = (window.innerWidth / 2 - mouseX) * speed;
    const y = (window.innerHeight / 2 - mouseY) * speed;
    
    // Using translate3d triggers hardware acceleration for 60fps buttery smoothness
    object.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
});

/**
 * Scroll Reveal Animation
 */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

/**
 * Back to Top Button
 */
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/**
 * Smooth Scroll for Navigation Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});


const PUBLIC_KEY = "_ofT5XhEZ_aDX8s1t";
const SERVICE_ID = "service_kz71xyy";
const TEMPLATE_ID = "template_v6luyfm";

// Initialize only if keys are provided
if (PUBLIC_KEY && PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init(PUBLIC_KEY);
}

/**
 * Contact Form Handler
 */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check if Email.js is configured
    if (!PUBLIC_KEY || PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      formStatus.textContent = "❌ Email.js is not configured. Please set up your credentials in script.js";
      formStatus.classList.add("error");
      return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");

    try {
      // Send email using Email.js
      const response = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);

      if (response.status === 200) {
        formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.classList.add("success");
        contactForm.reset();
      }
    } catch (error) {
      console.error("Email.js Error:", error);
      formStatus.textContent = "❌ Failed to send message. Please try again or email me directly.";
      formStatus.classList.add("error");
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}
