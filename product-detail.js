// ============ PRODUCT DETAIL PAGE LOGIC ============

const PRODUCTS_STORAGE_KEY = 'products';
let currentProduct = null;

// ============ UTILITY FUNCTIONS ============

/**
 * Format tiền VND
 */
function formatVND(price) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(price);
}

/**
 * Hiển thị toast notification
 */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="toast-body">
            <h3 class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p class="toast-msg">${message}</p>
        </div>
        <div class="toast-close">
            <i class="fa-solid fa-circle-xmark"></i>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Tự động xóa sau 3 giây
    setTimeout(() => {
        toast.remove();
    }, 3000);

    // Xóa khi click vào nút close
    toast.querySelector('.toast-close')?.addEventListener('click', () => {
        toast.remove();
    });
}

// ============ PRODUCT LOADING & RENDERING ============

/**
 * Lấy sản phẩm từ URL parameter
 */
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || null;
}

/**
 * // Lấy trực tiếp từ nguồn chuẩn
 */
function getProductById(productId) {
    const products = window.products || []; // Lấy trực tiếp từ nguồn chuẩn
    return products.find(p => p.id === productId) || null;
}

/**
 * Render thông tin sản phẩm lên trang
 */
function renderProductDetail(product) {
    if (!product) {
        console.error('Sản phẩm không tìm thấy');
        return;
    }

    currentProduct = product;

    // Ảnh sản phẩm
    const mainImg = document.getElementById('mainImg');
    const thumb1 = document.getElementById('thumb1');
    if (mainImg) mainImg.src = product.img;
    if (thumb1) thumb1.src = product.img;

    // Tiêu đề
    const productTitle = document.getElementById('productTitle');
    if (productTitle) productTitle.innerText = product.title;

    // Breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-product');
    if (breadcrumb) breadcrumb.innerText = product.title;

    // Mô tả
    const description = document.getElementById('fullDescription');
    if (description) description.innerText = product.description;

// Thống kê
    const storageKey = `reviews_${product.id}`;
    const storedReviews = localStorage.getItem(storageKey);
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];

    let displayRating = product.rating || 4.9; 
    let displayCount = 0;

    if (reviews.length > 0) {
        displayCount = reviews.length;
        const totalStars = reviews.reduce((sum, review) => sum + review.rating, 0);
        displayRating = (totalStars / displayCount).toFixed(1); 
    }

    const soldCount = document.getElementById('soldCount');
    if (soldCount) soldCount.innerText = `| ${(product.sold || 0).toLocaleString()} đã bán`;

    const ratingValue = document.getElementById('ratingValue');
    if (ratingValue) ratingValue.innerText = displayRating;

    const reviewCount = document.getElementById('reviewCount');
    if (reviewCount) reviewCount.innerText = `${displayCount} đánh giá`;

    // Giá
    const priceDiscount = Math.round(product.price * (100 - product.discount) / 100);
    const priceNow = document.getElementById('priceNow');
    if (priceNow) priceNow.innerText = formatVND(priceDiscount);

    const priceOld = document.getElementById('priceOld');
    if (priceOld) priceOld.innerText = formatVND(product.price);

    const discountBadge = document.getElementById('discountBadge');
    if (discountBadge) discountBadge.innerText = `-${product.discount}%`;
}
// ============ QUANTITY CONTROL ============

/**
 * Tăng số lượng
 */
function increaseQty() {
    const qty = document.getElementById('quantity');
    if (qty) {
        qty.value = parseInt(qty.value) + 1;
    }
}

/**
 * Giảm số lượng
 */
function decreaseQty() {
    const qty = document.getElementById('quantity');
    if (qty && qty.value > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
}

// ============ CART FUNCTIONS ============

/**
 * Thêm sản phẩm vào giỏ hàng
 */
function handleAddToCart() {
    if (!currentProduct) {
        showToast('Sản phẩm không tìm thấy', 'error');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;

    // Bắt buộc phải đăng nhập mới cho thêm vào giỏ
    if (!currentUser) {
        showToast('Vui lòng đăng nhập trước khi mua hàng!', 'warning');
        return;
    }

    let cart = currentUser.cart || [];
    let existItem = cart.find(item => item.id === currentProduct.id);

    if (existItem) {
        existItem.soluong += quantity; // Nếu có rồi thì cộng dồn số lượng
    } else {
        cart.push({ id: currentProduct.id, soluong: quantity, note: '' }); // Chưa có thì thêm mới
    }

    currentUser.cart = cart;
    localStorage.setItem('currentuser', JSON.stringify(currentUser));
    
    // Gọi hàm cập nhật cục thông báo màu đỏ trên icon Giỏ hàng (từ file qutri.js)
    if(typeof updateAmount === 'function') updateAmount(); 
    
    showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
    document.getElementById('quantity').value = 1; // Reset số lượng về 1
}

/**
 * Xử lý nút "Mua ngay" - BAY THẲNG QUA TRANG THANH TOÁN
 */
function handleBuyNow() {
    if (!currentProduct) {
        showToast('Sản phẩm không tìm thấy', 'error');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;

    // Tạo giỏ hàng tạm thời chỉ chứa duy nhất sản phẩm này
    const buyNowItem = [{
        id: currentProduct.id,
        soluong: quantity,
        note: ''
    }];

    // Lưu vào kho buyNowData để trang Checkout ưu tiên đọc
    localStorage.setItem('buyNowData', JSON.stringify(buyNowItem));
    localStorage.removeItem('checkoutCart'); // Xóa giỏ hàng thông thường đi để không bị lẫn lộn

    // Chuyển hướng thẳng sang trang Thanh Toán
    window.location.href = 'Thanhtoan.html';
}

// Em nhớ kiểm tra xem ở cuối file `product-detail.js` đã có mấy dòng export này chưa nhé:
// window.handleAddToCart = handleAddToCart;
// window.handleBuyNow = handleBuyNow;

// ============ INITIALIZATION ============

/**
 * Khởi tạo khi DOM sẵn sàng
 */
document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID sản phẩm từ URL
    const productId = getProductIdFromUrl();
    if (!productId) {
        showToast('Sản phẩm không tìm thấy', 'error');
        return;
    }

    // Lấy dữ liệu sản phẩm
    const product = getProductById(productId);
    if (!product) {
        showToast('Sản phẩm không tồn tại', 'error');
        return;
    }

    // Render sản phẩm
    renderProductDetail(product);

    // Gắn event listeners
    const addCartBtn = document.getElementById('addCartBtn');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
        });
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBuyNow();
        });
    }

    // Cập nhật giỏ hàng
    updateCartUI();
});

// ============ EXPORT TO WINDOW ============
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.handleAddToCart = handleAddToCart;
window.handleBuyNow = handleBuyNow;
window.proceedToBuyNow = proceedToBuyNow;
window.showToast = showToast;