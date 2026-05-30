const PHIVANCHUYEN = 30000;
let priceFinal = document.getElementById("checkout-cart-price-final");
// Trang thanh toan
function thanhtoanpage(option,product) {
    // Xu ly ngay nhan hang
    let today = new Date();
    let ngaymai = new Date();
    let ngaykia = new Date();
    ngaymai.setDate(today.getDate() + 1);
    ngaykia.setDate(today.getDate() + 2);
    let dateorderhtml = `<a href="javascript:;" class="pick-date active" data-date="${today}">
        <span class="text">Hôm nay</span>
        <span class="date">${today.getDate()}/${today.getMonth() + 1}</span>
        </a>
        <a href="javascript:;" class="pick-date" data-date="${ngaymai}">
            <span class="text">Ngày mai</span>
            <span class="date">${ngaymai.getDate()}/${ngaymai.getMonth() + 1}</span>
        </a>

        <a href="javascript:;" class="pick-date" data-date="${ngaykia}">
            <span class="text">Ngày kia</span>
            <span class="date">${ngaykia.getDate()}/${ngaykia.getMonth() + 1}</span>
    </a>`
    document.querySelector('.date-order').innerHTML = dateorderhtml;
    let pickdate = document.getElementsByClassName('pick-date')
    for(let i = 0; i < pickdate.length; i++) {
        pickdate[i].onclick = function () {
            document.querySelector(".pick-date.active").classList.remove("active");
            this.classList.add('active');
        }
    }

    let totalBillOrder = document.querySelector('.total-bill-order');
    let totalBillOrderHtml;
    // Xu ly don hang
    switch (option) {
        case 1: // Thanh toán sản phẩm trong giỏ
            showProductCart();
            let cartTotal = getCartTotal(); // Hàm này đã có giá KM bên qutri.js
            totalBillOrderHtml = `
                <div class="priceFlx">
                    <div class="text">Tiền hàng <span class="count">${getAmountCart()} món</span></div>
                    <div class="price-detail">
                        <span id="checkout-cart-total">${vnd(cartTotal)}</span>
                    </div>
                </div>
                <div class="priceFlx chk-ship">
                    <div class="text">Phí vận chuyển</div>
                    <div class="price-detail chk-free-ship">
                        <span>${vnd(PHIVANCHUYEN)}</span>
                    </div>
                </div>`;
            priceFinal.innerText = vnd(cartTotal + PHIVANCHUYEN);
            break;

        case 2: // Mua ngay
            showProductBuyNow(product);
            // Tính giá sau giảm cho sản phẩm mua ngay
            let finalPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));
            let subtotal = product.soluong * finalPrice;
            
            totalBillOrderHtml = `
                <div class="priceFlx">
                    <div class="text">Tiền hàng <span class="count">${product.soluong} món</span></div>
                    <div class="price-detail">
                        <span id="checkout-cart-total">${vnd(subtotal)}</span>
                    </div>
                </div>
                <div class="priceFlx chk-ship">
                    <div class="text">Phí vận chuyển</div>
                    <div class="price-detail chk-free-ship">
                        <span>${vnd(PHIVANCHUYEN)}</span>
                    </div>
                </div>`;
            priceFinal.innerText = vnd(subtotal + PHIVANCHUYEN);
            break;
    }

    // Tinh tien
    totalBillOrder.innerHTML = totalBillOrderHtml;

    // Xu ly hinh thuc giao hang
    let giaotannoi = document.querySelector('#giaotannoi');
    let tudenlay = document.querySelector('#tudenlay');
    let tudenlayGroup = document.querySelector('#tudenlay-group');
    let chkShip = document.querySelectorAll(".chk-ship");

    function updateCheckoutPrice() {
    // 1. Lấy chuỗi tiền từ giao diện (ví dụ: "297.500 ₫")
    const subtotalText = document.getElementById('checkout-cart-total').textContent;
    
    // 2. CHỖ QUAN TRỌNG: Xóa hết ký tự không phải số để tính toán
    const subtotalNum = parseInt(subtotalText.replace(/[^\d]/g, '')) || 0;
    
    const deliveryMethod = document.querySelector('.type-order-btn.active');
    
    let let shipping = 0;

if (selectedDeliveryMethod === 'home') {
    shipping = subtotal > 500000 ? 0 : 30000;
}
    // Nếu chọn giao tận nơi thì cộng 30k, ngược lại (tự đến lấy) là 0đ
    if (deliveryMethod && deliveryMethod.id === 'giaotannoi') {
        shipping = 30000; 
    }
    
    const total = subtotalNum + shipping;
    
    // 3. Đổ lại số chuẩn lên giao diện
    document.getElementById('shippingPrice').textContent = vnd(shipping);
    document.getElementById('checkout-cart-price-final').textContent = vnd(total);
}
    tudenlay.addEventListener('click', () => {
        giaotannoi.classList.remove("active");
        tudenlay.classList.add("active");
        chkShip.forEach(item => {
            item.style.display = "none";
            updateCheckoutPrice();
        });
        tudenlayGroup.style.display = "block";
        switch (option) {
            case 1:
                priceFinal.innerText = vnd(getCartTotal());
                break;
            case 2:
                priceFinal.innerText = vnd((product.soluong * product.price));
                break;
        }
        updateCheckoutPrice();
    })

    giaotannoi.addEventListener('click', () => {
        tudenlay.classList.remove("active");
        giaotannoi.classList.add("active");
        tudenlayGroup.style.display = "none";
        chkShip.forEach(item => {
            item.style.display = "flex";
        });
        switch (option) {
            case 1:
                priceFinal.innerText = vnd(getCartTotal() + PHIVANCHUYEN);
                break;
            case 2:
                priceFinal.innerText = vnd((product.soluong * product.price) + PHIVANCHUYEN);
                break;
        }
    })

    // Su kien khu nhan nut dat hang
    document.querySelector(".complete-checkout-btn").onclick = () => {
        switch (option) {
            case 1:
                xulyDathang();
                break;
            case 2:
                xulyDathang(product);
                break;
        }
    }
}

