// Products array
const products = [
  { id: 1, name: 'Oven', category: 'Kitchen', price: 299, image: '/assets/images/oven.avif', thumbs: ['/assets/images/oven.avif', '/assets/images/oven.avif', '/assets/images/oven.avif'], specs: { height: '90cm', width: '60cm', watt: '2000W', weight: '45kg' }, stock: 10 },
  { id: 2, name: 'Fridge', category: 'Kitchen', price: 499, image: '/assets/images/fridge.jpeg', thumbs: ['/assets/images/fridge.jpeg', '/assets/images/fridge.jpeg', '/assets/images/fridge.jpeg'], specs: { height: '180cm', width: '70cm', watt: '150W', weight: '80kg' }, stock: 10 },
  { id: 3, name: 'Laptop', category: 'Smart Home', price: 799, image: '/assets/images/laptop.jpeg', thumbs: ['/assets/images/laptop.jpeg', '/assets/images/laptop.jpeg', '/assets/images/laptop.jpeg'], specs: { height: '2cm', width: '35cm', watt: '65W', weight: '1.5kg' }, stock: 10 },
  { id: 4, name: 'Vacuum Cleaner', category: 'Cleaning', price: 149, image: '/assets/images/vacuum.jpeg', thumbs: ['/assets/images/vacuum.jpeg', '/assets/images/vacuum.jpeg', '/assets/images/vacuum.jpeg'], specs: { height: '100cm', width: '30cm', watt: '1200W', weight: '5kg' }, stock: 10 },
  { id: 5, name: 'Washing Machine', category: 'Kitchen', price: 299, image: '/assets/images/Rectangle 19(3).png', thumbs: ['/assets/images/Rectangle 19(3).png', '/assets/images/Rectangle 19(3).png', '/assets/images/Rectangle 19(3).png'], specs: { height: '85cm', width: '60cm', watt: '1800W', weight: '70kg' }, stock: 10 },
  { id: 6, name: 'Samsung TV', category: 'Smart Home', price: 399, image: '/assets/images/Rectangle 15.png', thumbs: ['/assets/images/Rectangle 15.png', '/assets/images/Rectangle 15.png', '/assets/images/Rectangle 15.png'], specs: { height: '50cm', width: '100cm', watt: '100W', weight: '10kg' }, stock: 10 },
  { id: 7, name: 'Air Conditioner', category: 'Cooling', price: 167, image: '/assets/images/Rectangle 45.png', thumbs: ['/assets/images/Rectangle 45.png', '/assets/images/Rectangle 45.png', '/assets/images/Rectangle 45.png'], specs: { height: '30cm', width: '90cm', watt: '1500W', weight: '25kg' }, stock: 10 },
  { id: 8, name: 'Smart Thermostat', category: 'Smart Home', price: 199, image: '/assets/images/RTH2CWF-c2-6_b9e91b8a-aac4-4a89-9b97-dfc35bd2cb05.webp', thumbs: ['/assets/images/RTH2CWF-c2-6_b9e91b8a-aac4-4a89-9b97-dfc35bd2cb05.webp', '/assets/images/RTH2CWF-c2-6_b9e91b8a-aac4-4a89-9b97-dfc35bd2cb05.webp', '/assets/images/RTH2CWF-c2-6_b9e91b8a-aac4-4a89-9b97-dfc35bd2cb05.webp'], specs: { height: '10cm', width: '10cm', watt: '5W', weight: '0.3kg' }, stock: 10 },
  { id: 9, name: 'Hair Dryer', category: 'Personal Care', price: 49, image: '/assets/images/haridryer.jpeg', thumbs: ['/assets/images/haridryer.jpeg', '/assets/images/haridryer.jpeg', '/assets/images/haridryer.jpeg'], specs: { height: '25cm', width: '10cm', watt: '1800W', weight: '0.6kg' }, stock: 10 },
  { id: 10, name: 'Microwave', category: 'Kitchen', price: 99, image: '/assets/images/microwave.webp', thumbs: ['/assets/images/microwave.webp', '/assets/images/microwave-interior.webp', '/assets/images/microwave-controls.webp'], specs: { height: '30cm', width: '50cm', watt: '1000W', weight: '15kg' }, stock: 10 },
  { id: 11, name: 'Fan', category: 'Cooling', price: 29, image: '/assets/images/fan.jpeg', thumbs: ['/assets/images/fan.jpeg', '/assets/images/fan-blades.jpeg', '/assets/images/fan-base.jpeg'], specs: { height: '120cm', width: '40cm', watt: '50W', weight: '4kg' }, stock: 10 },
  { id: 12, name: 'Electric Blanket', category: 'Heating', price: 79, image: '/assets/images/blanket.jpeg', thumbs: ['/assets/images/blanket.jpeg', '/assets/images/blanket-controls.jpeg', '/assets/images/blanket-folded.jpeg'], specs: { height: '150cm', width: '130cm', watt: '100W', weight: '2kg' }, stock: 10 },
];

