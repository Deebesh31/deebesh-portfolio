function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function toggleMoreProjects() {
    const moreProjects = document.getElementById('more-projects');
    const arrow = document.getElementById('dropdown-arrow');
    const text = document.getElementById('view-more-text');
    
    if (moreProjects.style.display === 'none' || moreProjects.style.display === '') {
        moreProjects.style.display = 'block';
        arrow.classList.add('rotated');
        text.textContent = 'View Less Projects';
    } else {
        moreProjects.style.display = 'none';
        arrow.classList.remove('rotated');
        text.textContent = 'View More Projects';
    }
}

let slideIndex = 1;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    if (slides[slideIndex - 1] && dots[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].classList.add("active");
    }
}

// Auto-advance slideshow (optional)
function autoSlide() {
    changeSlide(1);
}

// Uncomment the line below if you want auto-advancing slides every 5 seconds
// setInterval(autoSlide, 5000);