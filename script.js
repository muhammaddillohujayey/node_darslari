// nav bar on all pages
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
}


// shop page search bar

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
const searchTerm = searchInput.value.trim();
if (searchTerm !== '') {
  // Perform search and display results here (You may use AJAX or any API)
  // For demonstration purposes, let's assume we have an array of search results:
  // const results = ['products', 'Result 2', 'Result 3', 'Result 4', 'Result 5']; by me

  // Display the results
  displayResults(results);
}
});

function displayResults(results) {
// Clear previous results
searchResults.innerHTML = '';

if (results.length > 0) {
  results.forEach((result) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result');
    resultItem.textContent = result;
    searchResults.appendChild(resultItem);
  });
} else {
  const noResult = document.createElement('div');
  noResult.classList.add('result');
  noResult.textContent = 'No results found.';
  searchResults.appendChild(noResult);
}

// Show the search results container
searchResults.style.display = 'block';
}
// Modalni yaratamiz
const modal = document.createElement('div');
modal.classList.add('product-modal');
modal.innerHTML = `
<div class="modal-content">
  <span class="modal-close">&times;</span>
  <img src="" alt="Product Image" class="modal-product-img">
  <div class="modal-product-title"></div>
  <div class="modal-product-desc"></div>
  <div class="modal-product-price"></div>
  <div class="modal-product-sizes"></div> <!-- Razmerlar bo‘limi -->
<div class="modal-id" id="modal-id"></div>
  <div class="modal-buttons">
  <button class="btn-order" onclick="window.location.href='cart.html'">
  Buyurtma berish
</button>
    <button class="btn-cart" onclick="window.location.href='cart.html'">
  Savatchani korish
</button>
  <label for="color-select">Rangni tanlang:</label>
  <select id="color-select">
    <option value="red">Qizil</option>
    <option value="blue">Ko‘k</option>
    <option value="green">Yashil</option>
    <option value="black">Qora</option>
  </select>
  </div>
</div>
`;


document.body.appendChild(modal);


// Mahsulotni ko‘rsatish funksiyasi
function showProductModal(product) {
modal.querySelector('.modal-product-img').src = product.image;
modal.querySelector('.modal-product-title').textContent = product.title;
modal.querySelector('.modal-product-desc').textContent = product.description;

// Narx va aksiya narxlarini chiqarish
const priceEl = modal.querySelector('.modal-product-price');
if (product.discount && product.discount !== "") {
  priceEl.innerHTML = `
    <span class="original-price" style="text-decoration: line-through; color: gray;">${product.price} so‘m</span>
    <span class="discount-price" style="color: red; font-weight: bold; margin-left: 10px;">${product.discount} so‘m</span>
  `;
} else {
  priceEl.innerHTML = `
    <span class="discount-price" style="color: black; font-weight: bold;">${product.price} so‘m</span>
  `;
}

// Razmerlar ko‘rsatish
const sizeEl = modal.querySelector('.modal-product-sizes');
if (product.sizes && product.sizes.length > 0) {
  sizeEl.innerHTML = 'Razmerlar: ' + product.sizes.map(size => `<span style="display:inline-block;padding:4px 8px;border:1px solid #ccc;border-radius:4px;margin:2px;">${size.trim()}</span>`).join('');
} else {
  sizeEl.innerHTML = '';
}

modal.style.display = 'flex';

// Buyurtma tugmasi
modal.querySelector('.btn-order').onclick = () => {
  alert('Buyurtma qabul qilindi: ' + product.title);
  modal.style.display = 'none';
};
}

// Yopish tugmasi
modal.querySelector('.modal-close').onclick = () => {
modal.style.display = 'none';
};

// Modal tashqarisiga bosilsa yopiladi
window.onclick = (e) => {
if (e.target === modal) {
  modal.style.display = 'none';
}
};

// Tugmalarga event qo‘shish
document.querySelectorAll('.see-detail-btn').forEach(btn => {
btn.addEventListener('click', () => {
  const product = {
    image: btn.dataset.image,
    title: btn.dataset.title,
    description: btn.dataset.description,
    price: btn.dataset.price,
    discount: btn.dataset.discount,
    sizes: btn.dataset.sizes?.split(',') || [] // ← Razmerlar array ko‘rinishida
  };
  showProductModal(product);
});
});

