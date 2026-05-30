var productAll = window.products || [];
// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Close popup 
const body = document.querySelector("body");
let modalContainer = document.querySelectorAll('.modal');
let modalBox = document.querySelectorAll('.mdl-cnt');
let formLogSign = document.querySelector('.forms');

// Click vùng ngoài sẽ tắt Popup
modalContainer.forEach(item => {
    item.addEventListener('click', closeModal);
});

modalBox.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
    })
});

function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    console.log(modalContainer)
    body.style.overflow = "auto";
}

function increasingNumber(e) {
    let qty = e.parentNode.querySelector('.input-qty');
    if (parseInt(qty.value) < qty.max) {
        qty.value = parseInt(qty.value) + 1;
    } else {
        qty.value = qty.max;
    }
}

function decreasingNumber(e) {
    let qty = e.parentNode.querySelector('.input-qty');
    if (qty.value > qty.min) {
        qty.value = parseInt(qty.value) - 1;
    } else {
        qty.value = qty.min;
    }
}

//Xem chi tiet san pham
function detailProduct(index) {
    let modal = document.querySelector('.modal.product-detail');
    let products = JSON.parse(localStorage.getItem('products'));
    event.preventDefault();
    let infoProduct = products.find(sp => {
        return sp.id === index;
    })
    let modalHtml = `<div class="modal-header">
    <img class="product-image" src="${infoProduct.img}" alt="">
    </div>
    <div class="modal-body">
        <h2 class="product-title">${infoProduct.title}</h2>
        <div class="product-control">
            <div class="priceBox">
                <span class="current-price">${vnd(infoProduct.price)}</span>
            </div>
            <div class="buttons_added">
                <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                <input class="input-qty" max="100" min="1" name="" type="number" value="1">
                <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
            </div>
        </div>
        <p class="product-description">${infoProduct.description}</p>
    </div>
    <div class="notebox">
            <p class="notebox-title">Ghi chú</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Nhập thông tin cần lưu ý..."></textarea>
    </div>
    <div class="modal-footer">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(infoProduct.price)}</span>
        </div>
        <div class="modal-footer-control">
            <button class="button-dathangngay" data-product="${infoProduct.id}">Đặt hàng ngay</button>
            <button class="button-dat" id="add-cart" onclick="animationCart()"><i class="fa-light fa-basket-shopping"></i></button>
        </div>
    </div>`;
    document.querySelector('#product-detail-content').innerHTML = modalHtml;
    modal.classList.add('open');
    body.style.overflow = "hidden";
    //Cap nhat gia tien khi tang so luong san pham
    let tgbtn = document.querySelectorAll('.is-form');
    let qty = document.querySelector('.product-control .input-qty');
    let priceText = document.querySelector('.price');
    tgbtn.forEach(element => {
        element.addEventListener('click', () => {
            let price = infoProduct.price * parseInt(qty.value);
            priceText.innerHTML = vnd(price);
        });
    });
    // Them san pham vao gio hang
    let productbtn = document.querySelector('.button-dat');
    productbtn.addEventListener('click', (e) => {
        if (localStorage.getItem('currentuser')) {
            addCart(infoProduct.id);
        } else {
            toast({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
        }

    })
    // Mua ngay san pham
    dathangngay();
}

function animationCart() {
    document.querySelector(".count-product-cart").style.animation = "slidein ease 1s"
    setTimeout(()=>{
        document.querySelector(".count-product-cart").style.animation = "none"
    },1000)
}

// Them SP vao gio hang
function addCart(index) {
    let currentuser = localStorage.getItem('currentuser') ? JSON.parse(localStorage.getItem('currentuser')) : [];
    let soluong = document.querySelector('.input-qty').value;
    let popupDetailNote = document.querySelector('#popup-detail-note').value;
    let note = popupDetailNote == "" ? "Không có ghi chú" : popupDetailNote;
    let productcart = {
        id: index,
        soluong: parseInt(soluong),
        note: note
    }
    let vitri = currentuser.cart.findIndex(item => item.id == productcart.id);
    if (vitri == -1) {
        currentuser.cart.push(productcart);
    } else {
        currentuser.cart[vitri].soluong = parseInt(currentuser.cart[vitri].soluong) + parseInt(productcart.soluong);
    }
    localStorage.setItem('currentuser', JSON.stringify(currentuser));
    updateAmount();
    closeModal();
    // toast({ title: 'Success', message: 'Thêm thành công sản phẩm vào giỏ hàng', type: 'success', duration: 3000 });
}

// Show gio hang
function showCart() {
    if (localStorage.getItem('currentuser') != null) {
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));
        
        if (currentuser.cart.length != 0) {
            let productcarthtml = '';
            let tongtien = 0;  // ✅ Tính tổng tiền đúng từ đầu
            
            currentuser.cart.forEach(item => {
                let product = getProduct(item);
                
                if (!product) return;
                
                // ✅ Tính giá đã sale
                let finalPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));
                let itemTotal = finalPrice * product.soluong;
                tongtien += itemTotal;
                
                productcarthtml += `<li class="cart-item" data-id="${product.id}">
                <div class="cart-item-info">
                    <p class="cart-item-title">
                        ${product.title}
                    </p>
                    <span class="cart-item-price price" data-price="${finalPrice}">
                        ${vnd(finalPrice)}
                    </span>
                </div>
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${product.img}" alt="${product.title}" onerror="this.onerror=null; this.src='../images/placeholder.png';">
                    </div>
                    <div class="cart-item-control">
                        <button class="cart-item-delete" onclick="deleteCartItem(${product.id},this)">Xóa</button>
                        <div class="buttons_added">
                            <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this); updateAfterChange();">
                            <input class="input-qty" max="100" min="1" name="" type="number" value="${product.soluong}" onchange="updateAfterChange();">
                            <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this); updateAfterChange();">
                        </div>
                    </div>
                </div>
            </li>`
            });
            
            if (productcarthtml === '') {
                document.querySelector('.gio-hang-trong').style.display = 'flex';
                document.querySelector('button.thanh-toan').classList.add('disabled');
                document.querySelector('.cart-list').innerHTML = '';
                document.querySelector('.text-price').innerText = '0đ';
            } else {
                document.querySelector('.gio-hang-trong').style.display = 'none';
                document.querySelector('button.thanh-toan').classList.remove('disabled');
                document.querySelector('.cart-list').innerHTML = productcarthtml;
                
                // ✅ Update tổng tiền
                document.querySelector('.text-price').innerText = vnd(tongtien);
            }
            
        } else {
            document.querySelector('.gio-hang-trong').style.display = 'flex';
            document.querySelector('button.thanh-toan').classList.add('disabled');
            document.querySelector('.cart-list').innerHTML = '';
            document.querySelector('.text-price').innerText = '0đ';
        }
    }
    
    let modalCart = document.querySelector('.modal-cart');
    let containerCart = document.querySelector('.cart-container');
    let themmon = document.querySelector('.them-mon');
    
    if (modalCart) {
        modalCart.onclick = function () {
            closeCart();
        }
    }
    if (themmon) {
        themmon.onclick = function () {
            closeCart();
        }
    }
    if (containerCart) {
        containerCart.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    }
}
// ✅ HÀM MỚI: Cập nhật giỏ hàng khi thay đổi số lượng
function updateAfterChange() {
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let listProduct = document.querySelectorAll('.cart-item');
    
    // ✅ Update số lượng vào localStorage
    listProduct.forEach((item) => {
        let id = parseInt(item.getAttribute("data-id"));
        let newQty = parseInt(item.querySelector(".input-qty").value) || 1;
        
        let cartItem = currentUser.cart.find(ci => ci.id === id);
        if (cartItem) {
            cartItem.soluong = newQty;
        }
    });
    
    localStorage.setItem('currentuser', JSON.stringify(currentUser));
    
    // ✅ Render lại giỏ hàng
    showCart();
}
// Thêm sự kiện cho nút Thanh toán
document.addEventListener('DOMContentLoaded', function() {
    let checkoutBtn = document.querySelector('button.thanh-toan');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled')) {
                e.preventDefault();
                proceedToCheckout();
            }
        });
    }
});

