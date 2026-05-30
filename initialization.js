var products = []; 

window.products = [
/* ===== 1–15: CHĂM SÓC DA MẶT ===== */
{id:1,title:"Mặt nạ dưỡng ẩm Caryophy",category:"Chăm sóc da mặt",img:"../images/cảyophy.jpg",price:300000,discount:50,rating:4.9,sold:3200,description:"Mặt nạ dưỡng ẩm Caryophy giúp cung cấp độ ẩm chuyên sâu, hỗ trợ cải thiện làn da khô ráp và thiếu nước. Thành phần dịu nhẹ giúp làm dịu da, giảm kích ứng và mang lại cảm giác thư giãn sau khi sử dụng. Sản phẩm phù hợp cho nhiều loại da, đặc biệt là da nhạy cảm. Sử dụng thường xuyên giúp da mềm mịn, căng bóng và tươi tắn hơn mỗi ngày."},
{id:2,title:"Serum The Ordinary",category:"Chăm sóc da mặt",img:"../images/sp2.png",price:250000,discount:50,rating:4.8,sold:2800,description:"Serum The Ordinary nổi bật với khả năng hỗ trợ giảm mụn và kiểm soát bã nhờn hiệu quả. Công thức giúp làm sạch lỗ chân lông, hạn chế tình trạng bít tắc gây mụn. Đồng thời, sản phẩm còn hỗ trợ cải thiện kết cấu da, giúp da trở nên mịn màng và đều màu hơn. Phù hợp với làn da dầu, da mụn hoặc da hỗn hợp thiên dầu."},
{id:3,title:"Mask ngủ Laneige",category:"Chăm sóc da mặt",img:"../images/sp3.png",price:450000,discount:50,rating:4.9,sold:1500,description:"Mặt nạ ngủ Laneige cung cấp độ ẩm sâu suốt đêm, giúp phục hồi làn da thiếu nước và mệt mỏi. Kết cấu gel nhẹ giúp thẩm thấu nhanh, không gây bết dính hay khó chịu khi ngủ. Sản phẩm giúp da trở nên căng mọng, mềm mịn ngay sau khi thức dậy. Phù hợp với những ai thường xuyên thức khuya hoặc da bị khô do môi trường."},
{id:4,title:"Sữa rửa mặt Cetaphil",category:"Chăm sóc da mặt",img:"../images/sp4.png",price:200000,discount:50,rating:4.8,sold:4100,description:"Sữa rửa mặt Cetaphil giúp làm sạch nhẹ nhàng bụi bẩn, dầu thừa và tạp chất trên da mà không làm mất đi độ ẩm tự nhiên. Công thức dịu nhẹ, không gây kích ứng, phù hợp với cả làn da nhạy cảm. Sản phẩm giúp duy trì hàng rào bảo vệ da khỏe mạnh. Sử dụng hàng ngày giúp da sạch thoáng, mềm mại và dễ chịu."},
{id:5,title:"Tẩy trang Bioderma",category:"Chăm sóc da mặt",img:"../images/sp5.png",price:300000,discount:12,rating:4.9,sold:3600,description:"Nước tẩy trang Bioderma giúp làm sạch sâu lớp trang điểm, bụi bẩn và bã nhờn trên da một cách hiệu quả. Công nghệ micellar tiên tiến giúp cuốn trôi tạp chất mà không gây khô hay kích ứng da. Sản phẩm phù hợp với mọi loại da, kể cả da nhạy cảm. Sau khi sử dụng, da vẫn giữ được độ ẩm tự nhiên và cảm giác mềm mịn."},
{id:6,title:"Kem dưỡng La Roche",category:"Chăm sóc da mặt",img:"../images/sp6.png",price:400000,discount:18,rating:4.9,sold:2100,description:"Kem dưỡng La Roche giúp phục hồi và củng cố hàng rào bảo vệ da, đặc biệt phù hợp với da nhạy cảm hoặc da đang bị tổn thương. Kết cấu kem mịn, dễ thẩm thấu, không gây bít tắc lỗ chân lông. Sản phẩm hỗ trợ làm dịu da, giảm kích ứng và mang lại làn da khỏe mạnh. Sử dụng đều đặn giúp da mềm mại và đàn hồi hơn."},
{id:7,title:"BHA Paula Choice",category:"Chăm sóc da mặt",img:"../images/sp7.png",price:800000,discount:25,rating:4.9,sold:1700,description:"Sản phẩm BHA Paula’s Choice giúp tẩy tế bào chết hóa học, làm sạch sâu lỗ chân lông và hỗ trợ giảm mụn hiệu quả. Thành phần BHA giúp kiểm soát dầu thừa, ngăn ngừa bít tắc và cải thiện bề mặt da. Phù hợp với da dầu, da mụn hoặc da có lỗ chân lông to. Sử dụng lâu dài giúp da mịn màng, sáng khỏe hơn."},
{id:8,title:"Phấn Innisfree",category:"Chăm sóc da mặt",img:"../images/sp8.png",price:150000,discount:10,rating:4.7,sold:5000,description:"Phấn phủ Innisfree giúp kiểm soát dầu hiệu quả, mang lại lớp nền khô ráo và mịn màng suốt nhiều giờ. Kết cấu nhẹ, không gây bí da, phù hợp sử dụng hàng ngày. Sản phẩm giúp giữ lớp trang điểm lâu trôi và hạn chế bóng nhờn. Thích hợp cho da dầu hoặc da hỗn hợp trong điều kiện thời tiết nóng ẩm."},
{id:9,title:"Mặt Nạ Microfiber Mãng Cầu Làm Dịu Da",category:"Chăm sóc da mặt",img:"../images/emmiemn.jpg",price:649000,discount:8,rating:4.8,sold:2900,description:"Mặt nạ microfiber với chiết xuất mãng cầu giúp cấp ẩm và làm dịu da hiệu quả. Chất liệu ôm sát khuôn mặt giúp dưỡng chất thẩm thấu tốt hơn vào da. Sản phẩm hỗ trợ giảm kích ứng, mang lại cảm giác mát dịu và thư giãn. Phù hợp với làn da khô, nhạy cảm hoặc da cần phục hồi."},
{id:10,title:"Nước Tẩy Trang Micellar Làm Sạch Sâu 400ml",category:"Chăm sóc da mặt",img:"../images/SP2.1.jpg",price:250000,discount:30,rating:4.5,sold:850,description:"Nước tẩy trang Micellar giúp làm sạch sâu bụi bẩn, dầu thừa và lớp trang điểm mà không gây khô da. Công nghệ micellar giúp loại bỏ tạp chất một cách nhẹ nhàng, không cần rửa lại với nước. Sản phẩm phù hợp cho mọi loại da, kể cả da nhạy cảm. Sau khi sử dụng, da sạch thoáng và vẫn giữ được độ ẩm tự nhiên."},

    {
        id: 113,
        title: "Mặt Nạ Giấy Dưỡng Ẩm Chiết Xuất Tràm Trà",
        category: "Chăm sóc da mặt",
        img: "../images/SP3.jpg",
        price: 30000,
        discount: 50,
        rating: 4.2,
        sold: 3000,
        description: "Mặt nạ giấy chiết xuất tràm trà giúp làm dịu da và hỗ trợ giảm mụn hiệu quả. Thành phần tự nhiên giúp kháng khuẩn, giảm viêm và hạn chế tình trạng kích ứng. Sản phẩm cung cấp độ ẩm cần thiết, giúp da mềm mịn hơn sau khi sử dụng. Phù hợp với da mụn và da nhạy cảm."
    },
    {
        id: 114,
        title: "Kem Chống Nắng SPF50+ Bảo Vệ Da Toàn Diện",
        category: "Chăm sóc da mặt",
        img: "../images/SP4.JPG",
        price: 320000,
        discount: 15,
        rating: 4.8,
        sold: 1500,
        description: "Kem chống nắng SPF50+ giúp bảo vệ da toàn diện trước tác hại của tia UVA và UVB. Công thức nhẹ, không gây bết dính, phù hợp sử dụng hàng ngày. Sản phẩm giúp ngăn ngừa lão hóa sớm và sạm da do ánh nắng. Thích hợp cho mọi loại da, đặc biệt khi hoạt động ngoài trời."
    },
    {
        id: 102,
        title: "Kem Chống Nắng Kiểm Soát Nhờn Anthelios XL",
        category: "Chăm sóc da mặt",
        img: "../images/uu dai 2.jpg",
        price: 999000,
        discount: 20,
        rating: 4.6,
        sold: 2100,
        description: "Kem chống nắng Anthelios XL nổi bật với khả năng kiểm soát dầu và chống nắng hiệu quả. Công thức giúp giảm bóng nhờn, mang lại cảm giác khô thoáng khi sử dụng. Sản phẩm phù hợp cho da dầu và da hỗn hợp. Giúp bảo vệ da khỏi tác hại của tia UV và môi trường."
    },
    {
        id: 103,
        title: "Kem Dưỡng Ẩm Vitamin C Dry Touch Cream",
        category: "Chăm sóc da mặt",
        img: "../images/uu dai 3.jpg",
        price: 259000,
        discount: 25,
        rating: 4.0,
        sold: 320,
        description: "Kem dưỡng chứa Vitamin C giúp làm sáng da và cải thiện tình trạng da xỉn màu. Đồng thời cung cấp độ ẩm giúp da luôn mềm mại và căng mịn. Sản phẩm hỗ trợ chống oxy hóa, giúp da khỏe mạnh hơn. Phù hợp với làn da cần phục hồi và làm đều màu."
    },
    {
        id: 131,
        title: "Mặt Nạ Dưỡng Sáng Da Colorkey Luminous Facial Mask",
        category: "Chăm sóc da mặt",
        img: "../images/banchay.jpg",
        price: 15000,
        discount: 33,
        rating: 4.0,
        sold: 150000,
        description: "Mặt nạ Colorkey giúp dưỡng sáng da, mang lại làn da rạng rỡ và đều màu hơn. Thành phần dưỡng chất giúp cải thiện độ ẩm và độ đàn hồi của da. Sản phẩm phù hợp sử dụng thường xuyên để chăm sóc da. Sau khi sử dụng, da trở nên mềm mịn và tươi sáng hơn."
    },
    {id: 132,title: "Mặt Nạ Dưỡng Da Mediheal Essential Mask 24ml", category: "Chăm sóc da mặt",img: "../images/banchay 2.1.jpg",price: 35000,discount: 35,rating: 4.3,sold: 26000,description: "Mặt nạ Mediheal cung cấp dưỡng chất thiết yếu giúp phục hồi và nuôi dưỡng làn da. Công thức giàu dưỡng chất giúp cải thiện độ ẩm và độ đàn hồi. Sản phẩm phù hợp với nhiều loại da, đặc biệt là da khô hoặc da cần phục hồi. Sử dụng thường xuyên giúp da khỏe mạnh hơn."},
    {id: 133,title: "Mặt Nạ Tái Tạo Da Wonjin Mask", category: "Chăm sóc da mặt",img: "../images/wonjin.jpg",price: 15000,discount: 34,rating: 3.2,sold: 18000,description: "Mặt nạ giúp cung cấp độ ẩm sâu, mang lại làn da mềm mại và tươi tắn hơn. Thành phần tự nhiên giúp làm dịu da và cải thiện kết cấu da. Sản phẩm phù hợp với nhiều loại da, đặc biệt là da khô hoặc da cần cấp ẩm. Sử dụng thường xuyên giúp da khỏe mạnh và rạng rỡ hơn."},
    {id: 134,title: "Mặt Nạ Cấp Ẩm Toriden", category: "Chăm sóc da mặt",img: "../images/tori.jpg",price: 55000,discount: 19,rating: 4.5,sold: 35000,description: "Mặt nạ Innisfree giúp cung cấp độ ẩm sâu, mang lại làn da mềm mại và tươi tắn hơn. Thành phần tự nhiên giúp làm dịu da và cải thiện kết cấu da. Sản phẩm phù hợp với nhiều loại da, đặc biệt là da khô hoặc da cần cấp ẩm. Sử dụng thường xuyên giúp da khỏe mạnh và rạng rỡ hơn."},
    {id: 135,title: "Mặt Nạ Banobagi Jelly Mask", category: "Chăm sóc da mặt",img: "../images/bano.jpg",price: 25000,discount: 28,rating: 4.9,sold: 1500,description: "Mặt nạ Banobagi Jelly Mask giúp bổ sung vitamin và dưỡng chất cho làn da căng mọng. Kết cấu dạng jelly giúp tăng khả năng giữ ẩm và thẩm thấu dưỡng chất. Sản phẩm giúp da trở nên mềm mịn và tươi tắn hơn. Phù hợp cho da khô, da thiếu sức sống."},
    {id: 136,title: "Mặt Nạ Rau Má Luvum", category: "Chăm sóc da mặt",img: "../images/luvum.jpg",price: 95000,discount: 32,rating: 4.9,sold: 1500,description: "Mặt nạ  giúp bổ sung vitamin và dưỡng chất cho làn da căng mọng. Kết cấu dạng jelly giúp tăng khả năng giữ ẩm và thẩm thấu dưỡng chất. Sản phẩm giúp da trở nên mềm mịn và tươi tắn hơn. Phù hợp cho da khô, da thiếu sức sống."},

/* ===== 16–30: TRANG ĐIỂM ===== */
{id:16,title:"Kem nền Maybelline",category:"Trang điểm",img:"../images/sp16.png",price:220000,discount:15,rating:4.8,sold:4200,hasGift: true,description:"Kem nền Maybelline mang lại độ che phủ tốt, giúp che khuyết điểm hiệu quả và làm đều màu da. Kết cấu mỏng nhẹ, dễ tán, không gây nặng mặt khi sử dụng cả ngày. Sản phẩm giúp lớp nền mịn màng, tự nhiên và lâu trôi. Phù hợp với nhiều loại da, đặc biệt là da hỗn hợp và da dầu."},
{id:17,title:"Son Black Rouge",category:"Trang điểm",img:"../images/sp17.png",price:150000,discount:70,rating:4.8,sold:5100, hasGift: true,description:"Son Black Rouge nổi bật với chất son lì mịn, lên màu chuẩn và bám màu lâu. Thiết kế nhỏ gọn, dễ mang theo khi di chuyển. Sản phẩm giúp đôi môi trở nên quyến rũ, nổi bật suốt cả ngày. Phù hợp với nhiều phong cách trang điểm từ nhẹ nhàng đến cá tính."},
{id:18,title:"Son Romand",category:"Trang điểm",img:"../images/sp18.png",price:170000,discount:12,rating:4.9,sold:4800,hasGift: true,description:"Son Romand với chất tint bóng giúp đôi môi căng mọng và tự nhiên. Màu son tươi tắn, dễ sử dụng trong nhiều hoàn cảnh khác nhau. Kết cấu nhẹ, không gây bết dính hay nặng môi. Phù hợp với phong cách trang điểm trong trẻo, tự nhiên."},
{id:19,title:"Cushion Clio",category:"Trang điểm",img:"../images/sp19.png",price:450000,discount:20,rating:4.9,sold:2200,description:"Cushion Clio mang lại lớp nền mịn màng, che phủ tốt nhưng vẫn giữ được độ tự nhiên. Sản phẩm giúp da trông sáng khỏe và đều màu hơn. Kết cấu mỏng nhẹ, dễ tán và phù hợp sử dụng hàng ngày. Thích hợp cho da thường đến da hỗn hợp"},
{id:23,title:"Son 3CE",category:"Trang điểm",img:"../images/sp23.png",price:300000,discount:15,rating:4.9,sold:2000,hasGift: true,description:"Son 3CE mang đến trải nghiệm cao cấp với chất son mịn, lên màu chuẩn và bám lâu. Thiết kế sang trọng, tinh tế, phù hợp làm quà tặng. Sản phẩm giúp đôi môi nổi bật và cuốn hút. Phù hợp với nhiều tone da và phong cách."},
{id:24,title:"Phấn phủ Lemonade",category:"Trang điểm",img:"../images/sp24.png",price:250000,discount:10,rating:4.8,hasGift: true,sold:2700,description:"Phấn phủ Lemonade giúp kiểm soát dầu hiệu quả, giữ lớp nền luôn khô ráo và mịn màng. Kết cấu nhẹ, không gây bí da. Sản phẩm giúp lớp makeup bền màu lâu hơn. Phù hợp với da dầu và da hỗn hợp"},
{id:25,title:"Highlight JUDYDOLL",category:"Trang điểm",img:"../images/sp25.png",price:280000,discount:12,rating:4.8,sold:1900,hasGift: true,description:"Highlight JUDYDOLL giúp bắt sáng tốt, tạo hiệu ứng làn da căng bóng tự nhiên. Hạt phấn mịn, dễ tán, không bị lộ vân. Sản phẩm giúp gương mặt thêm sắc nét và nổi bật. Phù hợp cho makeup hàng ngày hoặc dự tiệc."},
{id:26,title:"Phấn mắt Romand",category:"Trang điểm",img:"../images/sp26.png",price:300000,discount:15,rating:4.8,sold:2100,hasGift: true,description:"Phấn mắt Romand có bảng màu đa dạng, dễ phối và phù hợp nhiều phong cách. Chất phấn mịn, lên màu chuẩn và bám tốt. Dễ tán, phù hợp cả người mới trang điểm. Giúp đôi mắt trở nên nổi bật và cuốn hút hơn."},
{id:27,title:"Phấn Nước Dasique Water Dewy Gel Cushion SPF 50+ PA++++",category:"Trang điểm",img:"../images/dasique_phan.jpg",price:250000,discount:10,rating:4.7,sold:2300,hasGift: true,description:"Phấn nước Dasique mang lại lớp nền mịn, căng bóng và tự nhiên. Tích hợp SPF50+ giúp bảo vệ da khỏi tác hại của tia UV. Kết cấu nhẹ, không gây nặng mặt. Phù hợp với da khô và da thường."},
{id:28,title:"Xịt khóa makeup CARSLAN",category:"Trang điểm",img:"../images/sp28.png",price:300000,discount:12,rating:4.8,sold:1800,description:"Xịt khóa makeup giúp cố định lớp trang điểm lâu trôi, hạn chế xuống tông. Tạo lớp màng bảo vệ nhẹ, giúp lớp nền bền đẹp suốt ngày dài. Kết cấu phun sương mịn, không làm loang makeup. Phù hợp cho mọi loại da."},
{id:29,title:"Kẻ mắt JUDYDOLL",category:"Trang điểm",img:"../images/sp29.png",price:120000,discount:5,rating:4.7,sold:4200,hasGift: true,description:"Kẻ mắt JUDYDOLL có đầu bút mảnh, dễ vẽ và kiểm soát nét. Mực ra đều, không lem và bám lâu. Giúp tạo đường eyeliner sắc nét và tự nhiên. Phù hợp cho cả người mới bắt đầu."},
{id:30,title:"Phấn má 3CE",category:"Trang điểm",img:"../images/sp30.png",price:200000,discount:10,rating:4.8,sold:2600,hasGift: true,description:"Phấn má 3CE mang lại hiệu ứng má hồng tự nhiên, tươi tắn. Chất phấn mịn, dễ tán và không bị bột. Giúp gương mặt rạng rỡ và tràn đầy sức sống. Phù hợp với nhiều tone da."},

{id:31,title:"Dầu gội TRESemmé",category:"Chăm sóc tóc",img:"../images/sp31.png",price:180000,discount:10,rating:4.7,sold:3800,description:"Dầu gội TRESemmé giúp làm sạch tóc và da đầu hiệu quả. Công thức giúp tóc mềm mượt và dễ chải hơn. Phù hợp sử dụng hàng ngày. Mang lại mái tóc sạch khỏe và bồng bềnh."},
{id:33,title:"Dầu xả PANTENE",category:"Chăm sóc tóc",img:"../images/sp33.png",price:180000,discount:80,rating:4.7,sold:2500,description:"Giúp cung cấp dưỡng chất, làm mềm tóc và giảm rối. Hỗ trợ phục hồi tóc hư tổn do hóa chất. Giúp tóc suôn mượt và dễ tạo kiểu. Phù hợp với nhiều loại tóc."},
{id:34,title:"Xịt tạo kiểu",category:"Chăm sóc tóc",img:"../images/sp34.png",price:200000,discount:10,rating:4.7,sold:2000,description:"Giữ nếp tóc suốt ngày dài. Phù hợp với nhiều kiểu tóc. Không"},

{id:35,title:"Lotion Vaseline",category:"Chăm sóc cơ thể",img:"../images/sp35.png",price:150000,discount:50,rating:4.8,sold:4200,description:"Dưỡng trắng da. Phù hợp sử dụng hàng ngày. Giúp da mềm mại và trắng sáng hơn."},
{id:36,title:"Sữa tắm Dove",category:"Chăm sóc cơ thể",img:"../images/sp36.png",price:180000,discount:50,rating:4.8,sold:3900,description:"Mùi thơm dễ chịu. Phù hợp sử dụng hàng ngày. Giúp da mềm mại và thơm mát suốt cả ngày."},
{id:37,title:"Lotion Nivea",category:"Chăm sóc cơ thể",img:"../images/sp37.png",price:170000,discount:60,rating:4.7,sold:3100,description:"Thấm nhanh, không bết dính. Phù hợp sử dụng hàng ngày."},
{id:38,title:"Tẩy da chết St Ives",category:"Chăm sóc cơ thể",img:"../images/sp38.png",price:200000,discount:12,rating:4.8,sold:2800,description:"Mùi sảng mát. Giúp loại bỏ tế bào chết hiệu quả, mang lại làn da mềm mại và tươi sáng hơn. Sản phẩm phù hợp với nhiều loại da, đặc biệt là da thường và da khô. Sử dụng đều đặn giúp cải thiện kết cấu da và tăng cường độ ẩm tự nhiên."},
{id:39,title:"Xịt thơm VS",category:"Chăm sóc cơ thể",img:"../images/sp39.png",price:300000,discount:15,rating:4.8,sold:2600,description:"Mùi thơm quyến rũ. Phù hợp sử dụng trong nhiều hoàn cảnh. Không"},
{id:40,title:"Body mist",category:"Chăm sóc cơ thể",img:"../images/sp40.png",price:250000,discount:10,rating:4.7,sold:2300,description:"Mùi thơm nhẹ nhàng.Phù hợp sử dụng trong nhiều hoàn cảnh. Không gây gắt mùi. Giúp bạn luôn tự tin suốt ngày."},

{id:41,title:"Dior Sauvage",category:"Nước hoa",img:"../images/sp41.png",price:2500000,discount:50,rating:4.9,sold:1200,description:"Mùi nam tính."},
{id:42,title:"Chanel Coco",category:"Nước hoa",img:"../images/sp42.png",price:2800000,discount:18,rating:4.9,sold:900,hasGift: true,description:"Hương thơm sang trọng. Dòng nước hoa cao cấp mang hương thơm đặc trưng, giúp thể hiện cá tính và phong cách riêng. Độ lưu hương lâu, phù hợp sử dụng cả ngày lẫn đêm. Thiết kế sang trọng, thích hợp làm quà tặng. Mang lại cảm giác tự tin và cuốn hút."},
{id:43,title:"YSL Libre",category:"Nước hoa",img:"../images/sp43.png",price:2600000,discount:50,rating:4.9,sold:1000,hasGift: true,description:"Hương thơm quyến rũ.Dòng nước hoa cao cấp mang hương thơm đặc trưng, giúp thể hiện cá tính và phong cách riêng. Độ lưu hương lâu, phù hợp sử dụng cả ngày lẫn đêm. Thiết kế sang trọng, thích hợp làm quà tặng. Mang lại cảm giác tự tin và cuốn hút."},
{id:44,title:"Gucci Bloom",category:"Nước hoa",img:"../images/sp44.png",price:2400000,discount:15,rating:4.8,sold:800,description:"Hương thơm nữ tính. Dòng nước hoa cao cấp mang hương thơm đặc trưng, giúp thể hiện cá tính và phong cách riêng. Độ lưu hương lâu, phù hợp sử dụng cả ngày lẫn đêm. Thiết kế sang trọng, thích hợp làm quà tặng. Mang lại cảm giác tự tin và cuốn hút."},
{id:45,title:"Versace Bright",category:"Nước hoa",img:"../images/sp45.png",price:2300000,discount:15,rating:4.8,sold:850,description:"Dòng nước hoa cao cấp mang hương thơm đặc trưng, giúp thể hiện cá tính và phong cách riêng. Độ lưu hương lâu, phù hợp sử dụng cả ngày lẫn đêm. Thiết kế sang trọng, thích hợp làm quà tặng. Mang lại cảm giác tự tin và cuốn hút."},
{id:46,title:"Mút trang điểm",category:"Dụng cụ & phụ kiện làm đẹp",img:"../images/sp46.png",price:80000,discount:5,rating:4.7,sold:5000,description:"Mút trang điểm giúp tán nền đều, mịn và tự nhiên hơn. Chất liệu mềm mại, dễ sử dụng. Phù hợp với kem nền và cushion. Giúp lớp nền hoàn hảo hơn."},
{id:47,title:"Cọ trang điểm",category:"Dụng cụ & phụ kiện làm đẹp",img:"../images/sp47.png",price:150000,discount:50,rating:4.8,sold:4200,description:"Bộ cọ trang điểm giúp thao tác dễ dàng và chính xác hơn. Lông cọ mềm mại, không gây kích ứng. Phù hợp cho nhiều bước makeup. Giúp lớp trang điểm chuyên nghiệp hơn."}, 
    {
        id: 36,
        title: "Sữa Tắm Guardian Hương Hoa Anh Đào 1000ml",
        category: "Chăm sóc cơ thể",
        img: "../images/SP1.1.JPG",
        price: 180000,
        discount: 25,
        rating: 5.0,
        sold: 1200,
        description: "Làm sạch dịu nhẹ và lưu hương hoa anh đào quyến rũ cả ngày dài. Công thức dưỡng ẩm giúp da mềm mịn, không bị khô sau khi tắm. Sản phẩm phù hợp cho mọi loại da, đặc biệt là da thường và da khô. Mang lại cảm giác thư giãn và sảng khoái mỗi khi sử dụng."
    },
    {
        id: 101,
        title: "Viên Uống Tinh Dầu Hoa Anh Thảo Blackmores",
        category: "Chăm sóc cơ thể",
        img: "../images/uudai1.jpg",
        price: 969000,
        discount: 20,
        rating: 5.0,
        sold: 500,
        description: "Viên uống giúp hỗ trợ cân bằng nội tiết tố và cải thiện làn da từ bên trong. Bổ sung dưỡng chất cần thiết cho cơ thể. Phù hợp sử dụng lâu dài. Giúp da khỏe và mềm mịn hơn."
    },
    {
        id: 104,
        title: "Nước Uống Collagen Dipeptide Sáng Da",
        category: "Chăm sóc cơ thể",
        img: "../images/uu dai4.jpg",
        price: 799000,
        discount: 20,
        rating: 5.0,
        sold: 310,
        description: "Nước uống collagen giúp cải thiện độ đàn hồi và săn chắc của da. Hỗ trợ làm sáng da và giảm thâm nám. Dễ sử dụng, tiện lợi hàng ngày. Phù hợp cho người chăm sóc da từ bên trong"
    },
    {
        id: 105,
        title: "Chì Kẻ Mày Want It Got It 2g+2ml",
        category: "Trang điểm",
        img: "../images/uu dai 5.jpg",
        price: 299000,
        discount: 15,
        rating: 5.0,
        sold: 120,
        description: "Chì kẻ mày thiết kế 2 đầu tiện lợi, dễ tạo dáng chân mày sắc nét. Màu lên tự nhiên, lâu trôi. Phù hợp cho cả người mới bắt đầu. Giúp gương mặt hài hòa hơn."
    },
    {
        id: 115,
        title: "Son Dưỡng Môi Cấp Ẩm Chuyên Sâu 24h",
        category: "Trang điểm",
        img: "../images/SP5.JPG",
        price: 85000,
        discount: 20,
        rating: 4.7,
        sold: 560,
        description: "Dưỡng môi mềm mịn, ngăn ngừa khô nứt suốt ngày dài."
    }

];
window.products = products;
// Create admin account 
function createAdminAccount() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
        accounts = [];
        accounts.push({
            fullname: "abc",
            phone: "11223344",
            password: "123456",
            address: '',
            email: '',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1
        })
        accounts.push({
            fullname: "aaa",
            phone: "0123456789",
            password: "123456",
            address: '',
            email: '',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}
    createAdminAccount();

const listSP = window.allProducts || JSON.parse(localStorage.getItem('products')) || [];