function initNavbar() {
    console.log('Navbar initialization function called');

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    console.log('Mobile menu button:', mobileMenuButton);
    console.log('Mobile menu element:', mobileMenu);

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            console.log('Mobile menu button CLICKED');
            event.stopPropagation(); // Prevent event from bubbling up
            mobileMenu.classList.toggle('hidden');
            console.log('Mobile menu hidden class toggled. Is hidden:', mobileMenu.classList.contains('hidden'));
        });
    } else {
        console.error('Mobile menu button or element not found!');
    }

    // Mobile blog submenu toggle
    const mobileBlogButton = document.getElementById('mobile-blog-button');
    const mobileBlogSubmenu = document.getElementById('mobile-blog-submenu');
    console.log('Mobile blog button:', mobileBlogButton);
    console.log('Mobile blog submenu element:', mobileBlogSubmenu);

    if (mobileBlogButton && mobileBlogSubmenu) {
        mobileBlogButton.addEventListener('click', (event) => {
            console.log('Mobile blog button CLICKED');
            event.stopPropagation(); // Prevent event from bubbling up to document
            event.preventDefault();  // Prevent any default button behavior
            mobileBlogSubmenu.classList.toggle('hidden');
            console.log('Mobile blog submenu hidden class toggled. Is hidden:', mobileBlogSubmenu.classList.contains('hidden'));
            const arrow = mobileBlogButton.querySelector('svg');
            if (arrow) {
                arrow.classList.toggle('rotate-180');
                console.log('Mobile blog submenu arrow rotated.');
            }
        });
    } else {
        console.error('Mobile blog button or submenu element not found!');
    }

    // Close mobile menu when clicking outside
    if (mobileMenu) {
        document.addEventListener('click', (event) => {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuButton?.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                console.log('Mobile menu closed by clicking outside');
            }
        });
    }
}

// Initialize navbar when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing navbar');
    initNavbar();
});

// Make initNavbar available globally for cases where we need to call it after dynamic loading
window.initNavbar = initNavbar;