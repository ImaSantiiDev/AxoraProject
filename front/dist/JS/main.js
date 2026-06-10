/* =========================================
   AXORA - JS mínimo
   Solo: navbar con fondo al hacer scroll
   ========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});