// Function to include HTML components
async function includeHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error loading component: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // If this is the navbar, initialize it
        if (elementId === 'navbar-container' && window.initNavbar) {
            console.log('Navbar loaded, initializing...');
            window.initNavbar();
        }
        
        // Initialize mobile menu toggle after navbar is loaded
        if (elementId === 'navbar-container') {
            initMobileMenu();
        }
        
        // Initialize scroll to top button after footer is loaded
        if (elementId === 'footer-container') {
            initScrollToTop();
        }
    } catch (error) {
        console.error(`Failed to include ${filePath}:`, error);
    }
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize scroll to top button functionality
function initScrollToTop() {
    const scrollTopButton = document.getElementById('scroll-top');

    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.remove('hidden');
            } else {
                scrollTopButton.classList.add('hidden');
            }
        });

        scrollTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Set active link in navbar based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    
    // Get all navbar links
    setTimeout(() => {
        const navLinks = document.querySelectorAll('#navbar-container a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Skip contact links
            if (linkPath && linkPath.includes('whatsapp') || linkPath.includes('tel:')) {
                return;
            }
            
            // Check if the current path matches the link path
            if (linkPath && currentPath.includes(linkPath) && linkPath !== '/index.html') {
                link.classList.add('text-green-600');
                link.classList.remove('text-gray-700');
            } else if (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) {
                link.classList.add('text-green-600');
                link.classList.remove('text-gray-700');
            }
        });
    }, 100); // Small delay to ensure navbar is loaded
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Include navbar
    if (document.getElementById('navbar-container')) {
        includeHTML('navbar-container', '../components/navbar.html');
    }
    
    // Include footer
    if (document.getElementById('footer-container')) {
        includeHTML('footer-container', '../components/footer.html');
    }
    
    // Include recent articles
    // if (document.getElementById('recent-articles-container')) {
    //     includeHTML('recent-articles-container', '../components/recent-articles.html');
    // }
    
    // Set active link in navbar
    setActiveNavLink();
});
