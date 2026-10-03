/* =========================================================
   CONTACT FORM VALIDATION & SENDING
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // 1. تهيئة EmailJS باستخدام المفتاح العام الخاص بك
  // استبدل "YOUR_PUBLIC_KEY" بالمفتاح الذي نسخته من لوحة التحكم
  emailjs.init("71ayPBZbanRvBQ3-N");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // التحقق من صحة النموذج (هذا الجزء من كودك الأصلي جيد)
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.classList.add("was-validated");

    // 2. استبدل showToast القديم باستدعاء EmailJS
    // استبدل "YOUR_SERVICE_ID" و "YOUR_TEMPLATE_ID" بالمعرفات الخاصة بك
    emailjs.sendForm("service_cpdw99k", "template_kviyiwn", form).then(
      () => {
        // رسالة نجاح
        showToast(
          "Message Sent!",
          "Thank you for reaching out. I'll get back to you soon.",
          "success",
        );
        form.reset();
        form.classList.remove("was-validated");
      },
      (error) => {
        // رسالة خطأ
        console.error("FAILED...", error);
        showToast(
          "Failed to Send",
          "Something went wrong. Please try again or contact me directly via email.",
          "error",
        );
      },
    );
  });
});
