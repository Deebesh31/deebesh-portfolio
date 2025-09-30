function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Dark/Light Mode

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    setDarkMode();
}

btn.addEventListener("click", function () {
    setTheme();
});

btn2.addEventListener("click", function () {
    setTheme();
});

function setTheme() {
    let currentTheme = document.body.getAttribute("theme");

    if (currentTheme === "dark") {
        setLightMode();
    } else {
        setDarkMode();
    }
}

function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");

    themeIcons.forEach((icon) => {
        icon.src = icon.getAttribute("src-dark");
    });
}

function setLightMode() {
    document.body.removeAttribute("theme", "light");
    localStorage.setItem("theme", "light");

    themeIcons.forEach((icon) => {
        icon.src = icon.getAttribute("src-light");
    });
}

let currentPage = 1;
const totalPages = 3;

function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showPage(pageNumber, shouldScroll = true) {
    // Hide all project grids
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`projects-page-${i}`);
        const pageBtn = document.getElementById(`page-${i}`);
                    
        if (i === pageNumber) {
            page.classList.add('active');
            pageBtn.classList.add('active');
        } else {
            page.classList.remove('active');
            pageBtn.classList.remove('active');
        }
    }
        
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
                
    prevBtn.disabled = pageNumber === 1;
    nextBtn.disabled = pageNumber === totalPages;
                
    currentPage = pageNumber;
        
    // Only scroll if requested (not on initial page load)
    if (shouldScroll) {
        scrollToProjects();
    }
}

function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        showPage(pageNumber); // This will scroll by default
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        showPage(newPage); // This will scroll by default
    }
}

// Initialize first page without scrolling
document.addEventListener('DOMContentLoaded', function() {
    showPage(1, false); // Pass false to prevent scrolling on initial load
});

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

setInterval(autoSlide, 5000);