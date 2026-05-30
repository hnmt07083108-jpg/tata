// ============ ACCOUNT MANAGEMENT SCRIPT ============

// Hàm hiển thị thông tin tài khoản
function showAccountInfo() {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser) {
        toast({ 
            title: 'Cảnh báo', 
            message: 'Vui lòng đăng nhập trước!', 
            type: 'warning', 
            duration: 3000 
        });
        return;
    }

    // Hiển thị container tài khoản
    const accountContainer = document.getElementById('account-user');
    if (accountContainer) {
        accountContainer.style.display = 'block';
        
        // Điền thông tin
        document.getElementById('infoname').value = currentUser.fullname || '';
        document.getElementById('infophone').value = currentUser.phone || '';
        document.getElementById('infoemail').value = currentUser.email || '';
        document.getElementById('infoaddress').value = currentUser.address || '';
        
        // Scroll to view
        accountContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Ẩn lịch sử đơn hàng
        const orderContainer = document.getElementById('order-history');
        if (orderContainer) orderContainer.style.display = 'none';
    }
}

// Hàm hiển thị lịch sử đơn hàng
function showOrderHistory() {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser) {
        toast({ 
            title: 'Cảnh báo', 
            message: 'Vui lòng đăng nhập trước!', 
            type: 'warning', 
            duration: 3000 
        });
        return;
    }

    // Hiển thị container lịch sử đơn hàng
    const orderContainer = document.getElementById('order-history');
    if (orderContainer) {
        orderContainer.style.display = 'block';
        const orderHistorySection = document.querySelector('.order-history-section');
        
        let orders = currentUser.orders || [];
        
        if (orders.length === 0) {
            orderHistorySection.innerHTML = `
                <div class="empty-order">
                    <i class="fa-solid fa-inbox"></i>
                    <p>Bạn chưa có đơn hàng nào</p>
                </div>
            `;
        } else {
            let ordersHTML = '';
            orders.forEach((order, index) => {
                const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
                const totalPrice = order.items.reduce((sum, item) => {
                    const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.id);
                    const price = product ? product.price : 0; // Nếu không thấy thì để giá 0
                    return sum + (price * item.soluong);
                }, 0);
                
                ordersHTML += `
                    <div class="order-item">
                        <div class="order-header">
                            <div class="order-info">
                                <p class="order-id">Đơn hàng #${order.id || index + 1}</p>
                                <p class="order-date">${orderDate}</p>
                            </div>
                            <div class="order-status">
                                <span class="status-badge ${order.status || 'pending'}">${getStatusText(order.status)}</span>
                            </div>
                        </div>
                        <div class="order-items">
                            ${order.items.map(item => {
                                const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.id);
                                return `
                                    <div class="order-item-detail">
                                        <img src="${product.img}" alt="${product.title}">
                                        <div class="item-info">
                                            <p class="item-name">${product.title}</p>
                                            <p class="item-qty">x${item.soluong}</p>
                                        </div>
                                        <p class="item-price">${(product.price * item.soluong).toLocaleString()}đ</p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="order-footer">
                            <div class="order-total">
                                <p class="total-label">Tổng cộng:</p>
                                <p class="total-price">${totalPrice.toLocaleString()}đ</p>
                            </div>
                            <div class="order-actions">
                                <button class="btn-detail" onclick="showOrderDetail(${index})">
                                    <i class="fa-regular fa-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-reorder" onclick="reorderItems(${index})">
                                    <i class="fa-regular fa-rotate-right"></i> Mua lại
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            orderHistorySection.innerHTML = ordersHTML;
        }
        
        // Scroll to view
        orderContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Ẩn thông tin tài khoản
        const accountContainer = document.getElementById('account-user');
        if (accountContainer) accountContainer.style.display = 'none';
    }
}

// Hàm lấy text trạng thái
function getStatusText(status) {
    const statusMap = {
        'pending': '⏳ Chờ xác nhận',
        'confirmed': '✅ Đã xác nhận',
        'shipping': '🚚 Đang giao',
        'delivered': '📦 Đã giao',
        'cancelled': '❌ Đã hủy'
    };
    return statusMap[status] || '⏳ Chờ xác nhận';
}

