document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const mobileInput = document.getElementById('mobileSearchInput');
    const drop = document.getElementById('searchDropdown');
    const boxSP = document.getElementById('boxSP');

    let dataSP = [];
    
    const listSP = (typeof products !== 'undefined' && products.length > 0) 
                   ? products 
                   : (JSON.parse(localStorage.getItem('products')) || []);

    if (listSP.length > 0) {
        dataSP = listSP.map(p => {
            let giaMoi = p.price - (p.price * p.discount / 100);
            return {
                id: p.id,
                ten: p.title,
                link: "Chitietsanpham.html?id=" + p.id,
                img: p.img,
                gia: giaMoi.toLocaleString('vi-VN') + "đ",
                cu: p.price.toLocaleString('vi-VN') + "đ",
                sale: "-" + p.discount + "%"
            };
        });
    }

    const dataTH = [
        { ten: "LANEIGE", link: "thuong-hieu.html?brand=laneige" },
        { ten: "CERAVE", link: "thuong-hieu.html?brand=cerave" },
        { ten: "MAYBELLINE", link: "thuong-hieu.html?brand=maybelline" }
    ];

    // Hàm xử lý search - dùng chung cho cả desktop và mobile
    function handleSearch(searchValue) {
        const val = searchValue.trim().toLowerCase();
        if (!val) return;

        const locSP = dataSP.filter(sp => sp.ten.toLowerCase().includes(val));
        
        if (locSP.length > 0) {
            // Chuyển đến trang sản phẩm đầu tiên
            window.location.href = locSP[0].link;
        } else {
            alert('Không tìm thấy sản phẩm!');
        }
    }

    // 2. XỬ LÝ GÕ PHÍM - DESKTOP
    if (input) {
        input.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (!val) return drop.style.display = 'none';

            const locSP = dataSP.filter(sp => sp.ten.toLowerCase().includes(val));
            const locTH = dataTH.filter(th => th.ten.toLowerCase().includes(val));

            if (!locSP.length && !locTH.length) return drop.style.display = 'none';
            
            drop.style.display = 'block';

            if (boxSP) {
                boxSP.style.display = locSP.length ? 'block' : 'none';
            }
            
            // VẼ HTML TỪ KHÓA GỢI Ý
            if (document.getElementById('listTuKhoa')) {
                document.getElementById('listTuKhoa').innerHTML = locSP.slice(0, 5).map(sp => 
                    `<li>
                        <a href="${sp.link}" style="display:block; width:100%; color:#333; text-decoration:none;">
                            ${sp.ten}
                        </a>
                    </li>`
                ).join('');
            }
            
            // VẼ HTML SẢN PHẨM LIÊN QUAN
            if (document.getElementById('listSanPham')) {
                document.getElementById('listSanPham').innerHTML = locSP.slice(0, 5).map(sp => `
                    <a href="${sp.link}" class="search-product-item">
                        <img src="${sp.img}" alt="${sp.ten}">
                        <div class="search-sp-info">
                            <div class="search-sp-name">${sp.ten}</div>
                            <div>
                                <span class="search-price-new">${sp.gia}</span>
                                <span class="search-price-old">${sp.cu}</span>
                                <span class="search-discount">${sp.sale}</span>
                            </div>
                        </div>
                    </a>`).join('');
            }
        });

        // 3. XỬ LÝ ENTER - DESKTOP
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = input.value.trim().toLowerCase();
                if(!val) return alert('Vui lòng nhập từ khóa!');
                handleSearch(val);
            }
        });
    }

    // 4. XỬ LÝ MOBILE SEARCH
    if (mobileInput) {
        mobileInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = mobileInput.value.trim();
                if(!val) return alert('Vui lòng nhập từ khóa!');
                handleSearch(val);
            }
        });
    }

    // 5. CLICK RA NGOÀI TỰ ẨN
    if (input) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) drop.style.display = 'none';
        });
    }
});