// Hien thi hang trong gio
function showProductCart() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'));
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = '';
    currentuser.cart.forEach(item => {
        let product = getProduct(item);
        listOrderHtml += `<div class="food-total">
        <div class="count">${product.soluong}x</div>
        <div class="info-food">
            <div class="name-food">${product.title}</div>
        </div>
    </div>`
    })
    listOrder.innerHTML = listOrderHtml;
}

// Hien thi hang mua ngay
function showProductBuyNow(product) {
    let listOrder = document.getElementById("list-order-checkout");
    let listOrderHtml = `<div class="food-total">
        <div class="count">${product.soluong}x</div>
        <div class="info-food">
            <div class="name-food">${product.title}</div>
        </div>
    </div>`;
    listOrder.innerHTML = listOrderHtml;
}


// Đặt hàng ngay
function dathangngay() {
    let productInfo = document.getElementById("product-detail-content");
    let datHangNgayBtn = productInfo.querySelector(".btn-buy-now");
    datHangNgayBtn.onclick = () => {
        if(localStorage.getItem('currentuser')) {
            let productId = datHangNgayBtn.getAttribute("data-product");
            let soluong = parseInt(productInfo.querySelector(".buttons_added .input-qty").value);
            let notevalue = productInfo.querySelector("#popup-detail-note").value;
            let ghichu = notevalue == "" ? "Không có ghi chú" : notevalue;
            let products = JSON.parse(localStorage.getItem('products'));
            let a = products.find(item => item.id == productId);
            a.soluong = parseInt(soluong);
            a.note = ghichu;
            checkoutpage.classList.add('active');
            thanhtoanpage(2,a);
            closeCart();
            body.style.overflow = "hidden"
        } else {
            toast({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
        }
    }
}

// Close Page Checkout
function closecheckout() {
    checkoutpage.classList.remove('active');
    body.style.overflow = "auto"
}

// Thong tin cac don hang da mua - Xu ly khi nhan nut dat hang
function xulyDathang(product) {
    let diachinhan = "";
    let hinhthucgiao = "";
    let thoigiangiao = "";
    let giaotannoi = document.querySelector("#giaotannoi");
    let tudenlay = document.querySelector("#tudenlay");
    let giaongay = document.querySelector("#giaongay");
    let giaovaogio = document.querySelector("#deliverytime");
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));

    // 1. Hình thức giao & Địa chỉ nhận hàng
    if(giaotannoi && giaotannoi.classList.contains("active")) {
        // Fix ID selector cho đúng với HTML (customerAddress)
        diachinhan = document.querySelector("#customerAddress") ? document.querySelector("#customerAddress").value : "";
        hinhthucgiao = "Giao tận nơi";
    }
    if(tudenlay && tudenlay.classList.contains("active")){
        let chinhanh1 = document.querySelector("#chinhanh-1");
        let chinhanh2 = document.querySelector("#chinhanh-2");
        if(chinhanh1 && chinhanh1.checked) diachinhan = "273 An Dương Vương, Phường 3, Quận 5";
        if(chinhanh2 && chinhanh2.checked) diachinhan = "04 Tôn Đức Thắng, Phường Bến Nghé, Quận 1";
        hinhthucgiao = "Tự đến lấy";
    }

    // 2. Thời gian nhận hàng
    if(giaongay && giaongay.checked) thoigiangiao = "Hỏa tốc";
    if(giaovaogio && giaovaogio.checked) thoigiangiao = document.querySelector(".choise-time").value;

    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
    let order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let madon = createId(order);
    
    // 3. QUAN TRỌNG: Lấy tổng tiền CUỐI CÙNG từ giao diện để chính xác 100%
    let tongtienText = document.getElementById("checkout-cart-price-final").textContent;
    let tongtien = parseInt(tongtienText.replace(/[^\d]/g, '')) || 0;

    // 4. Xử lý chi tiết sản phẩm trong đơn hàng
    if(product == undefined) {
        currentUser.cart.forEach(item => {
            let info = getProduct(item); // Lấy thông tin gốc để có giá và discount
            if(info) {
                let finalPrice = Math.round(info.price * (1 - (info.discount || 0) / 100));
                orderDetails.push({
                    madon: madon,
                    id: item.id,
                    soluong: item.soluong,
                    price: finalPrice, // Lưu giá đã giảm vào lịch sử đơn hàng
                    note: item.note || ""
                });
            }
        });
    } else {
        let finalPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));
        orderDetails.push({
            madon: madon,
            id: product.id,
            soluong: product.soluong,
            price: finalPrice,
            note: product.note || ""
        });
    }   
    
    // 5. Kiểm tra thông tin người nhận (Dùng đúng ID customerName, customerPhone)
    let tennguoinhan = document.querySelector("#customerName") ? document.querySelector("#customerName").value : "";
    let sdtnhan = document.querySelector("#customerPhone") ? document.querySelector("#customerPhone").value : "";

    if(tennguoinhan == "" || sdtnhan == "" || diachinhan == "") {
        toast({ title: 'Chú ý', message: 'Vui lòng nhập đầy đủ thông tin nhận hàng!', type: 'warning', duration: 4000 });
    } else {
        let donhang = {
            id: madon,
            khachhang: currentUser.phone,
            hinhthucgiao: hinhthucgiao,
            ngaygiaohang: document.querySelector(".pick-date.active") ? document.querySelector(".pick-date.active").getAttribute("data-date") : new Date(),
            thoigiangiao: thoigiangiao,
            ghichu: document.querySelector("#orderNote") ? document.querySelector("#orderNote").value : "",
            tenguoinhan: tennguoinhan,
            sdtnhan: sdtnhan,
            diachinhan: diachinhan,
            thoigiandat: new Date(),
            tongtien: tongtien,
            trangthai: 0
        }
    
        order.unshift(donhang);
        
        // Nếu đặt hàng thành công từ giỏ hàng thì xóa giỏ hàng
        if(product == undefined) {
            currentUser.cart = [];
        }
    
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.setItem("currentuser", JSON.stringify(currentUser));
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        
        toast({ title: 'Thành công', message: 'Chúc mừng! Đơn hàng ' + madon + ' đã được đặt thành công.', type: 'success', duration: 1500 });
        
        setTimeout(() => {
            window.location.href = "Sanpham.html"; // Quay về trang chủ
        }, 2000);  
    }
}

function getpriceProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    let sp = products.find(item => {
        return item.id == id;
    })
    return sp.price;
}

function calculateTotal() {
    let subtotal = 0;

    checkoutCart.forEach(item => {
        const product = allProducts.find(p => parseInt(p.id) === parseInt(item.id));
        if (!product) return;

        const price = Number(product.price) || 0;
        const discount = Number(product.discount) || 0;
        const quantity = Number(item.soluong) || 1;

        const finalPrice = price * (1 - discount / 100);
        subtotal += finalPrice * quantity;
    });

    let shipping = selectedDeliveryMethod === 'home' ? 30000 : 0;

    console.log('shipping:', shipping); // 🔥 check

    const total = subtotal + shipping;

    document.getElementById('checkout-cart-total').textContent = subtotal.toLocaleString('vi-VN') + 'đ';
    document.getElementById('shippingPrice').textContent = shipping.toLocaleString('vi-VN') + 'đ';
    document.getElementById('checkout-cart-price-final').textContent = total.toLocaleString('vi-VN') + 'đ';
}