// Hàm điều hướng đến trang checkout với dữ liệu giỏ hàng
function proceedToCheckout() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'));
    
    if (!currentuser || !currentuser.cart || currentuser.cart.length === 0) {
        toast({ title: 'Cảnh báo', message: 'Giỏ hàng trống!', type: 'warning', duration: 3000 });
        return;
    }

    // Lưu dữ liệu giỏ hàng vào localStorage với tên checkoutCart
    localStorage.setItem('checkoutCart', JSON.stringify(currentuser.cart));
    localStorage.removeItem('buyNowData');
    
    // Chuyển hướng đến trang checkout
    window.location.href = 'Thanhtoan.html';
}

// Delete cart item
function deleteCartItem(id, el) {
    let cartParent = el.parentNode.parentNode;
    cartParent.remove();
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let vitri = currentUser.cart.findIndex(item => item.id === id)
    currentUser.cart.splice(vitri, 1);

    // ✅ Cập nhật localStorage
    localStorage.setItem('currentuser', JSON.stringify(currentUser));
    
    // ✅ Render lại toàn bộ
    showCart();
    
    // ✅ Cập nhật số lượng trên icon
    updateAmount();
}

//Update cart total
function updateCartTotal() {
    let currentUser = localStorage.getItem('currentuser') ? 
        JSON.parse(localStorage.getItem('currentuser')) : null;
    
    let tongtien = 0;
    
    // ✅ Recalculate tất cả sản phẩm
    if (currentUser && currentUser.cart) {
        currentUser.cart.forEach(item => {
            let product = getProduct(item);
            
            if (product && product.price) {
                // ✅ Tính giá đã sale
                let finalPrice = Math.round(
                    product.price * (1 - (product.discount || 0) / 100)
                );
                
                let quantity = parseInt(item.soluong) || 1;
                tongtien += (finalPrice * quantity);
            }
        });
    }
    
    // ✅ Update UI
    let priceEl = document.querySelector('.text-price');
    if (priceEl) {
        priceEl.innerText = vnd(tongtien);
    }
    
    console.log(`✅ Tổng tiền giỏ: ${tongtien}đ`);
}
function getCartTotal() {
    let currentUser = localStorage.getItem('currentuser') ? 
        JSON.parse(localStorage.getItem('currentuser')) : null;
    
    let tongtien = 0;
    
    if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
        currentUser.cart.forEach(item => {
            let product = getProduct(item);
            
            if (product && product.price) {
                let finalPrice = Math.round(
                    product.price * (1 - (product.discount || 0) / 100)
                );
                
                let quantity = parseInt(item.soluong) || 1;
                tongtien += (finalPrice * quantity);
                
                console.log(`[${product.title}] ${finalPrice}đ × ${quantity} = ${finalPrice * quantity}đ`);
            }
        });
    }
    
    console.log(`💰 Tổng tiền: ${tongtien}đ`);
    return tongtien;
}

