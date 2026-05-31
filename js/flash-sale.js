// Flash Sale Slider Navigation
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.fs-product-list');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    
    if (!productList || !prevBtn || !nextBtn) {
        console.warn('Flash sale elements not found');
        return;
    }

    const scrollAmount = 250; // Cuộn 250px mỗi lần click

    // Nút Previous - Cuộn sang trái
    prevBtn.addEventListener('click', function() {
        productList.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Nút Next - Cuộn sang phải
    nextBtn.addEventListener('click', function() {
        productList.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Cập nhật trạng thái nút (disable khi ở đầu/cuối)
    function updateButtonState() {
        const isAtStart = productList.scrollLeft === 0;
        const isAtEnd = productList.scrollLeft + productList.clientWidth >= productList.scrollWidth;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    }

    // Cập nhật khi cuộn
    productList.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);
    
    // Cập nhật trạng thái ban đầu
    updateButtonState();
});
