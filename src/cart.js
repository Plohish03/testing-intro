const products = require("./data/products");

function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Количество должно быть целым числом не меньше 1');
  }

  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = (existing ? existing.quantity : 0) + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, id, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Количество должно быть целым числом не меньше 1');
  }

  const found = cart.find((item) => item.id === id);
  if (found && quantity > found.stock) {
    throw new RangeError('Нельзя указать количество больше остатка');
  }

  return cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
}
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
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000
    ? Math.round(subtotal * 0.1)
    : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
