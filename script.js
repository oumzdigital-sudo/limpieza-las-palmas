(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }
    video.play().catch(() => {});
  });

  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (form && formNote) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formNote.className = "form-note";

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const nombre = data.get("nombre");
      const telefono = data.get("telefono");
      const servicio = data.get("servicio") || "consulta general";
      const mensaje = data.get("mensaje");

      const text = encodeURIComponent(
        `Hola, soy ${nombre} (${telefono}).\n` +
          `Servicio: ${servicio}\n\n` +
          `${mensaje}`
      );

      formNote.textContent =
        "¡Gracias! Te redirigimos a WhatsApp para enviar tu solicitud.";
      formNote.classList.add("success");

      setTimeout(() => {
        window.open(`https://wa.me/34600000000?text=${text}`, "_blank");
        form.reset();
      }, 800);
    });
  }
})();
