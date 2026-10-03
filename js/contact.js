/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.classList.add("was-validated");

    // No backend/email service is connected yet.
    // Ready for integration with EmailJS, Formspree, or a Node.js API.
    showToast(
      "Message ready",
      "Your message is validated. Connect this form to EmailJS, Formspree, or a Node.js API to actually send it.",
      "info"
    );

    form.reset();
    form.classList.remove("was-validated");
  });
});
