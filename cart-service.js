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

cartService.addItem("user1", "p100", 2, 15.99);
cartService.addItem("user1", "p200", 1, 45.50);
cartService.updateItemQuantity("user1", "p100", 3);
cartService.removeItem("user1", "p200");

console.log("User1 Cart Total:", cartService.getCartTotal("user1"));

function displayCartUnsafe(userId) {
  const cartContainer = document.getElementById('cart-container');
  const cart = cartService.carts.get(userId) || [];
  cartContainer.innerHTML = cart.map(item => `<div>${item.productId} - Qty: ${item.quantity} - $${item.price}</div>`).join('');
}

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

function displayCartSafe(userId) {
  const cartContainer = document.getElementById('cart-container');
  const cart = cartService.carts.get(userId) || [];
  cartContainer.innerHTML = cart.map(item => `<div>${escapeHTML(item.productId)} - Qty: ${item.quantity} - $${item.price}</div>`).join('');
}

displayCartSafe("user1");
