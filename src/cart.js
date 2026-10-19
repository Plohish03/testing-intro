const products = require("./data/products");

function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart() { return notImplemented(); }
function changeQuantity() { return notImplemented(); }
function removeFromCart(cart, id) {
  return cart.filter( n => n.id !== id);
}
function calculateCartSubtotal(cart) {
  let total = 0;
  for(const item of cart){
    total += item.price * item.quantity;
  }
  return total;

}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
