// Filename: cart-service.js

class CartItem {
  constructor(productId, quantity, price) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  getTotal() {
    return this.quantity * this.price;
  }
}

class CartService {
  constructor() {
    this.carts = new Map();
  }

  createCart(userId) {
    if (!this.carts.has(userId)) {
      this.carts.set(userId, []);
    }
  }

  addItem(userId, productId, quantity, price) {
    this.createCart(userId);
    const cart = this.carts.get(userId);
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = price;
    } else {
      cart.push(new CartItem(productId, quantity, price));
    }
  }

  updateItemQuantity(userId, productId, quantity) {
    const cart = this.carts.get(userId);
    if (!cart) return;
    const item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeItem(userId, productId) {
    const cart = this.carts.get(userId);
    if (!cart) return;
    this.carts.set(userId, cart.filter(item => item.productId !== productId));
  }

  getCartTotal(userId) {
    const cart = this.carts.get(userId) || [];
    return cart.reduce((total, item) => total + item.getTotal(), 0);
  }

  clearCart(userId) {
    this.carts.set(userId, []);
  }
}

const cartService = new CartService();

// Prepopulate with sample data
cartService.addItem("user1", "p100", 2, 15.99);
cartService.addItem("user1", "p200", 1, 45.50);

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// ✅ DISPLAY CART (with interactive controls)
function displayCart(userId) {
  const cartContainer = document.getElementById('cart-container');
  const cart = cartService.carts.get(userId) || [];

  cartContainer.innerHTML = cart
    .map(item => `
      <div class="cart-item">
        <span>${escapeHTML(item.productId)} - $${item.price}</span>
        <div class="quantity-controls">
          <button class="decrement" data-id="${item.productId}">-</button>
          <input type="number" value="${item.quantity}" min="1" data-id="${item.productId}" class="qty-input">
          <button class="increment" data-id="${item.productId}">+</button>
        </div>
        <button class="remove-btn" data-id="${item.productId}">🗑️ Remove</button>
      </div>
    `)
    .join('');

  const totalDisplay = document.getElementById('cart-total');
  if (totalDisplay) {
    totalDisplay.textContent = `Total: $${cartService.getCartTotal(userId).toFixed(2)}`;
  }

  attachCartEventListeners(userId);
}

// ✅ ATTACH EVENT LISTENERS
function attachCartEventListeners(userId) {
  document.querySelectorAll('.increment').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.id;
      const cart = cartService.carts.get(userId) || [];
      const item = cart.find(i => i.productId === productId);
      if (item) {
        item.quantity += 1;
        displayCart(userId);
      }
    });
  });

  document.querySelectorAll('.decrement').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.id;
      const cart = cartService.carts.get(userId) || [];
      const item = cart.find(i => i.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        displayCart(userId);
      }
    });
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const productId = e.target.dataset.id;
      const newQty = parseInt(e.target.value) || 1;
      cartService.updateItemQuantity(userId, productId, newQty);
      displayCart(userId);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.id;
      cartService.removeItem(userId, productId);
      displayCart(userId);
    });
  });
}

// ✅ ADD ITEM TO CART (triggered by product page button)
function addToCart(userId, productId, price) {
  cartService.addItem(userId, productId, 1, price);
  displayCart(userId);
}

// Simulate UI actions
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById('add-to-cart');
  if (addButton) {
    addButton.addEventListener('click', () => {
      const productId = addButton.dataset.id;
      const price = parseFloat(addButton.dataset.price);
      addToCart("user1", productId, price);
    });
  }

  displayCart("user1");
});
