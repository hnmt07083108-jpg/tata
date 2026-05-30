// ============================================
// HAMBURGER MENU - MOBILE NAVIGATION
// Xử lý mở/đóng sidebar menu
// ============================================

(function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.mobile-sidebar-overlay');
    const navItems = document.querySelectorAll('.mobile-nav-item');

    // Hàm mở/đóng menu
    function toggleMenu() {
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
    }

    // Xử lý click hamburger
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Đóng menu khi click overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            overlay.classList.remove('active');
        });
    }

    // Xử lý submenu (Categories)
    navItems.forEach(item => {
        const hasSubmenu = item.classList.contains('has-submenu');
        if (hasSubmenu) {
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    item.classList.toggle('active');
                });
            }
        }
    });

    // Đóng menu khi click vào item (chỉ áp dụng cho link không có submenu)
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && !item.classList.contains('has-submenu')) {
            link.addEventListener('click', () => {
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
            });
        }
    });

    // Đóng menu khi resize lên desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    });
})();

// ============================================
// SEARCH BOX - Mobile Integration
// Di chuyển search vào mobile sidebar
// ============================================

(function() {
    // Xử lý search trong mobile menu
    const mobileSearchInput = document.querySelector('.mobile-search-box input');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            const searchValue = this.value;
            // Trigger search logic (có thể kết nối với search.js hiện tại)
            if (window.handleMobileSearch) {
                window.handleMobileSearch(searchValue);
            }
        });
    }
})();
