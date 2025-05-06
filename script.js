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
    <div class="modal-buttons">
      <button class="btn-order">Buyurtma berish</button>
      <button class="btn-cart">Savatchaga qo‘shish</button>
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

  // Savatchaga qo‘shish tugmasi
  modal.querySelector('.btn-cart').onclick = () => {
    alert('Savatchaga qo‘shildi: ' + product.title);
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

// Zoom modal yaratamiz
const zoomModal = document.createElement('div');
zoomModal.className = 'image-zoom-modal';
zoomModal.style.cssText = `
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.7);
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;
zoomModal.innerHTML = `<img src="" alt="Zoom Image" style="max-width: 90%; max-height: 90%; border-radius: 10px;">`;
document.body.appendChild(zoomModal);

// Rasmni kattalashtirish
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-product-img')) {
    const src = e.target.src;
    zoomModal.querySelector('img').src = src;
    zoomModal.style.display = 'flex';
  }
});

// Zoom modalni yopish
zoomModal.addEventListener('click', () => {
  zoomModal.style.display = 'none';
});
