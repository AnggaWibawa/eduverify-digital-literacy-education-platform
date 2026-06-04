const navbar = document.getElementById("navbar"),
  toggle = document.getElementById("menu-toggle"),
  menu = document.getElementById("nav-menu"),
  links = document.querySelectorAll(".nav-link");

// 1. Hamburger Menu (Toggle & Auto-Close + Memicu fungsi scroll)
toggle.onclick = () => {
  [toggle, menu].forEach((el) => el.classList.toggle("open"));
  window.onscroll();
};
links.forEach(
  (l) =>
    (l.onclick = () => {
      [toggle, menu].forEach((el) => el.classList.remove("open"));
      window.onscroll();
    }),
);

// 2. Pusat Logika: Berjalan otomatis saat di-scroll & saat pertama kali halaman dimuat
(window.onscroll = () => {
  // Efek warna navbar putih saat di-scroll / menu mobile terbuka
  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 20 || menu.classList.contains("open"),
  );

  // Scroll Spy Cerdas (Otomatis nonaktif di halaman materi karena id section tidak ditemukan)
  let currentSec = "";
  links.forEach((l) => {
    const sec = document.getElementById(l.getAttribute("href").split("#")[1]);
    if (sec && window.scrollY >= sec.offsetTop - 150) currentSec = sec.id;
  });

  // Hanya berikan class 'active' jika currentSec terisi (hanya di landing page)
  links.forEach((l) =>
    l.classList.toggle(
      "active",
      !!currentSec && l.getAttribute("href").includes(`#${currentSec}`),
    ),
  );
})();