// Get Product 
function getProduct(item) {
    let products = window.products || []; 
    // Dùng parseInt để chắc chắn ID khớp nhau 100%
    let infoProductCart = products.find(sp => parseInt(sp.id) === parseInt(item.id)); 
    
    if (!infoProductCart) return null; // Lọc sạch sản phẩm ma
    return {
        ...infoProductCart,
        soluong: item.soluong || 1,  
        note: item.note || ''  }
window.onload = updateAmount();
window.onload = updateCartTotal();
    };
// Lay so luong hang

function getAmountCart() {
    let currentuser = JSON.parse(localStorage.getItem('currentuser'))
    let amount = 0;
    currentuser.cart.forEach(element => {
        amount += parseInt(element.soluong);
    });
    return amount;
}

//Update Amount Cart 
function updateAmount() {
    if (localStorage.getItem('currentuser') != null) {
        let amount = getAmountCart();
        document.querySelector('.count-product-cart').innerText = amount;
    }
}

// Save Cart Info
function saveAmountCart() {
    let cartAmountbtn = document.querySelectorAll(".cart-item-control .is-form");
    let listProduct = document.querySelectorAll('.cart-item');
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    
    cartAmountbtn.forEach((btn, index) => {
        btn.removeEventListener('click', arguments.callee);
        
        btn.addEventListener('click', function updateQuantity_Handler() {
            let id = listProduct[parseInt(index / 2)].getAttribute("data-id");
            let productId = currentUser.cart.find(item => {
                return item.id == id;
            });
            
            let newQty = parseInt(listProduct[parseInt(index / 2)].querySelector(".input-qty").value);
            productId.soluong = newQty;
            
            localStorage.setItem('currentuser', JSON.stringify(currentUser));
            
            showCart();
            
            updateCartTotal();
        });
    });
}

// Open & Close Cart
function openCart() {
    showCart();
    document.querySelector('.modal-cart').classList.add('open');
    body.style.overflow = "hidden";
}

function closeCart() {
    document.querySelector('.modal-cart').classList.remove('open');
    body.style.overflow = "auto";
    updateAmount();
}

// Open Search Advanced
const filterBtnElement = document.querySelector(".filter-btn");
const advancedSearchElement = document.querySelector(".advanced-search");
const homeServiceElement = document.getElementById("home-service");
const formSearchInputElement = document.querySelector(".form-search-input");

if (filterBtnElement) {
    filterBtnElement.addEventListener("click",(e) => {
        e.preventDefault();
        if (advancedSearchElement) {
            advancedSearchElement.classList.toggle("open");
        }
        if (homeServiceElement) {
            homeServiceElement.scrollIntoView();
        }
    });
}

if (formSearchInputElement) {
    formSearchInputElement.addEventListener("click",(e) => {
        e.preventDefault();
        if (homeServiceElement) {
            homeServiceElement.scrollIntoView();
        }
    });
}

function closeSearchAdvanced() {
    if (advancedSearchElement) {
        advancedSearchElement.classList.toggle("open");
    }
}

//Open Search Mobile 
function openSearchMb() {
    document.querySelector(".header-middle-left").style.display = "none";
    document.querySelector(".header-middle-center").style.display = "block";
    document.querySelector(".header-middle-right-item.close").style.display = "block";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for(let i = 0; i < liItem.length; i++) {
        liItem[i].style.setProperty("display", "none", "important")
    }
}

//Close Search Mobile 
function closeSearchMb() {
    document.querySelector(".header-middle-left").style.display = "block";
    document.querySelector(".header-middle-center").style.display = "none";
    document.querySelector(".header-middle-right-item.close").style.display = "none";
    let liItem = document.querySelectorAll(".header-middle-right-item.open");
    for(let i = 0; i < liItem.length; i++) {
        liItem[i].style.setProperty("display", "block", "important")
    }
}

