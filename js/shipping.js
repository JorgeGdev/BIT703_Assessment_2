/* shipping.js
   Shipping page functionality:
   - Apply free shipping automatically when subtotal is greater than $600
   - Update summary totals when shipping option changes
*/

(function initShipping() {
  const subtotalEl = document.getElementById("shipSubtotal");
  const shippingEl = document.getElementById("shipShipping");
  const taxesEl = document.getElementById("shipTaxes");
  const totalEl = document.getElementById("shipTotal");

  const freeRadio = document.getElementById("shipFree");
  const nextRadio = document.getElementById("shipNext");

  if (!subtotalEl || !shippingEl || !taxesEl || !totalEl) return;
  if (!freeRadio || !nextRadio) return;

  /* Load totals saved from the cart page. If not available, fall back to the wireframe values. */
  const storedTotals = loadFromStorage(STORAGE_KEYS.totals, null);

  const fallbackSubtotal = parseCurrency(subtotalEl.textContent) || 600;
  const subtotal = storedTotals && Number.isFinite(storedTotals.subtotal) ? storedTotals.subtotal : fallbackSubtotal;

  function getSelectedShippingCost() {
    const selected = document.querySelector("input[name='shippingMethod']:checked");
    if (!selected) return 0;

    const raw = selected.getAttribute("data-ship-cost");
    const cost = Number(raw);
    return Number.isFinite(cost) ? cost : 0;
  }

  function calculateTotals(shippingCost) {
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes + shippingCost;

    return { subtotal, taxes, shippingCost, total };
  }

  function renderTotals(totals) {
    subtotalEl.textContent = formatCurrency(totals.subtotal);
    shippingEl.textContent = totals.shippingCost === 0 ? "FREE" : formatCurrency(totals.shippingCost);
    taxesEl.textContent = formatCurrency(totals.taxes);
    totalEl.textContent = formatCurrency(totals.total);
  }

  function enforceFreeShippingRule() {
    /* Mandatory requirement: apply free shipping automatically when subtotal is over $600 */
    const qualifies = subtotal > 600;

    if (qualifies) {
      freeRadio.checked = true;
      nextRadio.disabled = true;
      nextRadio.closest("label")?.classList.add("opacity-50");
    } else {
      nextRadio.disabled = false;
      nextRadio.closest("label")?.classList.remove("opacity-50");
    }
  }

  function recompute() {
    enforceFreeShippingRule();
    const shippingCost = getSelectedShippingCost();
    const totals = calculateTotals(shippingCost);
    renderTotals(totals);

    /* Keep totals updated for any next step page */
    saveToStorage(STORAGE_KEYS.totals, totals);
  }

  /* Events */
  freeRadio.addEventListener("change", recompute);
  nextRadio.addEventListener("change", recompute);

  /* Initial render */
  recompute();
})();
