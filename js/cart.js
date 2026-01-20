/* cart.js
   Cart page functionality:
   - Recalculate subtotal, taxes, shipping, and total
   - Store totals in localStorage so Shipping can reuse them
*/

(function initCart() {
  const cartItems = Array.from(document.querySelectorAll("[data-cart-item]"));
  if (cartItems.length === 0) return;

  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const taxesEl = document.getElementById("cartTaxes");
  const totalEl = document.getElementById("cartTotal");

  function readCartFromDOM() {
    return cartItems.map((item) => {
      const price = Number(item.getAttribute("data-price")) || 0;
      const qtySelect = item.querySelector("[data-qty]");
      const qty = qtySelect ? Number(qtySelect.value) || 1 : 1;

      return { price, qty };
    });
  }

  function calculateTotals(cart, shippingCost) {
    const subtotal = cart.reduce((sum, row) => sum + row.price * row.qty, 0);
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes + shippingCost;

    return { subtotal, taxes, shippingCost, total };
  }

  function renderTotals(totals) {
    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);

    if (shippingEl) {
      shippingEl.textContent = totals.shippingCost === 0 ? "FREE" : formatCurrency(totals.shippingCost);
    }

    if (taxesEl) taxesEl.textContent = formatCurrency(totals.taxes);
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);
  }

  function saveTotals(totals) {
    saveToStorage(STORAGE_KEYS.totals, totals);
  }

  function recompute() {
    const cart = readCartFromDOM();

    /* In the wireframe, cart shipping is FREE */
    const shippingCost = 0;

    const totals = calculateTotals(cart, shippingCost);
    renderTotals(totals);
    saveTotals(totals);
  }

  /* Attach events */
  cartItems.forEach((item) => {
    const qtySelect = item.querySelector("[data-qty]");
    if (!qtySelect) return;

    qtySelect.addEventListener("change", recompute);
  });

  /* Initial calculation */
  recompute();
})();