//Signup && Login Form

// Chuyen doi qua lai SignUp & Login 
let signup = document.querySelector('.signup-link');
let login = document.querySelector('.login-link');
let container = document.querySelector('.signup-login .modal-container');
login.addEventListener('click', () => {
    container.classList.add('active');
})

signup.addEventListener('click', () => {
    container.classList.remove('active');
})

let signupbtn = document.getElementById('signup');
let loginbtn = document.getElementById('login');
let formsg = document.querySelector('.modal.signup-login');
signupbtn.addEventListener('click', () => {
    formsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";
})

loginbtn.addEventListener('click', () => {
    document.querySelector('.form-message-check-login').innerHTML = '';
    formsg.classList.add('open');
    container.classList.add('active');
    body.style.overflow = "hidden";
})

// Dang nhap & Dang ky

// Chức năng đăng ký
let signupButton = document.getElementById('signup-button');
let loginButton = document.getElementById('login-button');
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullNameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;
    // Check validate
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ vâ tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }
    if (phoneUser.length == 0) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phoneUser.length != 10) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone').value = '';
    } else {
        document.querySelector('.form-message-phone').innerHTML = '';
    }
    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }
    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }
    if (checkSignup != true) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng check đăng ký';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }

    if (fullNameUser && phoneUser && passwordUser && passwordConfirmation && checkSignup) {
        if (passwordConfirmation == passwordUser) {
            let user = {
                fullname: fullNameUser,
                phone: phoneUser,
                password: passwordUser,
                address: '',
                email: '',
                status: 1,
                join: new Date(),
                cart: [],
                userType: 0
            }
            let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
            let checkloop = accounts.some(account => {
                return account.phone == user.phone;
            })
            if (!checkloop) {
                accounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentuser', JSON.stringify(user));
                toast({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
                closeModal();
                kiemtradangnhap();
                updateAmount();
            } else {
                toast({ title: 'Thất bại', message: 'Tài khoản đã tồn tại !', type: 'error', duration: 3000 });
            }
        } else {
            toast({ title: 'Thất bại', message: 'Sai mật khẩu !', type: 'error', duration: 3000 });
        }
    }
}
)

// Dang nhap
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let phonelog = document.getElementById('phone-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    if (phonelog.length == 0) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phonelog.length != 10) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone-login').value = '';
    } else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }

    if (phonelog && passlog) {
        let vitri = accounts.findIndex(item => item.phone == phonelog);
        if (vitri == -1) {
            toast({ title: 'Error', message: 'Tài khoản của bạn không tồn tại', type: 'error', duration: 3000 });
        } else if (accounts[vitri].password == passlog) {
            if(accounts[vitri].status == 0) {
                toast({ title: 'Warning', message: 'Tài khoản của bạn đã bị khóa', type: 'warning', duration: 3000 });
            } else {
                localStorage.setItem('currentuser', JSON.stringify(accounts[vitri]));
                toast({ title: 'Success', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
                closeModal();
                kiemtradangnhap();
                checkAdmin();
                updateAmount();
            }
        } else {
            toast({ title: 'Warning', message: 'Sai mật khẩu', type: 'warning', duration: 3000 });
        }
    }
})

// Kiểm tra xem có tài khoản đăng nhập không ?
function kiemtradangnhap() {
    let currentUser = localStorage.getItem('currentuser');
    if (currentUser != null) {
        let user = JSON.parse(currentUser);
        document.querySelector('.auth-container').innerHTML = `<span class="text-dndk">Tài khoản</span>
            <span class="text-tk">${user.fullname} <i class="fa-sharp fa-solid fa-caret-down"></span>`
        document.querySelector('.header-middle-right-menu').innerHTML = `<li><a href="Taikhoan.html" onclick="myAccount()"><i class="fa-light fa-circle-user"></i> Tài khoản của tôi</a></li>
            <li><a href="Chitietdonhang.html" onclick="orderHistory()"><i class="fa-regular fa-bags-shopping"></i> Đơn hàng đã mua</a></li>
            <li class="border"><a id="logout" href="Sanpham.html"><i class="fa-light fa-right-from-bracket"></i> Thoát tài khoản</a></li>`
        document.querySelector('#logout').addEventListener('click',logOut)
    }
}

function logOut() {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    user = JSON.parse(localStorage.getItem('currentuser'));
    let vitri = accounts.findIndex(item => item.phone == user.phone)
    accounts[vitri].cart.length = 0;
    for (let i = 0; i < user.cart.length; i++) {
        accounts[vitri].cart[i] = user.cart[i];
    }
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.removeItem('currentuser');
    window.location = "/";
}

function checkAdmin() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    if(user && user.userType == 1) {
        let node = document.createElement(`li`);
        node.innerHTML = `<a href="./admin.html"><i class="fa-light fa-gear"></i> Quản lý cửa hàng</a>`
        document.querySelector('.header-middle-right-menu').prepend(node);
    } 
}