// Hàm lưu thay đổi thông tin
function changeInformation() {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser) {
        toast({ 
            title: 'Lỗi', 
            message: 'Vui lòng đăng nhập!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    const fullname = document.getElementById('infoname').value.trim();
    const email = document.getElementById('infoemail').value.trim();
    const address = document.getElementById('infoaddress').value.trim();

    // Validate
    if (!fullname) {
        toast({ 
            title: 'Lỗi', 
            message: 'Vui lòng nhập họ và tên!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    if (email && !isValidEmail(email)) {
        toast({ 
            title: 'Lỗi', 
            message: 'Email không hợp lệ!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    // Lưu thông tin
    currentUser.fullname = fullname;
    currentUser.email = email;
    currentUser.address = address;

    localStorage.setItem('currentuser', JSON.stringify(currentUser));

    toast({ 
        title: 'Thành công', 
        message: 'Cập nhật thông tin thành công!', 
        type: 'success', 
        duration: 3000 
    });
}

// Hàm đổi mật khẩu
function changePassword() {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser) {
        toast({ 
            title: 'Lỗi', 
            message: 'Vui lòng đăng nhập!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    const passwordCur = document.getElementById('password-cur-info').value;
    const passwordNew = document.getElementById('password-after-info').value;
    const passwordConfirm = document.getElementById('password-comfirm-info').value;

    // Validate
    if (!passwordCur || !passwordNew || !passwordConfirm) {
        toast({ 
            title: 'Lỗi', 
            message: 'Vui lòng nhập đầy đủ thông tin!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    if (passwordCur !== currentUser.password) {
        toast({ 
            title: 'Lỗi', 
            message: 'Mật khẩu hiện tại không đúng!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    if (passwordNew.length < 6) {
        toast({ 
            title: 'Lỗi', 
            message: 'Mật khẩu mới phải có ít nhất 6 ký tự!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    if (passwordNew !== passwordConfirm) {
        toast({ 
            title: 'Lỗi', 
            message: 'Mật khẩu mới không khớp!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    // Cập nhật mật khẩu
    currentUser.password = passwordNew;
    localStorage.setItem('currentuser', JSON.stringify(currentUser));

    // Clear input
    document.getElementById('password-cur-info').value = '';
    document.getElementById('password-after-info').value = '';
    document.getElementById('password-comfirm-info').value = '';

    toast({ 
        title: 'Thành công', 
        message: 'Đổi mật khẩu thành công!', 
        type: 'success', 
        duration: 3000 
    });
}

// Hàm xem chi tiết đơn hàng
function showOrderDetail(orderIndex) {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser || !currentUser.orders || !currentUser.orders[orderIndex]) {
        toast({ 
            title: 'Lỗi', 
            message: 'Không tìm thấy đơn hàng!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    const order = currentUser.orders[orderIndex];
    const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
    const totalPrice = order.items.reduce((sum, item) => {
        const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.id);
        return sum + (product.price * item.soluong);
    }, 0);

    let detailHTML = `
        <div class="order-detail-info">
            <div class="detail-group">
                <h4>Thông tin đơn hàng</h4>
                <p><strong>Mã đơn:</strong> #${order.id || orderIndex + 1}</p>
                <p><strong>Ngày đặt:</strong> ${orderDate}</p>
                <p><strong>Trạng thái:</strong> <span class="status-badge ${order.status || 'pending'}">${getStatusText(order.status)}</span></p>
            </div>
            
            <div class="detail-group">
                <h4>Thông tin người nhận</h4>
                <p><strong>Tên:</strong> ${order.receiverName || 'N/A'}</p>
                <p><strong>Điện thoại:</strong> ${order.receiverPhone || 'N/A'}</p>
                <p><strong>Địa chỉ:</strong> ${order.receiverAddress || 'N/A'}</p>
            </div>
            
            <div class="detail-group">
                <h4>Sản phẩm</h4>
                <table class="order-items-table">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => {
                            const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === item.id);
                            const itemTotal = product.price * item.soluong;
                            return `
                                <tr>
                                    <td>${product.title}</td>
                                    <td>${product.price.toLocaleString()}đ</td>
                                    <td>${item.soluong}</td>
                                    <td><strong>${itemTotal.toLocaleString()}đ</strong></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="detail-group">
                <h4>Chi tiết thanh toán</h4>
                <p><strong>Tổng tiền sản phẩm:</strong> ${totalPrice.toLocaleString()}đ</p>
                <p><strong>Phí vận chuyển:</strong> ${(order.shippingFee || 0).toLocaleString()}đ</p>
                <p><strong>Giảm giá:</strong> -${(order.discount || 0).toLocaleString()}đ</p>
                <p class="total"><strong>Tổng cộng:</strong> ${((totalPrice + (order.shippingFee || 0) - (order.discount || 0))).toLocaleString()}đ</p>
            </div>
            
            ${order.note ? `<div class="detail-group"><h4>Ghi chú:</h4><p>${order.note}</p></div>` : ''}
        </div>
    `;

    const detailOrderContent = document.querySelector('.detail-order-content');
    if (detailOrderContent) {
        detailOrderContent.innerHTML = detailHTML;
        const detailOrderModal = document.querySelector('.detail-order');
        if (detailOrderModal) {
            detailOrderModal.style.display = 'flex';
        }
    }
}

// Hàm mua lại sản phẩm trong đơn hàng
function reorderItems(orderIndex) {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser || !currentUser.orders || !currentUser.orders[orderIndex]) {
        toast({ 
            title: 'Lỗi', 
            message: 'Không tìm thấy đơn hàng!', 
            type: 'error', 
            duration: 3000 
        });
        return;
    }

    const order = currentUser.orders[orderIndex];
    let cart = currentUser.cart || [];

    order.items.forEach(item => {
        let existItem = cart.find(cartItem => cartItem.id === item.id);
        if (existItem) {
            existItem.soluong += item.soluong;
        } else {
            cart.push({ id: item.id, soluong: item.soluong, note: '' });
        }
    });

    currentUser.cart = cart;
    localStorage.setItem('currentuser', JSON.stringify(currentUser));
document.querySelector('.count-product-cart').innerText = getAmountCart();
    toast({ 
        title: 'Thành công', 
        message: 'Đã thêm sản phẩm vào giỏ hàng!', 
        type: 'success', 
        duration: 3000 
    });
}

// Hàm tạo đơn hàng (gọi sau khi thanh toán)
function createOrder(orderData) {
    let currentUser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : null;
    
    if (!currentUser) return false;

    let orders = currentUser.orders || [];
    
    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'pending',
        items: orderData.items || [],
        receiverName: orderData.receiverName,
        receiverPhone: orderData.receiverPhone,
        receiverAddress: orderData.receiverAddress,
        shippingFee: orderData.shippingFee || 0,
        discount: orderData.discount || 0,
        note: orderData.note || '',
        paymentMethod: orderData.paymentMethod || 'cod'
    };

    orders.push(newOrder);
    currentUser.orders = orders;
    currentUser.cart = [];

    localStorage.setItem('currentuser', JSON.stringify(currentUser));
    return true;
}

// Hàm validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============ CLOSE MODAL FUNCTION ============
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Đóng modal khi click vào nút close
document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.form-close, .modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Đóng modal khi click ngoài
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
});
// ============ CART STATE MANAGER ============
// Tập trung quản lý state giỏ hàng theo chuẩn chung

const CART_STORAGE_KEY = 'cart';
const DECIMAL_PLACES = 0;

// ============ UTILITY FUNCTIONS ============

/**
 * Format tiền VND
 */
function vnd(price) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(price);
}

/**
 * Chuẩn hóa dữ liệu sản phẩm theo chuẩn
 */
function normalizeCartItem(item) {
    return {
        id: Number(item.id),
        title: item.title || 'Sản phẩm không xác định',
        price: Number(item.price) || 0,
        discount: Number(item.discount) || 0,
        img: item.img || '../images/placeholder.png',
        soluong: Number(item.soluong ?? item.quantity ?? 1) || 1,
        variants: item.variants || []
    };
}

// ============ CART STATE FUNCTIONS ============

/**
 * Lấy giỏ hàng từ localStorage
 * @returns {Array} Mảng sản phẩm trong giỏ
 */
function getCart() {
    try {
        // 1. Thử lấy từ key 'cart' riêng lẻ
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        // 2. Nếu không có, thử lấy từ trong currentuser
        if (!cart || cart.length === 0) {
            const currentUser = JSON.parse(localStorage.getItem('currentuser'));
            cart = currentUser ? currentUser.cart : [];
        }
        
        return Array.isArray(cart) ? cart.map(normalizeCartItem) : [];
    } catch (error) {
        console.error('Lỗi lấy giỏ hàng:', error);
        return [];
    }
}
/**
 * Lưu giỏ hàng vào localStorage
 * @param {Array} cart - Mảng sản phẩm
 */
function setCart(cart) {
    try {
        const normalizedCart = cart.map(normalizeCartItem);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedCart));
    } catch (error) {
        console.error('Lỗi khi lưu giỏ hàng:', error);
    }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} product - Sản phẩm (phải có: id, title, price, discount, img)
 * @param {number} quantity - Số lượng (mặc định: 1)
 * @returns {boolean} Thành công hay không
 */
function addToCart(product, quantity = 1) {
    if (!product || !product.id) {
        console.error('Sản phẩm không hợp lệ');
        return false;
    }

    let cart = getCart();
    quantity = Number(quantity) || 1;

    // Tìm sản phẩm trong giỏ
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // Cộng số lượng nếu đã tồn tại
        existingItem.soluong += quantity;
    } else {
        // Thêm sản phẩm mới
        cart.push(normalizeCartItem({
            ...product,
            soluong: quantity
        }));
    }

    setCart(cart);
    return true;
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @param {number} productId - ID sản phẩm
 * @returns {boolean} Thành công hay không
 */
function removeFromCart(productId) {
    let cart = getCart();
    const initialLength = cart.length;
    
    cart = cart.filter(item => item.id !== productId);

    if (cart.length < initialLength) {
        setCart(cart);
        return true;
    }
    return false;
}

/**
 * Cập nhật số lượng sản phẩm
 * @param {number} productId - ID sản phẩm
 * @param {number} newQuantity - Số lượng mới
 * @returns {boolean} Thành công hay không
 */
function updateQuantity(productId, newQuantity) {
    newQuantity = Number(newQuantity) || 1;
    
    if (newQuantity < 1) {
        return removeFromCart(productId);
    }

    let cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (item) {
        item.soluong = newQuantity;
        setCart(cart);
        return true;
    }
    return false;
}

/**
 * Xóa toàn bộ giỏ hàng
 */
function clearCart() {
    setCart([]);
}

// ============ CART CALCULATION FUNCTIONS ============

/**
 * Tính giá cuối cùng sau giảm giá
 * @param {number} price - Giá gốc
 * @param {number} discount - Phần trăm giảm
 * @returns {number} Giá sau giảm
 */
function calculateFinalPrice(price, discount) {
    return Math.round(price * (1 - (discount || 0) / 100));
}

/**
 * Tính tổng số lượng sản phẩm
 * @returns {number} Tổng số lượng
 */
function getTotalQuantity() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.soluong || 0), 0);
}

/**
 * Tính tổng giá (sau giảm, chưa cộng phí vận chuyển)
 * @returns {number} Tổng tiền
 */
function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => {
        const finalPrice = calculateFinalPrice(item.price, item.discount);
        return sum + (finalPrice * (item.soluong || 0));
    }, 0);
}

/**
 * Tính phí vận chuyển
 * @param {boolean} isDelivery - Có giao tận nơi không (true: 30k, false: 0)
 * @returns {number} Phí vận chuyển
 */
function getShippingFee(isDelivery = true) {
    return isDelivery ? 30000 : 0;
}

/**
 * Tính tổng tiền (bao gồm phí vận chuyển)
 * @param {boolean} isDelivery - Có giao tận nơi không
 * @returns {number} Tổng tiền
 */
function getCartTotal(isDelivery = true) {
    const subtotal = getCartSubtotal();
    const shipping = getShippingFee(isDelivery);
    return subtotal + shipping;
}

// ============ UI UPDATE FUNCTIONS ============

/**
 * Cập nhật tất cả UI liên quan đến giỏ hàng
 */
function updateCartUI() {
    updateCartCount();
    updateCartDisplay();
    updateCheckoutUI();
}

/**
 * Cập nhật số lượng hiển thị trên icon giỏ hàng
 */
function updateCartCount() {
    const totalQty = getTotalQuantity();
    const cartCountElements = document.querySelectorAll('.count-product-cart');
    
    cartCountElements.forEach(el => {
        el.textContent = totalQty;
    });
}

/**
 * Cập nhật hiển thị giỏ hàng (danh sách sản phẩm + tổng tiền)
 */
function updateCartDisplay() {
    const cartList = document.querySelector('.cart-list');
    const cartEmptyMsg = document.querySelector('.gio-hang-trong');
    const textPriceEl = document.querySelector('.text-price');
    const checkoutBtn = document.querySelector('.thanh-toan');

    if (!cartList) return;

    const cart = getCart();
    const subtotal = getCartSubtotal();

    // Hiển thị/ẩn thông báo giỏ trống
    if (cart.length === 0) {
        cartList.innerHTML = '';
        if (cartEmptyMsg) cartEmptyMsg.style.display = 'flex';
        if (checkoutBtn) checkoutBtn.classList.add('disabled');
        if (textPriceEl) textPriceEl.textContent = '0đ';
        return;
    }

    if (cartEmptyMsg) cartEmptyMsg.style.display = 'none';
    if (checkoutBtn) checkoutBtn.classList.remove('disabled');

    // Render danh sách sản phẩm
    cartList.innerHTML = cart.map(item => {
        const finalPrice = calculateFinalPrice(item.price, item.discount);
        const itemTotal = finalPrice * item.soluong;

        return `
            <li class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.title}</p>
                    <span class="cart-item-price price" data-price="${item.price}">
                        ${vnd(finalPrice)}
                    </span>
                </div>
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.img}" alt="${item.title}" onerror="this.src='../images/placeholder.png'">
                    </div>
                    <div class="cart-item-control">
                        <button class="cart-item-delete" onclick="removeFromCart(${item.id}); updateCartUI();">Xóa</button>
                        <div class="buttons_added">
                            <input class="minus is-form" type="button" value="-" 
                                   onclick="updateQuantity(${item.id}, ${item.soluong - 1}); updateCartUI();">
                            <input class="input-qty" max="100" min="1" type="number" value="${item.soluong}"
                                   onchange="updateQuantity(${item.id}, this.value); updateCartUI();">
                            <input class="plus is-form" type="button" value="+"
                                   onclick="updateQuantity(${item.id}, ${item.soluong + 1}); updateCartUI();">
                        </div>
                    </div>
                </div>
            </li>
        `;
    }).join('');

    // Cập nhật tổng tiền
    if (textPriceEl) {
        textPriceEl.textContent = vnd(subtotal);
    }
}

/**
 * Cập nhật UI trang checkout
 */
function updateCheckoutUI() {
    const cart = getCart();
    const subtotal = getCartSubtotal();
    const isDelivery = document.getElementById('giaotannoi')?.classList.contains('active') !== false;
    const shipping = getShippingFee(isDelivery);
    const total = subtotal + shipping;
if (document.getElementById('shippingPrice')) {
        document.getElementById('shippingPrice').textContent = vnd(shipping);
    }
    // Cập nhật tạm tính
    const subtotalEl = document.getElementById('checkout-cart-total');
    if (subtotalEl) {
        subtotalEl.textContent = vnd(subtotal);
    }

    // Cập nhật phí vận chuyển
    const shippingEl = document.getElementById('shippingPrice');
    if (shippingEl) {
        shippingEl.textContent = vnd(shipping);
    }

    // Cập nhật tổng cộng
    const totalEl = document.getElementById('checkout-cart-price-final');
    if (totalEl) {
        totalEl.textContent = vnd(total);
    }

    // Render danh sách sản phẩm trong checkout
    const listOrderCheckout = document.getElementById('list-order-checkout');
    if (listOrderCheckout && cart.length > 0) {
        listOrderCheckout.innerHTML = cart.map(item => `
            <div class="food-total">
                <div class="count">${item.soluong}×</div>
                <div class="info-food">
                    <div class="name-food">${item.title}</div>
                </div>
            </div>
        `).join('');
    }
}

// ============ EVENT LISTENERS FOR DELIVERY METHOD ============

/**
 * Khởi tạo event listeners cho nút chọn hình thức giao hàng
 */
function initDeliveryMethodListeners() {
    const giaotannoi = document.getElementById('giaotannoi');
    const tudenlay = document.getElementById('tudenlay');

    if (giaotannoi) {
        giaotannoi.addEventListener('click', () => {
            document.querySelectorAll('.type-order-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            giaotannoi.classList.add('active');
            updateCheckoutUI();
        });
    }

    if (tudenlay) {
        tudenlay.addEventListener('click', () => {
            document.querySelectorAll('.type-order-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            tudenlay.classList.add('active');
            updateCheckoutUI();
        });
    }
}

// ============ INITIALIZATION ============

/**
 * Khởi tạo khi DOM sẵn sàng
 */
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initDeliveryMethodListeners();
});

// ============ EXPORT TO WINDOW ============
window.getCart = getCart;
window.setCart = setCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.calculateFinalPrice = calculateFinalPrice;
window.getTotalQuantity = getTotalQuantity;
window.getCartSubtotal = getCartSubtotal;
window.getShippingFee = getShippingFee;
window.getCartTotal = getCartTotal;
window.updateCartUI = updateCartUI;
window.updateCartCount = updateCartCount;
window.updateCartDisplay = updateCartDisplay;
window.updateCheckoutUI = updateCheckoutUI;
window.vnd = vnd;