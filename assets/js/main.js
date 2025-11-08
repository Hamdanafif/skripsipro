/* =========================================================
   main.js - Bimbingan Skripsi Pro
   Interaktivitas global: dark mode, animasi, loader, WhatsApp, dan lainnya
   ========================================================= */

// ====== LOADER ======
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("opacity-0");
    setTimeout(() => loader.remove(), 500);
  }
});

// ====== DARK MODE TOGGLE ======
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
  const savedMode = localStorage.getItem("theme");

  // Terapkan mode dari penyimpanan
  if (savedMode === "dark") {
    document.body.classList.add("dark");
    darkModeToggle.setAttribute("aria-pressed", "true");
    darkModeToggle.textContent = "☀️ Mode Terang";
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkModeToggle.setAttribute("aria-pressed", isDark.toString());
    darkModeToggle.textContent = isDark ? "☀️ Mode Terang" : "🌙 Mode Gelap";
  });
}

// ====== ANIMASI FADE-IN-UP ======
const fadeElements = document.querySelectorAll(".fade-in-up");
const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  fadeElements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) el.classList.add("opacity-100", "translate-y-0");
  });
};
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ====== TESTIMONIALS AUTO LOAD ======
const testimonialContainer = document.getElementById("testimonial-container");
if (testimonialContainer) {
  fetch("assets/js/testimonials.js")
    .then((res) => res.json())
    .then((data) => {
      testimonialContainer.innerHTML = data
        .map(
          (item) => `
        <div class="p-6 bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg text-left hover:-translate-y-2 transition">
          <p class="italic text-gray-600 dark:text-gray-300 mb-4">“${item.pesan}”</p>
          <div class="flex items-center">
            <img src="${item.foto}" alt="${item.nama}" class="w-12 h-12 rounded-full mr-3 object-cover">
            <div>
              <h4 class="font-semibold text-indigo-600 dark:text-indigo-400">${item.nama}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">${item.kampus}</p>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch((err) => console.error("Gagal memuat testimoni:", err));
}

// ====== TAHUN OTOMATIS FOOTER ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== FORM KONTAK → KIRIM KE WHATSAPP ======
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !email || !pesan) {
      alert("Harap isi semua kolom terlebih dahulu.");
      return;
    }

    const text = `Halo Bimbingan Skripsi Pro!%0A%0A` +
                 `Nama: ${nama}%0A` +
                 `Email: ${email}%0A` +
                 `Pesan: ${pesan}`;

    const waUrl = `https://wa.me/6287773665508?text=${text}`;
    window.open(waUrl, "_blank");
  });
}

// ====== AKHIR FILE ======