window.onload = kiemtradangnhap();
window.onload = checkAdmin();

// Chuyển đổi trang chủ và trang thông tin tài khoản
function myAccount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('trangchu').classList.add('hide');
    document.getElementById('order-history').classList.remove('open');
    document.getElementById('account-user').classList.add('open');
    userInfo();
}

// Chuyển đổi trang chủ và trang xem lịch sử đặt hàng 
function orderHistory() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('account-user').classList.remove('open');
    document.getElementById('trangchu').classList.add('hide');
    document.getElementById('order-history').classList.add('open');
    renderOrderProduct();
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function userInfo() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    document.getElementById('infoname').value = user.fullname;
    document.getElementById('infophone').value = user.phone;
    document.getElementById('infoemail').value = user.email;
    document.getElementById('infoaddress').value = user.address;
    if (user.email == undefined) {
        infoemail.value = '';
    }
    if (user.address == undefined) {
        infoaddress.value = '';
    }
}

// Thay doi thong tin
function changeInformation() {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let user = JSON.parse(localStorage.getItem('currentuser'));
    let infoname = document.getElementById('infoname');
    let infoemail = document.getElementById('infoemail');
    let infoaddress = document.getElementById('infoaddress');

    user.fullname = infoname.value;
    if (infoemail.value.length > 0) {
        if (!emailIsValid(infoemail.value)) {
            document.querySelector('.inforemail-error').innerHTML = 'Vui lòng nhập lại email!';
            infoemail.value = '';
        } else {
            user.email = infoemail.value;
        }
    }

    if (infoaddress.value.length > 0) {
        user.address = infoaddress.value;
    }

    let vitri = accounts.findIndex(item => item.phone == user.phone)

    accounts[vitri].fullname = user.fullname;
    accounts[vitri].email = user.email;
    accounts[vitri].address = user.address;
    localStorage.setItem('currentuser', JSON.stringify(user));
    localStorage.setItem('accounts', JSON.stringify(accounts));
    kiemtradangnhap();
    toast({ title: 'Success', message: 'Cập nhật thông tin thành công !', type: 'success', duration: 3000 });
}

// Đổi mật khẩu 
function changePassword() {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    let passwordCur = document.getElementById('password-cur-info');
    let passwordAfter = document.getElementById('password-after-info');
    let passwordConfirm = document.getElementById('password-comfirm-info');
    let check = true;
    if (passwordCur.value.length == 0) {
        document.querySelector('.password-cur-info-error').innerHTML = 'Vui lòng nhập mật khẩu hiện tại';
        check = false;
    } else {
        document.querySelector('.password-cur-info-error').innerHTML = '';
    }

    if (passwordAfter.value.length == 0) {
        document.querySelector('.password-after-info-error').innerHTML = 'Vui lòn nhập mật khẩu mới';
        check = false;
    } else {
        document.querySelector('.password-after-info-error').innerHTML = '';
    }

    if (passwordConfirm.value.length == 0) {
        document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng nhập mật khẩu xác nhận';
        check = false;
    } else {
        document.querySelector('.password-after-comfirm-error').innerHTML = '';
    }

    if (check == true) {
        if (passwordCur.value.length > 0) {
            if (passwordCur.value == currentUser.password) {
                document.querySelector('.password-cur-info-error').innerHTML = '';
                if (passwordAfter.value.length > 0) {
                    if (passwordAfter.value.length < 6) {
                        document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới có số  kí tự lớn hơn bằng 6';
                    } else {
                        document.querySelector('.password-after-info-error').innerHTML = '';
                        if (passwordConfirm.value.length > 0) {
                            if (passwordConfirm.value == passwordAfter.value) {
                                document.querySelector('.password-after-comfirm-error').innerHTML = '';
                                currentUser.password = passwordAfter.value;
                                localStorage.setItem('currentuser', JSON.stringify(currentUser));
                                let userChange = JSON.parse(localStorage.getItem('currentuser'));
                                let accounts = JSON.parse(localStorage.getItem('accounts'));
                                let accountChange = accounts.find(acc => {
                                    return acc.phone = userChange.phone;
                                })
                                accountChange.password = userChange.password;
                                localStorage.setItem('accounts', JSON.stringify(accounts));
                                toast({ title: 'Success', message: 'Đổi mật khẩu thành công !', type: 'success', duration: 3000 });
                            } else {
                                document.querySelector('.password-after-comfirm-error').innerHTML = 'Mật khẩu bạn nhập không trùng khớp';
                            }
                        } else {
                            document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng xác nhận mật khẩu';
                        }
                    }
                } else {
                    document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới';
                }
            } else {
                document.querySelector('.password-cur-info-error').innerHTML = 'Bạn đã nhập sai mật khẩu hiện tại';
            }
        }
    }
}

function getProductInfo(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(item => {
        return item.id == id;
    })
}