// Helpers
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cartLink = document.querySelector('a[href="cart.html"]:has(img[src="/assets/images/Shopping cart.png"])');
  if (cartLink && !cartLink.querySelector('.badge')) {
    const badge = document.createElement('span');
    badge.classList.add('badge');
    cartLink.appendChild(badge);
    cartLink.style.position = 'relative';
  }
  const badge = cartLink ? cartLink.querySelector('.badge') : null;
  if (badge) {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Display products
function displayProducts(filteredProducts, container) {
  if (!container) return;
  container.innerHTML = '';
  filteredProducts.forEach(product => {
    const isCatalog = container.classList.contains('products');
    const card = document.createElement('div');
    card.classList.add(isCatalog ? 'card' : 'product-card');
    card.dataset.productId = product.id;
    card.innerHTML = isCatalog ? `
      <img src="${product.image}" alt="${product.name}">
      <span class="cat-tag">${product.category}</span>
      <h3 class="prod-title">${product.name}</h3>
      <div class="price-row">
        <span class="price">$${product.price}</span>
        <span class="star"><img src="/assets/images/Icon(5).png" alt=""></span> <span style="color: grey;">4.5/5</span>
      </div>
      <button class="btn" data-product-id="${product.id}">Add to Cart</button>
    ` : `
      <div class="image-holder"><img src="${product.image}" alt="${product.name}"></div>
      <p class="category">${product.category.toUpperCase()}</p>
      <h3 class="product-name">${product.name}</h3>
      <div class="review">
        <p class="price">$${product.price}</p>
        <ul><li><img src="/assets/images/Icon(2).png" alt="" width="20" height="20"></li><span>4.5/5</span></ul>
      </div>
      <button class="add-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    container.appendChild(card);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) window.location.href = `/productInfo.html?id=${product.id}`;
    });
  });
  document.querySelectorAll('.btn, .add-btn').forEach(btn => btn.addEventListener('click', addToCart));
}

// --- UPDATED SEARCH FUNCTION WITH DROPDOWN ---
function initSearch() {
  const searchContainer = document.querySelector('.search-container');
  const input = document.querySelector('.search-container input');
  const btn = document.querySelector('.search-btn');
  
  if (!input || !searchContainer) return;

  // 1. Create the dropdown container dynamically
  let resultsBox = document.querySelector('.search-results-dropdown');
  if (!resultsBox) {
    resultsBox = document.createElement('div');
    resultsBox.classList.add('search-results-dropdown');
    searchContainer.appendChild(resultsBox);
    
    // Add Styling via JS (so you don't have to edit CSS)
    searchContainer.style.position = 'relative'; 
    Object.assign(resultsBox.style, {
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '0 0 10px 10px',
      zIndex: '1000',
      display: 'none',
      maxHeight: '300px',
      overflowY: 'auto',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    });
  }

  // 2. Function to handle live search
  function handleInput() {
    const query = input.value.trim().toLowerCase();
    resultsBox.innerHTML = ''; // Clear old results

    if (query.length === 0) {
      resultsBox.style.display = 'none';
      return;
    }

    const matches = products.filter(p => p.name.toLowerCase().includes(query));

    if (matches.length > 0) {
      resultsBox.style.display = 'block';
      matches.forEach(product => {
        const row = document.createElement('div');
        // Style the row
        Object.assign(row.style, {
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          cursor: 'pointer',
          borderBottom: '1px solid #eee'
        });

        // Hover effect
        row.onmouseover = () => row.style.backgroundColor = '#f9f9f9';
        row.onmouseout = () => row.style.backgroundColor = 'white';

        // Add Image and Text
        row.innerHTML = `
          <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px; border-radius: 4px; border: 1px solid #eee;">
          <div>
             <div style="font-size: 14px; color: #333; font-weight: 600;">${product.name}</div>
             <div style="font-size: 12px; color: #888;">$${product.price}</div>
          </div>
        `;

        // Click event to go to product page
        row.addEventListener('click', () => {
          window.location.href = `productInfo.html?id=${product.id}`;
        });

        resultsBox.appendChild(row);
      });
      
    } else {
      resultsBox.style.display = 'none';
    }
  }

  // 3. Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      resultsBox.style.display = 'none';
    }
  });

  // Event Listeners
  input.addEventListener('input', handleInput);
  input.addEventListener('focus', handleInput); // Show results again if clicking back into box
}

// Categories
function initCategories() {
  document.querySelectorAll('.category-list li').forEach(li => {
    li.addEventListener('click', () => {
      const cat = li.textContent.trim();
      const filtered = products.filter(p => p.category.toLowerCase() === cat.toLowerCase());
      displayProducts(filtered, document.querySelector('.products'));
    });
  });
  document.querySelectorAll('.category-grid a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const cat = a.dataset.category;
      window.location.href = `catalog.html?category=${encodeURIComponent(cat)}`;
    });
  });
}

// Add to Cart
function addToCart(e) {
  const id = parseInt(e.target.dataset.productId);
  const product = products.find(p => p.id === id);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart(cart);
  updateCartBadge();
}

// Cart Page
function initCartPage() {
  if (!window.location.pathname.includes('/cart.html')) return;
  const list = document.querySelector('.products-list');
  const title = document.querySelector('.main-container h1');
  const totalSpan = document.querySelector('.summary-row.total .green-text');
  const productsSpan = document.querySelector('.summary-row .green-text');
  const discountSpan = document.querySelector('.summary-row .red-text');
  if (!list) return;

  function render() {
    const cart = getCart();
    list.innerHTML = '';
    let total = 0, itemCount = 0;
    cart.forEach((item, idx) => {
      const sub = item.price * item.quantity;
      total += sub;
      itemCount += item.quantity;
      const elem = document.createElement('div');
      elem.classList.add('cart-item');
      elem.innerHTML = `
        <input type="checkbox" checked>
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="category">Category: ${item.category}</p>
          <p class="price">$${item.price}</p>
          <p class="subtotal">Subtotal: $${sub.toFixed(2)}</p>
        </div>
        <div class="item-actions">
          <div class="quantity-selector">
            <button data-index="${idx}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button data-index="${idx}">+</button>
          </div>
        </div>
      `;
      list.appendChild(elem);
    });
    if (title) title.textContent = `Your Cart, ${itemCount} items`;
    if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
    if (productsSpan) productsSpan.textContent = `$${total.toFixed(2)}`;
    if (discountSpan) discountSpan.textContent = '-$0';

    list.querySelectorAll('.quantity-selector button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const change = i % 2 === 0 ? -1 : 1;
        let cart = getCart();
        cart[idx].quantity += change;
        if (cart[idx].quantity < 1) cart.splice(idx, 1);
        saveCart(cart);
        updateCartBadge();
        render();
      });
    });
  }
  render();
}

// Checkout Page (Upgraded Function)
function initCheckoutPage() {
  if (!window.location.pathname.includes('/checkout.html')) return;

  const proceedBtn = document.querySelector('.proceed-btn');
  const orderDetailsSection = document.querySelector('.left-card'); // Assuming order details are in left-card after <h3>Order Details</h3>
  const priceSpan = document.querySelector('.summary-row:nth-child(1) span:nth-child(2)');
  const deliverySpan = document.querySelector('.summary-row:nth-child(2) span.green-text');
  const discountSpan = document.querySelector('.summary-row:nth-child(3) span.gray-text');
  const totalSpan = document.querySelector('.summary-row.total-row span.green-text.big-price');

  if (!proceedBtn || !orderDetailsSection) return;

  function renderCheckout() {
    const cart = getCart();
    let total = 0, itemCount = 0;

    // Clear existing product items (assuming they are after the <h3>Order Details</h3>)
    const orderHeader = orderDetailsSection.querySelector('h3:nth-of-type(4)'); // 4th h3 is "Order Details"
    let nextSibling = orderHeader.nextElementSibling;
    while (nextSibling && nextSibling.classList.contains('product-item')) {
      const toRemove = nextSibling;
      nextSibling = nextSibling.nextElementSibling;
      toRemove.remove();
    }

    // Render dynamic product items
    cart.forEach(item => {
      const sub = item.price * item.quantity;
      total += sub;
      itemCount += item.quantity;

      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <div class="prod-img">
          <img src="${item.image}" alt="${item.name}" width="30">
        </div>
        <div class="prod-info">
          <p class="prod-name">${item.name}</p>
          <p class="prod-qty">Quantity: ${item.quantity}</p>
        </div>
      `;
      orderHeader.insertAdjacentElement('afterend', productItem);
    });

    // Update summary
    if (priceSpan) priceSpan.textContent = `$${total.toFixed(2)} (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;
    if (deliverySpan) deliverySpan.textContent = 'Free';
    if (discountSpan) discountSpan.textContent = '-$0'; // Assuming no discount; adjust if needed
    if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
  }

  renderCheckout();

  proceedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
      alert('Your cart is empty! Add some items before proceeding.');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    alert(`Proceeding to checkout! Your total is $${total}. Thank you for your order!`);
    saveCart([]);
    updateCartBadge();
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 1000);
  });
}

// Product Info
function initProductInfo() {
  if (!window.location.pathname.includes('/productInfo.html')) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) return alert('Product not found');

  document.querySelector('.product-title').textContent = product.name;
  document.querySelector('.price-value').textContent = `$${product.price}`;
  document.querySelector('.discount-value').textContent = '-$10';
  document.querySelector('.status-item b').textContent = product.stock;

  const specs = document.querySelector('.specs');
  specs.innerHTML = '';
  Object.entries(product.specs).forEach(([key, val]) => {
    specs.innerHTML += `<div class="spec-row"><span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span><span class="spec-value">${val}</span></div>`;
  });

  const main = document.querySelector('.main-image');
  main.src = product.image;
  const thumbs = document.querySelector('.thumbnails');
  thumbs.innerHTML = '';
  product.thumbs.forEach(src => {
    thumbs.innerHTML += `<img src="${src}" class="thumb">`;
  });
  thumbs.querySelectorAll('.thumb').forEach((thumb, idx) => thumb.addEventListener('click', () => main.src = product.thumbs[idx]));

  const arrows = document.querySelectorAll('.arrow');
  let curr = 0;
  arrows[0].addEventListener('click', () => { curr = (curr - 1 + product.thumbs.length) % product.thumbs.length; main.src = product.thumbs[curr]; });
  arrows[1].addEventListener('click', () => { curr = (curr + 1) % product.thumbs.length; main.src = product.thumbs[curr]; });

  const addBtn = document.querySelector('.btn-cart');
  addBtn.dataset.productId = product.id;
  addBtn.addEventListener('click', addToCart);

  document.querySelector('.btn-buy').addEventListener('click', () => alert('Proceeding to checkout!'));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initSearch();
  initCategories();
  initCartPage();
  initCheckoutPage();
  initProductInfo();

  const params = new URLSearchParams(window.location.search);
  let displayed = products;
  if (params.get('search')) displayed = products.filter(p => p.name.toLowerCase().includes(params.get('search').toLowerCase()));
  if (params.get('category')) displayed = products.filter(p => p.category.toLowerCase() === params.get('category').toLowerCase());

  if (window.location.pathname.includes('/index.html')) {
    const flexes = document.querySelectorAll('.product-flex');
    if (flexes.length >= 2) {
      displayProducts(displayed.slice(0, 5), flexes[0]);
      displayProducts(displayed.slice(-10), flexes[1]);
    }
  } else {
    document.querySelectorAll('.product-flex, .products').forEach(cont => displayProducts(displayed, cont));
  }
});

