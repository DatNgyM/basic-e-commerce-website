/* ============================================
   Product List JS - Lọc và tìm kiếm sản phẩm
   ============================================ */

// Danh sách sản phẩm
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro Max 256GB",
    category: "dien-thoai",
    price: 34990000,
    oldPrice: 36990000,
    desc: "Chip A18 Pro, Camera 48MP, Màn hình 6.9 inch Super Retina XDR",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png",
    badge: "Mới"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    category: "dien-thoai",
    price: 28990000,
    oldPrice: 31990000,
    desc: "Chip Snapdragon 8 Gen 3, Camera 200MP, S Pen tích hợp",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s24-ultra.png",
    badge: "Hot"
  },
  {
    id: 3,
    name: "MacBook Air M3 15 inch",
    category: "laptop",
    price: 32990000,
    oldPrice: 34990000,
    desc: "Chip Apple M3, RAM 16GB, SSD 512GB, Màn hình Liquid Retina",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_11__3_32.png",
    badge: ""
  },
  {
    id: 4,
    name: "Dell XPS 13 9345",
    category: "laptop",
    price: 27490000,
    oldPrice: 32490000,
    desc: "Intel Core Ultra 7, RAM 16GB, SSD 512GB, Màn hình 13.4 inch OLED",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/e/dell-xps-13-9345-1.png",
    badge: "-15%"
  },
  {
    id: 5,
    name: "Xiaomi 14T Pro 512GB",
    category: "dien-thoai",
    price: 15990000,
    oldPrice: 17490000,
    desc: "Chip Dimensity 9300+, Camera Leica 50MP, Sạc nhanh 120W",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14t-pro.png",
    badge: ""
  },
  {
    id: 6,
    name: "iPad Pro M4 11 inch 256GB",
    category: "tablet",
    price: 28990000,
    oldPrice: 30990000,
    desc: "Chip Apple M4, Màn hình Ultra Retina XDR, Apple Pencil Pro",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-m4-11-inch.png",
    badge: "Mới"
  },
  {
    id: 7,
    name: "Apple AirPods 4 với ANC",
    category: "phu-kien",
    price: 4490000,
    oldPrice: 4990000,
    desc: "Chống ồn chủ động, Chip H2, Âm thanh không gian, USB-C",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/e/headphone-airpods-4-anc.png",
    badge: "Hot"
  },
  {
    id: 8,
    name: "Dell Gaming G16 7630",
    category: "laptop",
    price: 25990000,
    oldPrice: 32490000,
    desc: "Intel Core i7-13650HX, RTX 4060, RAM 16GB, SSD 512GB",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/e/dell-g16-7630.png",
    badge: "-20%"
  }
];

// Format giá tiền VNĐ
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}

// Xác định loại badge
function getBadgeClass(badge) {
  if (!badge) return "";
  if (badge === "Hot") return "product-card__badge--hot";
  if (badge.includes("%")) return "product-card__badge--sale";
  return "";
}

// Render 1 sản phẩm thành HTML
function renderProduct(product) {
  const badgeHTML = product.badge
    ? `<span class="product-card__badge ${getBadgeClass(product.badge)}">${product.badge}</span>`
    : "";

  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}">
        ${badgeHTML}
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.desc}</p>
        <div class="product-card__price">
          <span class="product-card__price--current">${formatPrice(product.price)}</span>
          <span class="product-card__price--old">${formatPrice(product.oldPrice)}</span>
        </div>
        <button class="product-card__btn" onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
      </div>
    </div>
  `;
}

// Render toàn bộ danh sách
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">Không tìm thấy sản phẩm phù hợp.</p>';
    return;
  }
  grid.innerHTML = list.map(renderProduct).join("");
}

// Lọc theo danh mục
function filterByCategory(category) {
  // Cập nhật nút active
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("filter-btn--active", btn.dataset.category === category);
  });

  let filtered = products;
  if (category !== "all") {
    filtered = products.filter(p => p.category === category);
  }

  // Áp dụng thêm tìm kiếm nếu có
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  if (keyword) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.desc.toLowerCase().includes(keyword)
    );
  }

  renderProducts(filtered);
}

// Tìm kiếm sản phẩm
function searchProducts() {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const activeCategory = document.querySelector(".filter-btn--active")?.dataset.category || "all";

  let filtered = products;
  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  if (keyword) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.desc.toLowerCase().includes(keyword)
    );
  }

  renderProducts(filtered);
}

// Sắp xếp sản phẩm
function sortProducts(sortType) {
  const activeCategory = document.querySelector(".filter-btn--active")?.dataset.category || "all";
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();

  let filtered = products;
  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  if (keyword) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.desc.toLowerCase().includes(keyword)
    );
  }

  switch (sortType) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;
    default:
      break;
  }

  renderProducts(filtered);
}

// Thêm vào giỏ hàng (giả lập)
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }
}

// Khởi tạo khi trang load xong
document.addEventListener("DOMContentLoaded", function () {
  renderProducts(products);

  // Sự kiện tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
  }

  // Sự kiện lọc
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      filterByCategory(this.dataset.category);
    });
  });

  // Sự kiện sắp xếp
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      sortProducts(this.value);
    });
  }
});