// Quan ly don hang
function renderOrderProduct() {
    let currentUser = JSON.parse(localStorage.getItem('currentuser'));
    let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
    let orderHtml = "";
    let arrDonHang = [];
    for (let i = 0; i < order.length; i++) {
        if (order[i].khachhang === currentUser.phone) {
            arrDonHang.push(order[i]);
        }
    }
    if (arrDonHang.length == 0) {
        orderHtml = `<div class="empty-order-section"><img src="../images/empty-order.jpg" alt="" class="empty-order-img"><p>Chưa có đơn hàng nào</p></div>`;
    } else {
        arrDonHang.forEach(item => {
            let productHtml = `<div class="order-history-group">`;
            let chiTietDon = getOrderDetails(item.id);
            chiTietDon.forEach(sp => {
                let infosp = getProductInfo(sp.id);
                productHtml += `<div class="order-history">
                    <div class="order-history-left">
                        <img src="${infosp.img}" alt="">
                        <div class="order-history-info">
                            <h4>${infosp.title}!</h4>
                            <p class="order-history-note"><i class="fa-light fa-pen"></i> ${sp.note}</p>
                            <p class="order-history-quantity">x${sp.soluong}</p>
                        </div>
                    </div>
                    <div class="order-history-right">
                        <div class="order-history-price">
                            <span class="order-history-current-price">${vnd(sp.price)}</span>
                        </div>                         
                    </div>
                </div>`;
            });
            let textCompl = item.trangthai == 1 ? "Đã xử lý" : "Đang xử lý";
            let classCompl = item.trangthai == 1 ? "complete" : "no-complete"
            productHtml += `<div class="order-history-control">
                <div class="order-history-status">
                    <span class="order-history-status-sp ${classCompl}">${textCompl}</span>
                    <button id="order-history-detail" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-eye"></i> Xem chi tiết</button>
                </div>
                <div class="order-history-total">
                    <span class="order-history-total-desc">Tổng tiền: </span>
                    <span class="order-history-toltal-price">${vnd(item.tongtien)}</span>
                </div>
            </div>`
            productHtml += `</div>`;
            orderHtml += productHtml;
        });
    }
    document.querySelector(".order-history-section").innerHTML = orderHtml;
}

// Get Order Details
function getOrderDetails(madon) {
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
    let ctDon = [];
    orderDetails.forEach(item => {
        if(item.madon == madon) {
            ctDon.push(item);
        }
    });
    return ctDon;
}

// Format Date
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}

// Xem chi tiet don hang
function detailOrder(id) {
    let order = JSON.parse(localStorage.getItem("order"));
    let detail = order.find(item => {
        return item.id == id;
    })
    document.querySelector(".modal.detail-order").classList.add("open");
    let detailOrderHtml = `<ul class="detail-order-group">
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
            <span class="detail-order-item-right">${formatDate(detail.thoigiandat)}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-truck"></i> Hình thức giao</span>
            <span class="detail-order-item-right">${detail.hinhthucgiao}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-clock"></i> Ngày nhận hàng</span>
            <span class="detail-order-item-right">${(detail.thoigiangiao == "" ? "" : (detail.thoigiangiao + " - ")) + formatDate(detail.ngaygiaohang)}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-location-dot"></i> Địa điểm nhận</span>
            <span class="detail-order-item-right">${detail.diachinhan}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
            <span class="detail-order-item-right">${detail.tenguoinhan}</span>
        </li>
        <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="fa-light fa-phone"></i> Số điện thoại nhận</span>
            <span class="detail-order-item-right">${detail.sdtnhan}</span>
        </li>
    </ul>`
    document.querySelector(".detail-order-content").innerHTML = detailOrderHtml;
}

// Create id order 
function createId(arr) {
    let id = arr.length + 1;
    let check = arr.find(item => item.id == "DH" + id)
    while (check != null) {
        id++;
        check = arr.find(item => item.id == "DH" + id)
    }
    return "DH" + id;
}

// Back to top
window.onscroll = () => {
    let backtopTop = document.querySelector(".back-to-top")
    if (document.documentElement.scrollTop > 100) {
        backtopTop.classList.add("active");
    } else {
        backtopTop.classList.remove("active");
    }
}

// Auto hide header on scroll
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (headerNav) {
        if(lastScrollY < window.scrollY) {
            headerNav.classList.add("hide")
        } else {
            headerNav.classList.remove("hide")
        }
    }
    lastScrollY = window.scrollY;
});