// Savatchaga mahsulot qo'shish funksiyasi
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Mahsulot allaqachon savatchada bormi?
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} savatchaga qo'shildi!`);
  updateCartCount();
}

// Buyurtma berish funksiyasi
function placeOrder(product) {
  addToCart(product);
  window.location.href = "cart.html";
}

// Savatcha sonini yangilash
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = count;
}

// "See Detail" tugmasi uchun modal
document.querySelectorAll('.see-detail-btn').forEach(button => {
  button.addEventListener('click', function() {
    const product = {
      id: this.dataset.title.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now(),
      name: this.dataset.title,
      price: parseInt(this.dataset.price.replace(/\D/g, '')),
      discount: parseInt(this.dataset.discount.replace(/\D/g, '')),
      image: this.dataset.image,
      description: this.dataset.description,
      sizes: this.dataset.sizes.split(',')
    };
    
    // Modalni to'ldirish (agar mavjud bo'lsa)
    const modal = document.querySelector('.product-modal');
    if (modal) {
      modal.querySelector('.modal-product-img').src = product.image;
      modal.querySelector('.modal-product-title').textContent = product.name;
      modal.querySelector('.modal-product-desc').textContent = product.description;
      
      // Narxni ko'rsatish
      const priceElement = modal.querySelector('.modal-product-price');
      priceElement.innerHTML = `
        <span class="original-price">${product.price.toLocaleString()} so'm</span>
        <span class="discount-price">${product.discount.toLocaleString()} so'm</span>
      `;
      
      // Razmerlarni ko'rsatish
      const sizesElement = modal.querySelector('.modal-product-sizes');
      sizesElement.innerHTML = product.sizes.map(size => `
        <span class="size-option">${size.trim()}</span>
      `).join('');
      
      // Tugmalarga hodisa qo'shish
      modal.querySelector('.btn-cart').onclick = () => addToCart(product);
      modal.querySelector('.btn-order').onclick = () => placeOrder(product);
      
      // Modalni ko'rsatish
      modal.style.display = 'flex';
    }
  });
});

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
// Savatcha ikonkasi uchun hodisa qo'shamiz
document.getElementById('cartIcon').addEventListener('click', function(e) {
  e.preventDefault(); // Standart hodisani to'xtatamiz
  window.location.href = "cart.html"; // cart.html sahifasiga o'tamiz
});

// Yoki dropdown menyu o'rniga to'g'ridan-to'g'ri o'tish:
document.querySelector('.cart-icon').onclick = function() {
  window.location.href = "cart.html";
};
// Savatcha ikonkasi uchun
const cartIcon = document.getElementById('cartIcon');
let clickTimer;

cartIcon.addEventListener('click', function(e) {
  // Qisqa bosish (300ms dan kam) - sahifaga o'tish
  if (!clickTimer) {
    clickTimer = setTimeout(() => {
      clickTimer = null;
      window.location.href = "cart.html";
    }, 300);
  }
});

// Dropdown menyu uchun alohida element
cartIcon.querySelector('.cart-dropdown').addEventListener('click', function(e) {
  e.stopPropagation(); // Bubblingni to'xtatamiz
  clearTimeout(clickTimer); // Sahifaga o'tishni bekor qilamiz
  clickTimer = null;
});
document.getElementById('cartIcon').addEventListener('click', function(e) {
  // Agar dropdown menyu ochiq bo'lsa, sahifaga o'tamiz
  if (document.getElementById('cartDropdown').classList.contains('show')) {
    window.location.href = "cart.html";
  } else {
    // Aks holda dropdown menyuni ko'rsatamiz
    document.getElementById('cartDropdown').classList.add('show');
    e.stopPropagation();
  }
});

// Sahifaning boshqa joyiga bosilganda dropdown yopiladi
document.addEventListener('click', function() {
  document.getElementById('cartDropdown').classList.remove('show');
});