// Page
function renderProducts(showProduct) {
    let productHtml = '';
    const homeTitle = document.getElementById('home-title');
    const homeProducts = document.getElementById('home-products');

    if(showProduct.length == 0) {
        if (homeTitle) {
            homeTitle.style.display = 'none';
        }
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div></div>`;
    } else {
        if (homeTitle) {
            homeTitle.style.display = 'block';
        }
        showProduct.forEach((product) => {
            productHtml += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a href="Chitietsanpham.html?id=${product.id}" class="card-image-link">
                    <img class="card-image" src="${product.img}" alt="${product.title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="Chitietsanpham.html?id=${product.id}" class="card-title-link">${product.title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(product.price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="window.location.href='Chitietsanpham.html?id=${product.id}'" class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt hàng</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        });
    }
    if (homeProducts) {
        homeProducts.innerHTML = productHtml;
    }
}

// Find Product
function searchProducts(mode) {
    const searchInput = document.querySelector('.form-search-input');
    const categorySelect = document.getElementById('advanced-search-category-select');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const homeService = document.getElementById('home-service');

    if (!searchInput || !categorySelect || !minPriceInput || !maxPriceInput) {
        return;
    }

    let valeSearchInput = searchInput.value;
    let valueCategory = categorySelect.value;
    let minPrice = minPriceInput.value;
    let maxPrice = maxPriceInput.value;
    if(parseInt(minPrice) > parseInt(maxPrice) && minPrice != "" && maxPrice != "") {
        alert("Giá đã nhập sai !");
    }

    let result = valueCategory == "Tất cả" ? productAll : productAll.filter((item) => {
        return item.category == valueCategory;
    });

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    });

    if(minPrice == "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice);
    } else if (minPrice != "" && maxPrice == "") {
        result = result.filter((item) => item.price >= minPrice);
    } else if(minPrice != "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice && item.price >= minPrice);
    }

    if (homeService) {
        homeService.scrollIntoView();
    }
    switch (mode){
        case 0:
            result = JSON.parse(localStorage.getItem('products'));
            searchInput.value = "";
            categorySelect.value = "Tất cả";
            minPriceInput.value = "";
            maxPriceInput.value = "";
            break;
        case 1:
            result.sort((a,b) => a.price - b.price);
            break;
        case 2:
            result.sort((a,b) => b.price - a.price);
            break;
    }
    showHomeProduct(result)
}

// Phân trang 
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    const homeProducts = document.getElementById('home-products');
    if (!homeProducts) return;

    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

function showHomeProduct(products) {
    let productAllFiltered = products.filter(item => item.status == 1);
    displayList(productAllFiltered, perPage, currentPage);
    setupPagination(productAllFiltered, perPage, currentPage);
}



function setupPagination(productAll, perPage) {
    const pageNavList = document.querySelector('.page-nav-list');
    if (!pageNavList) return;

    pageNavList.innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        pageNavList.appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:;">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
        document.getElementById("home-service").scrollIntoView();
    })
    return node;
}

// Hiển thị chuyên mục
function showCategory(category) {
    document.getElementById('trangchu').classList.remove('hide');
    document.getElementById('account-user').classList.remove('open');
    document.getElementById('order-history').classList.remove('open');
    let productSearch = productAll.filter(value => {
        return value.category.toString().toUpperCase().includes(category.toUpperCase());
    })
    let currentPageSeach = 1;
    displayList(productSearch, perPage, currentPageSeach);
    setupPagination(productSearch, perPage, currentPageSeach);
    document.getElementById("home-title").scrollIntoView();
}
window.onload = function() {
    if (productAll.length > 0) {
        displayList(productAll, perPage, currentPage);
        setupPagination(productAll, perPage, currentPage);
    } else {
        console.warn("Chưa có sản phẩm nào trong localStorage!");
    }
};

// ============ PRODUCT REVIEWS SYSTEM ============

class ProductReviewSystem {
    constructor(productId) {
        this.productId = productId;
        this.reviews = [];
        this.selectedRating = 0;
        this.init();
    }

    init() {
        this.loadReviews();
        this.attachEventListeners();
        this.renderReviews();
    }

    // ========== LOAD REVIEWS FROM LOCALSTORAGE ==========
    loadReviews() {
        const storageKey = `reviews_${this.productId}`;
        const stored = localStorage.getItem(storageKey);
        this.reviews = stored ? JSON.parse(stored) : [];
    }

    // ========== SAVE REVIEWS TO LOCALSTORAGE ==========
    saveReviews() {
        const storageKey = `reviews_${this.productId}`;
        localStorage.setItem(storageKey, JSON.stringify(this.reviews));
    }

    // ========== ATTACH EVENT LISTENERS ==========
    attachEventListeners() {
        // Star rating selector
        const starBtns = document.querySelectorAll('.star-btn');
        starBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectedRating = parseInt(btn.dataset.rating);
                this.updateStarDisplay();
            });

            btn.addEventListener('mouseover', (e) => {
                const rating = parseInt(btn.dataset.rating);
                starBtns.forEach((b, idx) => {
                    if (idx < rating) {
                        b.classList.add('hover');
                    } else {
                        b.classList.remove('hover');
                    }
                });
            });
        });

        // Mouse out to restore selection
        document.getElementById('ratingSelector').addEventListener('mouseout', () => {
            this.updateStarDisplay();
        });

        // Character counter
        const textarea = document.getElementById('reviewContent');
        if (textarea) {
            textarea.addEventListener('input', (e) => {
                document.getElementById('charCount').textContent = e.target.value.length;
            });
        }

        // Form submission
        const form = document.getElementById('reviewForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }
    }

    // ========== UPDATE STAR DISPLAY ==========
    updateStarDisplay() {
        const starBtns = document.querySelectorAll('.star-btn');
        starBtns.forEach((btn, idx) => {
            if (idx < this.selectedRating) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });

        const ratingText = document.getElementById('selectedRating');
        if (this.selectedRating > 0) {
            const ratings = ['Tệ', 'Không tốt', 'Bình thường', 'Tốt', 'Rất tốt'];
            ratingText.textContent = `${this.selectedRating} sao - ${ratings[this.selectedRating - 1]}`;
        } else {
            ratingText.textContent = 'Chọn xếp hạng';
        }
    }

    // ========== VALIDATE FORM ==========
    validateForm() {
        let isValid = true;
        
        // Clear errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

        const name = document.getElementById('reviewerName').value.trim();
        const content = document.getElementById('reviewContent').value.trim();

        if (!name) {
            document.getElementById('nameError').textContent = 'Vui lòng nhập tên của bạn';
            isValid = false;
        }

        if (this.selectedRating === 0) {
            document.getElementById('ratingError').textContent = 'Vui lòng chọn xếp hạng';
            isValid = false;
        }

        if (!content || content.length < 10) {
            document.getElementById('contentError').textContent = 'Vui lòng nhập ít nhất 10 ký tự';
            isValid = false;
        }

        return isValid;
    }

    // ========== SUBMIT REVIEW ==========
    submitReview() {
        if (!this.validateForm()) {
            return;
        }

        const review = {
            id: Date.now(),
            name: document.getElementById('reviewerName').value.trim(),
            rating: this.selectedRating,
            content: document.getElementById('reviewContent').value.trim(),
            date: new Date().toLocaleDateString('vi-VN'),
            likes: 0
        };

        this.reviews.unshift(review);
        this.saveReviews();

        // Reset form
        document.getElementById('reviewForm').reset();
        document.getElementById('charCount').textContent = '0';
        this.selectedRating = 0;
        this.updateStarDisplay();

        // Re-render
        this.renderReviews();

        // ==========================================
        // CẬP NHẬT REAL-TIME THỐNG KÊ LÊN BÊN TRÊN
        // ==========================================
        if (typeof renderProductDetail === 'function' && typeof currentProduct !== 'undefined') {
            renderProductDetail(currentProduct);
        }

        showEnhancedToast('Cảm ơn bạn đã để lại đánh giá!', 'success');

        // Scroll to reviews
        document.querySelector('.reviews-list-wrapper').scrollIntoView({ behavior: 'smooth' });
    }

    // ========== RENDER REVIEWS ==========
    renderReviews() {
        const reviewsList = document.getElementById('reviewsList');
        const noReviews = document.getElementById('noReviews');

        if (this.reviews.length === 0) {
            reviewsList.innerHTML = '';
            noReviews.style.display = 'flex';
            return;
        }

        noReviews.style.display = 'none';

        reviewsList.innerHTML = this.reviews.map(review => `
            <div class="review-item" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="review-author">
                        <div class="author-avatar">
                            ${review.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="author-info">
                            <div class="author-name">${this.escapeHtml(review.name)}</div>
                            <div class="review-date">${review.date}</div>
                        </div>
                    </div>
                    <button class="btn-delete-review" onclick="reviewSystem.deleteReview(${review.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <div class="review-rating">
                    ${this.generateStars(review.rating)}
                </div>

                <div class="review-content">
                    ${this.escapeHtml(review.content)}
                </div>

                <div class="review-footer">
                    <button class="btn-like-review" onclick="reviewSystem.likeReview(${review.id})">
                        <i class="fas fa-thumbs-up"></i>
                        <span class="like-count">${review.likes}</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // ========== DELETE REVIEW ==========
    deleteReview(reviewId) {
        if (confirm('Bạn chắc chắn muốn xóa đánh giá này?')) {
            this.reviews = this.reviews.filter(r => r.id !== reviewId);
            this.saveReviews();
            this.renderReviews();
            showEnhancedToast('Đánh giá đã được xóa', 'success');
        }
    }

    // ========== LIKE REVIEW ==========
    likeReview(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            review.likes = (review.likes || 0) + 1;
            this.saveReviews();
            this.renderReviews();
        }
    }

    // ========== GENERATE STARS HTML ==========
    generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star" style="color: #ffc107;"></i>';
            } else {
                stars += '<i class="far fa-star" style="color: #ddd;"></i>';
            }
        }
        return stars;
    }

    // ========== ESCAPE HTML (PREVENT XSS) ==========
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize review system when page loads
let reviewSystem;
document.addEventListener('DOMContentLoaded', function() {
    // Get productId from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    
    if (productId) {
        reviewSystem = new ProductReviewSystem(productId);
    }
});